import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-warning">
      <p>Navbar admin page</p>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/definitions">Definitions</Link>
        </li>
        <li>
          <Link to="/dashboard/review-definitions">Review Definitions</Link>
        </li>
        <li>
          <Link to="/dashboard/deleted-definitions">Deleted Definition</Link>
        </li>
        <li>
          <Link to="/dashboard/users">Manage Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;