import express from 'express';
import cors from 'cors';
import { initDb, query } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

await initDb();

app.get('/api/students', async (req, res) => {
  const rows = await query('SELECT * FROM students');
  res.json(rows);
});

app.post('/api/students', async (req, res) => {
  const { name, className, parentName, phone, joinDate, reliefDate, status, feeStatus, notes } = req.body;
  const result = await query(
    'INSERT INTO students (name, className, parentName, phone, joinDate, reliefDate, status, feeStatus, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, className, parentName, phone, joinDate, reliefDate, status, feeStatus, notes]
  );
  const inserted = await query('SELECT * FROM students WHERE id = ?', [result.insertId]);
  res.status(201).json(inserted[0]);
});

app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, className, parentName, phone, joinDate, reliefDate, status, feeStatus, notes } = req.body;
  await query(
    'UPDATE students SET name = ?, className = ?, parentName = ?, phone = ?, joinDate = ?, reliefDate = ?, status = ?, feeStatus = ?, notes = ? WHERE id = ?',
    [name, className, parentName, phone, joinDate, reliefDate, status, feeStatus, notes, id]
  );
  const updated = await query('SELECT * FROM students WHERE id = ?', [id]);
  res.json(updated[0]);
});

app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM students WHERE id = ?', [id]);
  res.status(204).send();
});

app.get('/api/attendance', async (req, res) => {
  const rows = await query('SELECT * FROM attendance');
  res.json(rows);
});

app.post('/api/attendance', async (req, res) => {
  const { studentId, date, status } = req.body;
  const result = await query(
    'INSERT INTO attendance (studentId, date, status) VALUES (?, ?, ?)',
    [studentId, date, status]
  );
  const inserted = await query('SELECT * FROM attendance WHERE id = ?', [result.insertId]);
  res.status(201).json(inserted[0]);
});

app.put('/api/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, date, status } = req.body;
  await query(
    'UPDATE attendance SET studentId = ?, date = ?, status = ? WHERE id = ?',
    [studentId, date, status, id]
  );
  const updated = await query('SELECT * FROM attendance WHERE id = ?', [id]);
  res.json(updated[0]);
});

app.delete('/api/attendance/:id', async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM attendance WHERE id = ?', [id]);
  res.status(204).send();
});

app.get('/api/marks', async (req, res) => {
  const rows = await query('SELECT * FROM marks');
  res.json(rows);
});

app.post('/api/marks', async (req, res) => {
  const { studentId, subject, score, total } = req.body;
  const result = await query(
    'INSERT INTO marks (studentId, subject, score, total) VALUES (?, ?, ?, ?)',
    [studentId, subject, score, total]
  );
  const inserted = await query('SELECT * FROM marks WHERE id = ?', [result.insertId]);
  res.status(201).json(inserted[0]);
});

app.put('/api/marks/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, subject, score, total } = req.body;
  await query('UPDATE marks SET studentId = ?, subject = ?, score = ?, total = ? WHERE id = ?', [studentId, subject, score, total, id]);
  const updated = await query('SELECT * FROM marks WHERE id = ?', [id]);
  res.json(updated[0]);
});

app.delete('/api/marks/:id', async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM marks WHERE id = ?', [id]);
  res.status(204).send();
});

app.get('/api/timings', async (req, res) => {
  const rows = await query('SELECT * FROM timings');
  res.json(rows);
});

app.post('/api/timings', async (req, res) => {
  const { label, batchType, day, startTime, endTime } = req.body;
  const result = await query(
    'INSERT INTO timings (label, batchType, day, startTime, endTime) VALUES (?, ?, ?, ?, ?)',
    [label, batchType, day, startTime, endTime]
  );
  const inserted = await query('SELECT * FROM timings WHERE id = ?', [result.insertId]);
  res.status(201).json(inserted[0]);
});

app.put('/api/timings/:id', async (req, res) => {
  const { id } = req.params;
  const { label, batchType, day, startTime, endTime } = req.body;
  await query(
    'UPDATE timings SET label = ?, batchType = ?, day = ?, startTime = ?, endTime = ? WHERE id = ?',
    [label, batchType, day, startTime, endTime, id]
  );
  const updated = await query('SELECT * FROM timings WHERE id = ?', [id]);
  res.json(updated[0]);
});

app.delete('/api/timings/:id', async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM timings WHERE id = ?', [id]);
  res.status(204).send();
});

app.get('/api/fees', async (req, res) => {
  const rows = await query('SELECT * FROM fees');
  res.json(rows);
});

app.post('/api/fees', async (req, res) => {
  const { studentId, month, amount, status } = req.body;
  const result = await query(
    'INSERT INTO fees (studentId, month, amount, status) VALUES (?, ?, ?, ?)',
    [studentId, month, amount, status]
  );
  const inserted = await query('SELECT * FROM fees WHERE id = ?', [result.insertId]);
  res.status(201).json(inserted[0]);
});

app.put('/api/fees/:id', async (req, res) => {
  const { id } = req.params;
  const { studentId, month, amount, status } = req.body;
  await query('UPDATE fees SET studentId = ?, month = ?, amount = ?, status = ? WHERE id = ?', [studentId, month, amount, status, id]);
  const updated = await query('SELECT * FROM fees WHERE id = ?', [id]);
  res.json(updated[0]);
});

app.delete('/api/fees/:id', async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM fees WHERE id = ?', [id]);
  res.status(204).send();
});

app.get('/api/settings', async (req, res) => {
  const rows = await query('SELECT * FROM settings LIMIT 1');
  res.json(rows[0] || null);
});

app.put('/api/settings', async (req, res) => {
  const { schoolName } = req.body;
  const settings = await query('SELECT id FROM settings LIMIT 1');
  if (settings.length) {
    await query('UPDATE settings SET schoolName = ? WHERE id = ?', [schoolName, settings[0].id]);
  } else {
    await query('INSERT INTO settings (schoolName) VALUES (?)', [schoolName]);
  }
  const updated = await query('SELECT * FROM settings LIMIT 1');
  res.json(updated[0]);
});

app.get('/api/holidays', async (req, res) => {
  const rows = await query('SELECT * FROM holidays');
  res.json(rows);
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`MySQL backend listening on port ${port}`);
});
