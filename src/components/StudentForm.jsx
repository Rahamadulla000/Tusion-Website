import { useState } from 'react';

const initialForm = {
  name: '',
  className: '',
  parentName: '',
  phone: '',
  joinDate: '',
  reliefDate: '',
  status: 'Active',
  feeStatus: 'Current',
  notes: '',
};

function StudentForm({ onSubmit, initialData = null, onCancel }) {
  const [form, setForm] = useState(initialData || initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Student' : 'Add Student'}</h3>
      <div className="form-grid">
        <label>
          Student Name
          <input required name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Class
          <input required name="className" value={form.className} onChange={handleChange} />
        </label>
        <label>
          Parent Name
          <input required name="parentName" value={form.parentName} onChange={handleChange} />
        </label>
        <label>
          Phone Number
          <input required name="phone" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          Join Date
          <input type="date" name="joinDate" value={form.joinDate} onChange={handleChange} />
        </label>
        <label>
          Relief/Leave Date
          <input type="date" name="reliefDate" value={form.reliefDate} onChange={handleChange} />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Left">Left</option>
          </select>
        </label>
        <label>
          Fee Status
          <select name="feeStatus" value={form.feeStatus} onChange={handleChange}>
            <option value="Current">Current</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label style={{ gridColumn: '1 / -1' }}>
          Notes
          <textarea name="notes" value={form.notes} onChange={handleChange} rows="3" />
        </label>
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn-primary" type="submit">Save</button>
        {onCancel ? <button className="btn-secondary" type="button" onClick={onCancel}>Cancel</button> : null}
      </div>
    </form>
  );
}

export default StudentForm;
