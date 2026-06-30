import { useState } from 'react';
import StudentForm from '../components/StudentForm';

function Students({ students, setStudents }) {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingId, setEditingId] = useState(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === 'All' || student.className === filterClass;
    const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const addOrUpdateStudent = (studentData) => {
    if (editingId) {
      setStudents((prev) => prev.map((student) => (student.id === editingId ? { ...student, ...studentData } : student)));
      setEditingId(null);
      return;
    }

    const newStudent = { id: Date.now(), ...studentData };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p className="muted">Manage your students with join, relief, and status tracking.</p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="row">
            <input placeholder="Search by name" value={search} onChange={(event) => setSearch(event.target.value)} />
            <select value={filterClass} onChange={(event) => setFilterClass(event.target.value)}>
              <option value="All">All Classes</option>
              {Array.from(new Set(students.map((student) => student.className))).map((className) => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
            <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Left">Left</option>
            </select>
          </div>
        </div>
        <StudentForm
          onSubmit={addOrUpdateStudent}
          initialData={students.find((student) => student.id === editingId) || null}
          onCancel={() => setEditingId(null)}
        />
      </div>

      <div className="card">
        <h3>Student List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Parent</th>
              <th>Phone</th>
              <th>Join</th>
              <th>Relief</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.parentName}</td>
                <td>{student.phone}</td>
                <td>{student.joinDate}</td>
                <td>{student.reliefDate || '—'}</td>
                <td>{student.feeStatus || 'Current'}</td>
                <td><span className="chip">{student.status}</span></td>
                <td>
                  <div className="row">
                    <button className="btn-secondary" onClick={() => setEditingId(student.id)}>Edit</button>
                    <button className="btn-danger" onClick={() => removeStudent(student.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
