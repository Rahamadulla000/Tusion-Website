import { NavLink } from 'react-router-dom';

function Sidebar({ links, role, setRole }) {
  return (
    <aside className="sidebar">
      <h2>Tuition Desk</h2>
      <p className="muted">Manage students, attendance, marks, and timing in one place.</p>
      <div className="sidebar-role">
        <label>
          Role
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}>{link.label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
