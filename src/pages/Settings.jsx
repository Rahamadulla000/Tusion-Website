// function Settings({ settings, setSettings }) {
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setSettings((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1>Settings</h1>
//           <p className="muted">Adjust your tuition center name and holidays.</p>
//         </div>
//       </div>

//       <div className="card">
//         <h3>Center Details</h3>
//         <p className="muted">Update your institution name and review holiday scheduling information.</p>
//         <label>
//           School / Center Name
//           <input name="schoolName" value={settings.schoolName} onChange={handleChange} />
//         </label>
//         <h3>Holiday List</h3>
//         <ul>
//           {settings.holidays.map((holiday) => (
//             <li key={holiday.id}>{holiday.name} — {holiday.date}</li>
//           ))}
//         </ul>
//         <p className="muted">Holiday dates are stored here as reference-only data for admins.</p>
//       </div>
//     </div>
//   );
// }

// export default Settings;


import { useState, useEffect } from "react";

function Settings({ settings, setSettings, isAdmin }) {
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    setSchoolName(settings?.schoolName || "");
  }, [settings]);

  const saveSettings = async () => {
    if (!isAdmin) return;

    try {
      const res = await fetch("http://localhost:4000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolName,
        }),
      });

      const updated = await res.json();
      setSettings(updated);

      alert("Settings saved successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to save settings");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="muted">
            Adjust your tuition center name and holidays.
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Center Details</h3>

        <label>
          School / Center Name
          <input
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            disabled={!isAdmin}
          />
        </label>

        <div style={{ marginTop: 15 }}>
          <button
            className="btn-primary"
            onClick={saveSettings}
            disabled={!isAdmin}
          >
            Save Settings
          </button>
        </div>

        <h3 style={{ marginTop: 25 }}>Holiday List</h3>

        <ul>
          {(settings?.holidays || []).map((holiday) => (
            <li key={holiday.id}>
              {holiday.name} — {holiday.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Settings;

