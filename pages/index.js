import Head from "next/head";
import { useEffect, useState } from "react";
import TodoApp from "../components/TodoApp";
import LoginPage from "../components/LoginPage";
import { getCurrentUser } from "../utils/auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>Karmanya</title>
        </Head>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}>
          <p style={{ color: "white", fontSize: "1.2rem" }}>Loading...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Karmanya - Sign In</title>
          <meta name="description" content="A task management app with KARMANYA" />
        </Head>
        <LoginPage onLoginSuccess={setUser} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Karmanya</title>
        <meta name="description" content="A task management app with KARMANYA" />
      </Head>
      <main className={styles.pageShell}>
        <div className={styles.container}>
          <TodoApp onSignOut={() => setUser(null)} />
        </div>
      </main>
    </>
  );
}
