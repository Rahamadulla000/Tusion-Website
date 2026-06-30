import { NavLink } from 'react-router-dom';

function Sidebar({ links }) {
  return (
    <aside className="sidebar">
      <h2>Tuition Desk</h2>
      <p className="muted">Manage students, attendance, marks, and timing in one place.</p>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}>{link.label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
