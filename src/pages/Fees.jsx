import { useState } from 'react';

function Fees({ students, fees, setFees }) {
  const [studentId, setStudentId] = useState('');
  const [month, setMonth] = useState('June');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');

  const addFee = (event) => {
    event.preventDefault();
    if (!studentId || !amount) return;

    const newEntry = {
      id: Date.now(),
      studentId: Number(studentId),
      month,
      amount: Number(amount),
      status,
    };

    setFees((prev) => [...prev, newEntry]);
    setAmount('');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Fees</h1>
          <p className="muted">Track monthly tuition fees and payment status.</p>
        </div>
      </div>

      <div className="grid grid-2">
        <form className="card" onSubmit={addFee}>
          <h3>Add Fee Record</h3>
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
            Month
            <input value={month} onChange={(event) => setMonth(event.target.value)} />
          </label>
          <label>
            Amount
            <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label>
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </label>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn-primary" type="submit">Save Fee</button>
          </div>
        </form>

        <div className="card">
          <h3>Fee Summary</h3>
          <table className="table">
            <thead>
              <tr><th>Student</th><th>Month</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {fees.map((fee) => {
                const student = students.find((item) => item.id === fee.studentId);
                return (
                  <tr key={fee.id}>
                    <td>{student?.name || 'Unknown'}</td>
                    <td>{fee.month}</td>
                    <td>₹{fee.amount}</td>
                    <td>{fee.status}</td>
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

export default Fees;
