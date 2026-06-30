function Dashboard({ students, attendance, marks, timings, fees, settings }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayAttendance = attendance.filter((entry) => entry.date === today);
  const presentCount = todayAttendance.filter((entry) => entry.status === 'Present').length;
  const averageMarks = marks.length
    ? (marks.reduce((sum, item) => sum + item.total, 0) / marks.length).toFixed(1)
    : '0.0';
  const pendingFees = fees.filter((fee) => fee.status === 'Pending').length;

  const IconBadge = ({ children }) => <div className="icon-badge">{children}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Welcome to your tuition management workspace.</p>
        </div>
        <div className="chip">{settings.schoolName}</div>
      </div>

      <div className="grid grid-3">
        <div className="card stat-card">
          <div>
            <div className="muted small">Total Students</div>
            <strong>{students.length}</strong>
          </div>
          <IconBadge>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>
          </IconBadge>
        </div>
        <div className="card stat-card">
          <div>
            <div className="muted small">Today's Attendance</div>
            <strong>{presentCount}</strong>
          </div>
          <IconBadge>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12.5 9 16l10-10"/></svg>
          </IconBadge>
        </div>
        <div className="card stat-card">
          <div>
            <div className="muted small">Average Marks</div>
            <strong>{averageMarks}</strong>
          </div>
          <IconBadge>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19h16"/><path d="M7 15V8"/><path d="M12 15V5"/><path d="M17 15v-3"/></svg>
          </IconBadge>
        </div>
        <div className="card stat-card">
          <div>
            <div className="muted small">Pending Fees</div>
            <strong>{pendingFees}</strong>
          </div>
          <IconBadge>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16"/><path d="M7 7V5h10v2"/><path d="M8 7v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7"/></svg>
          </IconBadge>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Upcoming Holidays</h3>
          <ul className="list-stack">
            {settings.holidays.map((holiday) => (
              <li key={holiday.id}><span className="dot">✦</span>{holiday.name} — {holiday.date}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Today's Tuition Timing</h3>
          <ul className="list-stack">
            {timings.map((timing) => (
              <li key={timing.id}><span className="dot">⏰</span>{timing.label} · {timing.batchType} · {timing.startTime} - {timing.endTime}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
