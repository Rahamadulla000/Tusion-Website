import { useMemo, useState } from 'react';

function Marks({ students, marks, setMarks }) {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('Math');
  const [score, setScore] = useState('');
  const [search, setSearch] = useState('');

  const visibleMarks = useMemo(() => {
    return marks.filter((entry) => {
      const student = students.find((item) => item.id === entry.studentId);
      return student?.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [marks, search, students]);

  const addMark = (event) => {
    event.preventDefault();
    if (!studentId || !score) return;

    const total = Number(score);
    const newEntry = {
      id: Date.now(),
      studentId: Number(studentId),
      subject,
      score: total,
      total,
    };
    setMarks((prev) => [...prev, newEntry]);
    setScore('');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Marks</h1>
          <p className="muted">Record subject-wise marks and review quick results.</p>
        </div>
      </div>

      <div className="grid grid-2">
        <form className="card" onSubmit={addMark}>
          <h3>Add Marks</h3>
          <label>
            Student
            <select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
              <option value="">Select student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </label>
          <label>
            Subject
            <input value={subject} onChange={(event) => setSubject(event.target.value)} />
          </label>
          <label>
            Score
            <input type="number" value={score} onChange={(event) => setScore(event.target.value)} />
          </label>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn-primary" type="submit">Save Marks</button>
          </div>
        </form>

        <div className="card">
          <h3>Search Student Marks</h3>
          <input placeholder="Search by student name" value={search} onChange={(event) => setSearch(event.target.value)} />
          <table className="table">
            <thead>
              <tr><th>Student</th><th>Subject</th><th>Score</th></tr>
            </thead>
            <tbody>
              {visibleMarks.map((entry) => {
                const student = students.find((item) => item.id === entry.studentId);
                return (
                  <tr key={entry.id}>
                    <td>{student?.name || 'Unknown'}</td>
                    <td>{entry.subject}</td>
                    <td>{entry.score}</td>
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

export default Marks;
