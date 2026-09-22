// lib/utils.js

export function generateStudentID() {
  const prefix = "GV";
  const year = new Date().getFullYear(); // Current Year (e.g., 2026)
  
  // Generate a random 6-digit number
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  
  return `${prefix}-${year}-${randomDigits}`; // Output: GV-2026-123456
}