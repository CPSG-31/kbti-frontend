import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function PublicNavbar() {
  const { isLoggedIn, role } = useAuth();

  let actionNavbar;
  if (!isLoggedIn || (role !== 'admin' && role !== 'user')) {
    actionNavbar = (
      <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </>
    );
  } else if ((role === 'admin' || role === 'user') && isLoggedIn) {
    actionNavbar = (
      <>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><button>Logout</button></li>
      </>
    );
  }

  return (
    <nav className="bg-warning">
      <ul>
        {actionNavbar}
      </ul>
    </nav>
  );
}

export default PublicNavbar;
