// import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import Students from './pages/Students';
// import Attendance from './pages/Attendance';
// import Marks from './pages/Marks';
// import Schedule from './pages/Schedule';
// import Fees from './pages/Fees';
// import Settings from './pages/Settings';
// import { loadData, saveData } from './services/storage';


// const defaultStudents = [
//   {
//     id: 1,
//     name: 'Aarav Sharma',
//     className: 'Class 8',
//     parentName: 'Mr. Vijay Sharma',
//     phone: '9876543210',
//     joinDate: '2024-01-10',
//     reliefDate: '',
//     status: 'Active',
//   },
//   {
//     id: 2,
//     name: 'Meera Patel',
//     className: 'Class 10',
//     parentName: 'Mrs. Nita Patel',
//     phone: '9123456780',
//     joinDate: '2023-09-03',
//     reliefDate: '2025-05-01',
//     status: 'Left',
//   },
// ];

// const defaultTimings = [
//   { id: 1, label: 'Math Basics', batchType: 'Morning', day: 'Monday', startTime: '08:00', endTime: '09:00' },
//   { id: 2, label: 'Science Practice', batchType: 'Evening', day: 'Wednesday', startTime: '17:30', endTime: '19:00' },
// ];

// const defaultSettings = {
//   schoolName: 'Bright Tuition Center',
//   holidays: [
//     { id: 1, name: 'Independence Day', date: '2026-08-15' },
//     { id: 2, name: 'Diwali', date: '2026-11-08' },
//   ],
// };

// const defaultFees = [
//   { id: 1, studentId: 1, month: 'June', amount: 1500, status: 'Paid' },
//   { id: 2, studentId: 2, month: 'June', amount: 1800, status: 'Pending' },
// ];

// const navLinks = [
//   { to: '/', label: 'Dashboard' },
//   { to: '/students', label: 'Students' },
//   { to: '/attendance', label: 'Attendance' },
//   { to: '/marks', label: 'Marks' },
//   { to: '/schedule', label: 'Schedule' },
//   { to: '/fees', label: 'Fees' },
//   { to: '/settings', label: 'Settings' },
// ];

// function App() {
//   const [students, setStudents] = useState(() => loadData('students', defaultStudents));
//   const [attendance, setAttendance] = useState(() => loadData('attendance', []));
//   const [marks, setMarks] = useState(() => loadData('marks', []));
//   const [timings, setTimings] = useState(() => loadData('timings', defaultTimings));
//   const [fees, setFees] = useState(() => loadData('fees', defaultFees));
//   const [settings, setSettings] = useState(() => loadData('settings', defaultSettings));
//   const [role, setRole] = useState('user');
//   const isAdmin = role === 'admin';

//   useEffect(() => saveData('students', students), [students]);
//   useEffect(() => saveData('attendance', attendance), [attendance]);
//   useEffect(() => saveData('marks', marks), [marks]);
//   useEffect(() => saveData('timings', timings), [timings]);
//   useEffect(() => saveData('fees', fees), [fees]);
//   useEffect(() => saveData('settings', settings), [settings]);

//   return (
//     <HashRouter>
//       <div className="app-shell">
//         <Sidebar links={navLinks} role={role} setRole={setRole} />
//         <main className="main-content">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Dashboard
//                   students={students}
//                   attendance={attendance}
//                   marks={marks}
//                   timings={timings}
//                   fees={fees}
//                   settings={settings}
//                 />
//               }
//             />
//             <Route
//               path="/students"
//               element={<Students students={students} setStudents={setStudents} isAdmin={isAdmin} />}
//             />
//             <Route
//               path="/attendance"
//               element={<Attendance students={students} attendance={attendance} setAttendance={setAttendance} isAdmin={isAdmin} />}
//             />
//             <Route
//               path="/marks"
//               element={<Marks students={students} marks={marks} setMarks={setMarks} isAdmin={isAdmin} />}
//             />
//             <Route path="/schedule" element={<Schedule timings={timings} setTimings={setTimings} isAdmin={isAdmin} />} />
//             <Route path="/fees" element={<Fees students={students} fees={fees} setFees={setFees} isAdmin={isAdmin} />} />
//             <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} isAdmin={isAdmin} />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </HashRouter>
//   );
// }

// export default App;

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Schedule from "./pages/Schedule";
import Fees from "./pages/Fees";
import Settings from "./pages/Settings";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/students", label: "Students" },
  { to: "/attendance", label: "Attendance" },
  { to: "/marks", label: "Marks" },
  { to: "/schedule", label: "Schedule" },
  { to: "/fees", label: "Fees" },
  { to: "/settings", label: "Settings" },
];

function App() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [timings, setTimings] = useState([]);
  const [fees, setFees] = useState([]);
  const [settings, setSettings] = useState({});
  const [role, setRole] = useState("admin");

  const isAdmin = role === "admin";

  useEffect(() => {
    async function loadData() {
      try {
        const [
          studentsRes,
          attendanceRes,
          marksRes,
          timingsRes,
          feesRes,
          settingsRes,
        ] = await Promise.all([
          fetch("http://localhost:4000/api/students"),
          fetch("http://localhost:4000/api/attendance"),
          fetch("http://localhost:4000/api/marks"),
          fetch("http://localhost:4000/api/timings"),
          fetch("http://localhost:4000/api/fees"),
          fetch("http://localhost:4000/api/settings"),
        ]);

        const studentsData = await studentsRes.json();
        const attendanceData = await attendanceRes.json();
        const marksData = await marksRes.json();
        const timingsData = await timingsRes.json();
        const feesData = await feesRes.json();
        const settingsData = await settingsRes.json();

        setStudents(studentsData);
        setAttendance(attendanceData);
        setMarks(marksData);
        setTimings(timingsData);
        setFees(feesData);
        setSettings(settingsData);
      } catch (err) {
        console.error("API Error:", err);
      }
    }

    loadData();
  }, []);

  return (
    <HashRouter>
      <div className="app-shell">
        <Sidebar
          links={navLinks}
          role={role}
          setRole={setRole}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  students={students}
                  attendance={attendance}
                  marks={marks}
                  timings={timings}
                  fees={fees}
                  settings={settings}
                />
              }
            />

            <Route
              path="/students"
              element={
                <Students
                  students={students}
                  setStudents={setStudents}
                  isAdmin={isAdmin}
                />
              }
            />

            <Route
              path="/attendance"
              element={
                <Attendance
                  students={students}
                  attendance={attendance}
                  setAttendance={setAttendance}
                  isAdmin={isAdmin}
                />
              }
            />

            <Route
              path="/marks"
              element={
                <Marks
                  students={students}
                  marks={marks}
                  setMarks={setMarks}
                  isAdmin={isAdmin}
                />
              }
            />

            <Route
              path="/schedule"
              element={
                <Schedule
                  timings={timings}
                  setTimings={setTimings}
                  isAdmin={isAdmin}
                />
              }
            />

            <Route
              path="/fees"
              element={
                <Fees
                  students={students}
                  fees={fees}
                  setFees={setFees}
                  isAdmin={isAdmin}
                />
              }
            />

            <Route
              path="/settings"
              element={
                <Settings
                  settings={settings}
                  setSettings={setSettings}
                  isAdmin={isAdmin}
                />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;