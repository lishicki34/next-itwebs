import Link from "next/link";
import styles from "./Navigation.module.css"

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link className={styles.nav_link} href="/">Main</Link>
      <Link className={styles.nav_link} href="/about">About</Link>
      <Link className={styles.nav_link} href="/users">Users</Link>
      <Link className={styles.nav_link} href="/contacts">Contacts</Link>
    </nav>
  );
};

export default Navigation;