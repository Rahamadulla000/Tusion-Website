function Settings({ settings, setSettings }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="muted">Adjust your tuition center name and holidays.</p>
        </div>
      </div>

      <div className="card">
        <h3>Center Details</h3>
        <label>
          School / Center Name
          <input name="schoolName" value={settings.schoolName} onChange={handleChange} />
        </label>
        <h3>Holiday List</h3>
        <ul>
          {settings.holidays.map((holiday) => (
            <li key={holiday.id}>{holiday.name} — {holiday.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Settings;
