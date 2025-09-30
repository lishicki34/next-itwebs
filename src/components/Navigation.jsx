import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link className="nav-link" href="/">Main</Link>
      <Link className="nav-link" href="/about">About</Link>
      <Link className="nav-link" href="/users">Users</Link>
      <Link className="nav-link" href="/contacts">Contacts</Link>
    </nav>
  );
};

export default Navigation;