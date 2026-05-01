const USERS_STORAGE_KEY = "karmanya-users";
const AUTH_USER_KEY = "karmanya-current-user";

export const getUsers = () => {
  if (typeof window === "undefined") return {};
  const users = window.localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

export const saveUsers = (users) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const user = window.localStorage.getItem(AUTH_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(AUTH_USER_KEY);
  }
};

export const signUp = (fullName, email, password, profession, gender) => {
  const users = getUsers();
  if (users[email]) {
    return { success: false, message: "User already exists" };
  }
  users[email] = {
    fullName,
    email,
    password,
    profession,
    gender,
    createdAt: new Date().toISOString(),
  };
  saveUsers(users);
  const user = {
    fullName,
    email,
    profession,
    gender,
    createdAt: users[email].createdAt
  };
  setCurrentUser(user);
  return { success: true, user };
};

export const signIn = (email, password) => {
  const users = getUsers();
  const user = users[email];
  if (!user || user.password !== password) {
    return { success: false, message: "Invalid email or password" };
  }
  const currentUser = {
    fullName: user.fullName,
    email: user.email,
    profession: user.profession,
    gender: user.gender,
    createdAt: user.createdAt,
  };
  setCurrentUser(currentUser);
  return { success: true, user: currentUser };
};

export const updateUserProfile = (email, updates) => {
  const users = getUsers();
  const user = users[email];
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const updatedUser = {
    ...user,
    fullName: updates.fullName ?? user.fullName,
    profession: updates.profession ?? user.profession,
    gender: updates.gender ?? user.gender,
    password: updates.password ?? user.password,
  };

  users[email] = updatedUser;
  saveUsers(users);

  const updatedCurrentUser = {
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    profession: updatedUser.profession,
    gender: updatedUser.gender,
    createdAt: updatedUser.createdAt,
  };

  setCurrentUser(updatedCurrentUser);
  return { success: true, user: updatedCurrentUser };
};

export const signOut = () => {
  setCurrentUser(null);
};
