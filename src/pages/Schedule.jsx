function Schedule({ timings, setTimings }) {
  const addTiming = () => {
    const entry = { id: Date.now(), label: 'New Class', batchType: 'Morning', day: 'Monday', startTime: '09:00', endTime: '10:00' };
    setTimings((prev) => [...prev, entry]);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Schedule</h1>
          <p className="muted">Manage class timings and batches.</p>
        </div>
      </div>

      <div className="card">
        <h3>Timings</h3>
        <table className="table">
          <thead>
            <tr><th>Label</th><th>Batch</th><th>Day</th><th>Start</th><th>End</th></tr>
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
          <button className="btn-primary" onClick={addTiming}>Add Timing</button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
