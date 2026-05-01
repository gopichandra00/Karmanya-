import Head from "next/head";
import TodoApp from "../components/TodoApp";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Karmanya</title>
        <meta name="description" content="A task management app with KARMANYA" />
      </Head>
      <main className={styles.pageShell}>
        <div className={styles.container}>
          <TodoApp />
        </div>
      </main>
    </>
  );
}
