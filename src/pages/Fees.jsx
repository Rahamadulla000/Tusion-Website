// import { useState } from 'react';

// function Fees({ students, fees, setFees }) {
//   const [studentId, setStudentId] = useState('');
//   const [month, setMonth] = useState('June');
//   const [amount, setAmount] = useState('');
//   const [status, setStatus] = useState('Pending');

//   const addFee = (event) => {
//     event.preventDefault();
//     if (!studentId || !amount) return;

//     const newEntry = {
//       id: Date.now(),
//       studentId: Number(studentId),
//       month,
//       amount: Number(amount),
//       status,
//     };

//     setFees((prev) => [...prev, newEntry]);
//     setAmount('');
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1>Fees</h1>
//           <p className="muted">Track monthly tuition fees, payment status, and student bill records.</p>
//         </div>
//       </div>

//       <div className="grid grid-2">
//         <form className="card" onSubmit={addFee}>
//           <h3>Record a Fee Payment</h3>
//           <p className="muted">Only admins can add or update fee records.</p>
//           <label>
//             Student
//             <select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
//               <option value="">Select student</option>
//               {students.map((student) => (
//                 <option key={student.id} value={student.id}>{student.name}</option>
//               ))}
//             </select>
//           </label>
//           <label>
//             Month
//             <input value={month} onChange={(event) => setMonth(event.target.value)} />
//           </label>
//           <label>
//             Amount
//             <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
//           </label>
//           <label>
//             Status
//             <select value={status} onChange={(event) => setStatus(event.target.value)}>
//               <option value="Pending">Pending</option>
//               <option value="Paid">Paid</option>
//             </select>
//           </label>
//           <div className="row" style={{ marginTop: 12 }}>
//             <button className="btn-primary" type="submit">Save Fee</button>
//           </div>
//         </form>

//         <div className="card">
//           <h3>Fee Summary</h3>
//           <p className="muted">Review all fee entries. Use this area to monitor paid and pending student dues.</p>
//           <table className="table">
//             <thead>
//               <tr><th>Student</th><th>Month</th><th>Amount</th><th>Status</th></tr>
//             </thead>
//             <tbody>
//               {fees.map((fee) => {
//                 const student = students.find((item) => item.id === fee.studentId);
//                 return (
//                   <tr key={fee.id}>
//                     <td>{student?.name || 'Unknown'}</td>
//                     <td>{fee.month}</td>
//                     <td>₹{fee.amount}</td>
//                     <td>{fee.status}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Fees;



import { useState } from "react";

function Fees({ students, fees, setFees, isAdmin }) {
  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState("June");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const addFee = async (event) => {
    event.preventDefault();

    if (!isAdmin || !studentId || !amount) return;

    try {
      const res = await fetch("http://localhost:4000/api/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: Number(studentId),
          month,
          amount: Number(amount),
          status,
        }),
      });

      const newFee = await res.json();

      setFees((prev) => [...prev, newFee]);

      setStudentId("");
      setMonth("June");
      setAmount("");
      setStatus("Pending");
    } catch (err) {
      console.error(err);
      alert("Unable to save fee");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Fees</h1>
          <p className="muted">
            Track monthly tuition fees, payment status, and student bill
            records.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <form className="card" onSubmit={addFee}>
          <h3>Record a Fee Payment</h3>

          <label>
            Student
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={!isAdmin}
            >
              <option value="">Select student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Month
            <input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              disabled={!isAdmin}
            />
          </label>

          <label>
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isAdmin}
            />
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!isAdmin}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </label>

          <div className="row" style={{ marginTop: 12 }}>
            <button
              className="btn-primary"
              type="submit"
              disabled={!isAdmin}
            >
              Save Fee
            </button>
          </div>
        </form>

        <div className="card">
          <h3>Fee Summary</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((fee) => {
                const student = students.find(
                  (s) => Number(s.id) === Number(fee.studentId)
                );

                return (
                  <tr key={fee.id}>
                    <td>{student?.name || "Unknown"}</td>
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
