export const calculateAttendancePercentage = (present, total) => {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
};

export const getAttendanceStatus = (percentage) => {
  if (percentage >= 75) return 'Good';
  if (percentage >= 65) return 'Warning';
  return 'Low';
};

export const getStudentOverallAttendance = (studentId, attendanceRecords, subjects) => {
  const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
  let totalPresent = 0;
  
  studentRecords.forEach(record => {
    if (record.status === 'Present') totalPresent++;
  });

  // Calculate total classes across all subjects for simplicity, or just total recorded attendance classes.
  // We use total classes conducted across all subjects the student is part of. For this app, assume all students take all subjects.
  const totalClasses = subjects.reduce((sum, sub) => sum + parseInt(sub.classesConducted || 0, 10), 0);

  const percentage = calculateAttendancePercentage(totalPresent, totalClasses);
  return {
    present: totalPresent,
    totalClasses,
    percentage,
    status: getAttendanceStatus(percentage)
  };
};
