// function Schedule({ timings, setTimings }) {
//   const addTiming = () => {
//     const entry = { id: Date.now(), label: 'New Class', batchType: 'Morning', day: 'Monday', startTime: '09:00', endTime: '10:00' };
//     setTimings((prev) => [...prev, entry]);
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1>Schedule</h1>
//           <p className="muted">Organize class schedules and timing plans for your tuition batches.</p>
//         </div>
//       </div>

//       <div className="card">
//         <h3>Timings</h3>
//         <p className="muted">These are your active lesson slots. Admins can add new schedule entries.</p>
//         <table className="table">
//           <thead>
//             <tr><th>Label</th><th>Batch</th><th>Day</th><th>Start</th><th>End</th></tr>
//           </thead>
//           <tbody>
//             {timings.map((t) => (
//               <tr key={t.id}>
//                 <td>{t.label}</td>
//                 <td>{t.batchType}</td>
//                 <td>{t.day}</td>
//                 <td>{t.startTime}</td>
//                 <td>{t.endTime}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="row" style={{ marginTop: 12 }}>
//           <button className="btn-primary" onClick={addTiming}>Add Timing</button>
//           <span className="muted" style={{ marginLeft: 12 }}>
//             Add new class entries for future weeks.
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Schedule;


import { useState } from "react";

function Schedule({ timings, setTimings, isAdmin }) {
  const [loading, setLoading] = useState(false);

  const addTiming = async () => {
    if (!isAdmin) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/timings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: "New Class",
          batchType: "Morning",
          day: "Monday",
          startTime: "09:00",
          endTime: "10:00",
        }),
      });

      const newTiming = await res.json();

      setTimings((prev) => [...prev, newTiming]);
    } catch (err) {
      console.error(err);
      alert("Unable to add timing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Schedule</h1>
          <p className="muted">
            Organize class schedules and timing plans for your tuition batches.
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Timings</h3>

        <p className="muted">
          These are your active lesson slots.
        </p>

        <table className="table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Batch</th>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>

          <tbody>
            {timings.map((t) => (
              <tr key={t.id}>
                <td>{t.label}</td>
                <td>{t.batchType}</td>
                <td>{t.day}</td>
                <td>{t.startTime}</td>
                <td>{t.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row" style={{ marginTop: 12 }}>
          <button
            className="btn-primary"
            onClick={addTiming}
            disabled={!isAdmin || loading}
          >
            {loading ? "Saving..." : "Add Timing"}
          </button>

          <span className="muted" style={{ marginLeft: 12 }}>
            Add new class entries for future weeks.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
