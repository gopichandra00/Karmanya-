import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getCurrentUser, signOut, updateUserProfile } from "../utils/auth";
import PWAInstallPrompt from "./PWAInstallPrompt";

const STORAGE_KEY = "todo-list-app-items";

export default function TodoApp({ onSignOut }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    profession: "",
    gender: "",
  });

  const getStorageKey = (email) => {
    return email ? `${STORAGE_KEY}-${email}` : STORAGE_KEY;
  };

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        profession: user.profession || "",
        gender: user.gender || "",
      });
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setTodos([]);
      return;
    }

    const saved = window.localStorage.getItem(getStorageKey(currentUser.email));
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    window.localStorage.setItem(getStorageKey(currentUser.email), JSON.stringify(todos));
  }, [todos, currentUser]);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (!trimmed || !startTime || !endTime) return;
    setTodos((current) => [
      ...current,
      { id: Date.now().toString(), text: trimmed, startTime, endTime, completed: false, completedAt: null },
    ]);
    setNewTodo("");
    setStartTime("");
    setEndTime("");
  };

  const toggleTodo = (id) => {
    const now = new Date().toISOString();
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? now : null } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    const updatedText = prompt("Edit task", todo.text);
    if (updatedText === null) return;
    const trimmed = updatedText.trim();
    if (!trimmed) return;
    setTodos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, text: trimmed } : item
      )
    );
  };

  const calculateTimeTaken = (startTime, completedAt) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const completedDate = new Date(completedAt);
    const startDate = new Date();
    startDate.setHours(startHour, startMin, 0, 0);
    const diffMs = completedDate - startDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} hours and ${diffMins} minutes`;
  };

  const getCompletionStatus = (todo) => {
    if (!todo.completedAt) return "";
    const [endHour, endMin] = todo.endTime.split(':').map(Number);
    const completedDate = new Date(todo.completedAt);
    const endDate = new Date();
    endDate.setHours(endHour, endMin, 0, 0);
    const within = completedDate <= endDate;
    const timeTaken = calculateTimeTaken(todo.startTime, todo.completedAt);
    return `Completed in ${timeTaken} (${within ? 'Within deadline' : 'Out of deadline'})`;
  };

  const handleSignOut = () => {
    signOut();
    onSignOut();
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleProfileChange = (field, value) => {
    setProfileData((current) => ({ ...current, [field]: value }));
  };

  const handleSaveProfile = () => {
    if (!profileData.fullName.trim() || !profileData.profession.trim() || !profileData.gender) {
      alert("Please complete all profile fields before saving.");
      return;
    }

    const result = updateUserProfile(currentUser.email, {
      fullName: profileData.fullName,
      profession: profileData.profession,
      gender: profileData.gender,
    });

    if (result.success) {
      setCurrentUser(result.user);
      setIsEditingProfile(false);
    } else {
      alert(result.message || "Could not update profile.");
    }
  };

  const handleCancelProfile = () => {
    if (currentUser) {
      setProfileData({
        fullName: currentUser.fullName || "",
        profession: currentUser.profession || "",
        gender: currentUser.gender || "",
      });
    }
    setIsEditingProfile(false);
  };

  return (
    <section className={styles.appContainer}>
      <header className={styles.appHeader}>
        <div className={styles.headerContent}>
          <div className={styles.brandBlock}>
            <div className={styles.logoBadge}>K</div>
            <div>
              <h1>Karmanya</h1>
              <p className={styles.tagline}>A calm productivity companion.</p>
            </div>
          </div>
          <button onClick={handleEditProfile} className={styles.editProfileButton}>
            Edit Profile
          </button>
        </div>
        {currentUser && (
          <div className={styles.userInfo}>
            <p className={styles.userName}>{currentUser.fullName}</p>
            <p className={styles.userDetails}>{currentUser.profession} • {currentUser.email}</p>
          </div>
        )}
      </header>

      <PWAInstallPrompt />

      {isEditingProfile && (
        <div className={styles.profileCard}>
          <h2 className={styles.profileTitle}>Edit Profile</h2>
          <div className={styles.profileForm}>
            <label>
              Full Name
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => handleProfileChange("fullName", e.target.value)}
              />
            </label>
            <label>
              Profession
              <input
                type="text"
                value={profileData.profession}
                onChange={(e) => handleProfileChange("profession", e.target.value)}
              />
            </label>
            <label>
              Gender
              <select
                value={profileData.gender}
                onChange={(e) => handleProfileChange("gender", e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </label>
            <div className={styles.profileButtons}>
              <button type="button" onClick={handleSaveProfile} className={styles.saveProfileButton}>
                Save Profile
              </button>
              <button type="button" onClick={handleCancelProfile} className={styles.cancelProfileButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Sign Out Button */}
      <button onClick={handleSignOut} className={styles.floatingSignOutButton} title="Sign Out">
        <span>🚪</span>
      </button>

      <div className={styles.hierarchicalList}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Add Task</h2>
          <div className={styles.addTaskForm}>
            <input
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              placeholder="Task description..."
              aria-label="New task"
            />
            <input
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              aria-label="Start time"
            />
            <input
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              aria-label="End time"
            />
            <button type="button" onClick={addTodo}>Add Task</button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Active Tasks</h2>
          <ul className={styles.taskList}>
            {activeTodos.length === 0 ? (
              <li className={styles.emptyMessage}>No active tasks.</li>
            ) : (
              activeTodos.map((todo) => (
                <li key={todo.id} className={`${styles.taskItem} ${styles.active}`}>
                  <span className={styles.activeDot}></span>
                  <p className={styles.taskText}>{todo.text}</p>
                  <span className={styles.deadline}>Time: {todo.startTime} to {todo.endTime}</span>
                  <div className={styles.taskActions}>
                    <button onClick={() => toggleTodo(todo.id)}>Complete</button>
                    <button onClick={() => editTodo(todo.id)}>Edit</button>
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Completed Tasks</h2>
          <ul className={styles.taskList}>
            {completedTodos.length === 0 ? (
              <li className={styles.emptyMessage}>No completed tasks.</li>
            ) : (
              completedTodos.map((todo) => (
                <li key={todo.id} className={`${styles.taskItem} ${styles.completed}`}>
                  <p className={styles.taskText}>{todo.text}</p>
                  <span className={styles.completionMessage}>{getCompletionStatus(todo)}</span>
                  <div className={styles.taskActions}>
                    <button onClick={() => toggleTodo(todo.id)}>Reopen</button>
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
