import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// dotenv.config();
dotenv.config({ path: '../.env' });
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);

const dbName = process.env.DB_NAME || 'tuition_app';
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};
let pool;

async function createPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query(sql, params) {
  const connection = await createPool();
  const [rows] = await connection.query(sql, params);
  return rows;
}

export async function initDb() {
  const initConn = await mysql.createConnection(dbConfig);
  await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await initConn.end();

  await createPool();

  await query(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      className VARCHAR(255) NOT NULL,
      parentName VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      joinDate DATE,
      reliefDate DATE,
      status VARCHAR(50) DEFAULT 'Active',
      feeStatus VARCHAR(50) DEFAULT 'Current',
      notes TEXT
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      date DATE NOT NULL,
      status VARCHAR(50) NOT NULL,
      FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS marks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      subject VARCHAR(255) NOT NULL,
      score INT NOT NULL,
      total INT NOT NULL,
      FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS timings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      batchType VARCHAR(100) NOT NULL,
      day VARCHAR(50) NOT NULL,
      startTime VARCHAR(10) NOT NULL,
      endTime VARCHAR(10) NOT NULL
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS fees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      month VARCHAR(50) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) NOT NULL,
      FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      schoolName VARCHAR(255) NOT NULL
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS holidays (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    )
  `);

  const existingSettings = await query('SELECT id FROM settings LIMIT 1');
  if (!existingSettings.length) {
    await query('INSERT INTO settings (schoolName) VALUES (?)', ['Bright Tuition Center']);
    await query(
      'INSERT INTO holidays (name, date) VALUES (?, ?), (?, ?)',
      ['Independence Day', '2026-08-15', 'Diwali', '2026-11-08']
    );
  }

  const studentsCount = await query('SELECT COUNT(*) as count FROM students');
  if (studentsCount[0]?.count === 0) {
    await query(
      'INSERT INTO students (name, className, parentName, phone, joinDate, reliefDate, status) VALUES (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?)',
      [
        'Aarav Sharma', 'Class 8', 'Mr. Vijay Sharma', '9876543210', '2024-01-10', null, 'Active',
        'Meera Patel', 'Class 10', 'Mrs. Nita Patel', '9123456780', '2023-09-03', '2025-05-01', 'Left',
      ]
    );
  }

  const timingsCount = await query('SELECT COUNT(*) as count FROM timings');
  if (timingsCount[0]?.count === 0) {
    await query(
      'INSERT INTO timings (label, batchType, day, startTime, endTime) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)',
      ['Math Basics', 'Morning', 'Monday', '08:00', '09:00', 'Science Practice', 'Evening', 'Wednesday', '17:30', '19:00']
    );
  }
}
