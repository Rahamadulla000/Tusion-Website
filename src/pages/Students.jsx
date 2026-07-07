import { useState } from 'react';
import StudentForm from '../components/StudentForm';

/* ===================== FEES COMPONENT ===================== */
export function Fees({ students, fees, setFees }) {
  const [studentId, setStudentId] = useState('');
  const [month, setMonth] = useState('June');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');

  const addFee = (e) => {
    e.preventDefault();

    const newFee = {
      id: Date.now(),
      studentId,
      month,
      amount,
      status
    };

    setFees((prev) => [...prev, newFee]);

    setStudentId('');
    setMonth('June');
    setAmount('');
    setStatus('Pending');
  };

  return (
    <div className="page">
      <h1>Fees</h1>

      <form onSubmit={addFee} className="card">
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option>June</option>
          <option>July</option>
          <option>August</option>
        </select>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button type="submit">Add Fee</button>
      </form>
    </div>
  );
}

/* ===================== STUDENTS COMPONENT ===================== */
function Students({ students, setStudents, isAdmin }) {
  const [editing, setEditing] = useState(null);

  

  const addStudent = async (data) => {
  if (!isAdmin) return;

  const res = await fetch("http://localhost:4000/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const student = await res.json();

  setStudents((prev) => [...prev, student]);
};

 


  const updateStudent = async (data) => {
  if (!isAdmin) return;

  const res = await fetch(`http://localhost:4000/api/students/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const updated = await res.json();

  setStudents((prev) =>
    prev.map((s) => (s.id === updated.id ? updated : s))
  );

  setEditing(null);
};




const removeStudent = async (id) => {
  if (!isAdmin) return;

  await fetch(`http://localhost:4000/api/students/${id}`, {
    method: "DELETE",
  });

  setStudents((prev) => prev.filter((s) => s.id !== id));
};


  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p className="muted">
            Manage student records and contact information.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        {/* FORM */}
        <div className="card">
          {isAdmin ? (
            <StudentForm
              onSubmit={editing ? updateStudent : addStudent}
              initialData={editing}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <div>
              <h3>Admin Only</h3>
              <p className="muted">
                You have view-only access. Only admins can add or modify student records.
              </p>
            </div>
          )}
        </div>

        {/* TABLE */}
        <div className="card">
          <h3>Student List</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Parent</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.className}</td>
                  <td>{s.parentName}</td>
                  <td>{s.phone}</td>
                  <td>
                    <button disabled={!isAdmin} onClick={() => setEditing(s)}>Edit</button>
                    <button disabled={!isAdmin} onClick={() => removeStudent(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;