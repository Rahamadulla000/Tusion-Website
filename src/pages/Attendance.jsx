import { useMemo, useState } from 'react';

function Attendance({ students, attendance, setAttendance }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [filterDate, setFilterDate] = useState('');

  const currentEntries = useMemo(() => attendance.filter((entry) => entry.date === selectedDate), [attendance, selectedDate]);

  const handleStatusChange = (studentId, status) => {
    const existing = currentEntries.find((entry) => entry.studentId === studentId);

    if (existing) {
      setAttendance((prev) => prev.map((entry) => (entry.id === existing.id ? { ...entry, status } : entry)));
      return;
    }

    setAttendance((prev) => [...prev, { id: Date.now(), date: selectedDate, studentId, status }]);
  };

  const history = filterDate
    ? attendance.filter((entry) => entry.date === filterDate)
    : attendance;

  const monthlySummary = useMemo(() => {
    const monthEntries = attendance.filter((entry) => entry.date.startsWith(selectedDate.slice(0, 7)));
    const present = monthEntries.filter((entry) => entry.status === 'Present').length;
    const absent = monthEntries.filter((entry) => entry.status === 'Absent').length;
    return { present, absent, total: present + absent };
  }, [attendance, selectedDate]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p className="muted">Mark presence, review daily records, and inspect monthly patterns.</p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Mark Attendance</h3>
          <label>
            Select Date
            <input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />
          </label>
          <table className="table">
            <thead>
              <tr><th>Student</th><th>Status</th></tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const entry = currentEntries.find((item) => item.studentId === student.id);
                return (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <div className="row">
                        <button className="btn-primary" onClick={() => handleStatusChange(student.id, 'Present')}>Present</button>
                        <button className="btn-secondary" onClick={() => handleStatusChange(student.id, 'Absent')}>Absent</button>
                      </div>
                      <div className="small muted">{entry?.status || 'Pending'}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Monthly Summary</h3>
          <div className="row" style={{ marginBottom: 12 }}>
            <span className="chip">Present: {monthlySummary.present}</span>
            <span className="chip">Absent: {monthlySummary.absent}</span>
            <span className="chip">Total: {monthlySummary.total}</span>
          </div>
          <h3>Attendance History</h3>
          <label>
            Filter by Date
            <input type="date" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} />
          </label>
          <table className="table">
            <thead>
              <tr><th>Date</th><th>Student</th><th>Status</th></tr>
            </thead>
            <tbody>
              {history.map((entry) => {
                const student = students.find((item) => item.id === entry.studentId);
                return (
                  <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{student?.name || 'Unknown'}</td>
                    <td>{entry.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
