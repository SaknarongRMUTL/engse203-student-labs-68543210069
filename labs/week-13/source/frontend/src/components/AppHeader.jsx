import { NavLink } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/authService.js';
const links = [
  ['/', 'Dashboard'],
  ['/requests/new', 'New Request'],
  ['/about', 'About'],
];

function AppHeader() {
  const loggedIn = isLoggedIn();
  const handleLogout = () => {
    logout();
    window.location.href = '#/';
    window.location.reload();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 13</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก">
          {links.map(([to, label]) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
          {loggedIn ? (
            <button 
              className="nav-link" 
              onClick={handleLogout} 
              style={{ background: 'transparent', cursor: 'pointer' }}
            >
              ออกจากระบบ (เจ้าหน้าที่ฝ่ายบริการ)
              </button>
          ) : (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to="/login"
            >
              เจ้าหน้าที่
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
