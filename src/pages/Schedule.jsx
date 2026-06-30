import { useState } from 'react';

function Schedule({ timings, setTimings }) {
  const [form, setForm] = useState({ label: '', batchType: 'Morning', day: 'Monday', startTime: '', endTime: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addTiming = (event) => {
    event.preventDefault();
    if (!form.label || !form.startTime || !form.endTime) return;

    if (editingId) {
      setTimings((prev) => prev.map((timing) => (timing.id === editingId ? { ...timing, ...form } : timing)));
      setEditingId(null);
    } else {
      setTimings((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm({ label: '', batchType: 'Morning', day: 'Monday', startTime: '', endTime: '' });
  };

  const startEdit = (timing) => {
    setEditingId(timing.id);
    setForm({ label: timing.label, batchType: timing.batchType, day: timing.day, startTime: timing.startTime, endTime: timing.endTime });
  };

  const deleteTiming = (id) => {
    setTimings((prev) => prev.filter((timing) => timing.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ label: '', batchType: 'Morning', day: 'Monday', startTime: '', endTime: '' });
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Schedule</h1>
          <p className="muted">Create and edit tuition batches with easy timing management.</p>
        </div>
      </div>

      <div className="grid grid-2">
        <form className="card" onSubmit={addTiming}>
          <h3>Add Timing</h3>
          <label>
            Batch Name
            <input name="label" value={form.label} onChange={handleChange} />
          </label>
          <label>
            Batch Type
            <select name="batchType" value={form.batchType} onChange={handleChange}>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </label>
          <label>
            Day
            <input name="day" value={form.day} onChange={handleChange} />
          </label>
          <label>
            Start Time
            <input name="startTime" value={form.startTime} onChange={handleChange} />
          </label>
          <label>
            End Time
            <input name="endTime" value={form.endTime} onChange={handleChange} />
          </label>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn-primary" type="submit">{editingId ? 'Update Timing' : 'Save Timing'}</button>
            {editingId ? <button className="btn-secondary" type="button" onClick={() => { setEditingId(null); setForm({ label: '', batchType: 'Morning', day: 'Monday', startTime: '', endTime: '' }); }}>Cancel</button> : null}
          </div>
        </form>

        <div className="card">
          <h3>Current Schedule</h3>
          <table className="table">
            <thead>
              <tr><th>Batch</th><th>Type</th><th>Day</th><th>Time</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {timings.map((timing) => (
                <tr key={timing.id}>
                  <td>{timing.label}</td>
                  <td>{timing.batchType}</td>
                  <td>{timing.day}</td>
                  <td>{timing.startTime} - {timing.endTime}</td>
                  <td>
                    <div className="row">
                      <button className="btn-secondary" type="button" onClick={() => startEdit(timing)}>Edit</button>
                      <button className="btn-danger" type="button" onClick={() => deleteTiming(timing.id)}>Delete</button>
                    </div>
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

export default Schedule;
