import { MOCK_STUDENTS, MOCK_SUBJECTS, MOCK_ATTENDANCE } from '../data/mockData';

export const initializeStorage = () => {
  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(MOCK_STUDENTS));
  }
  if (!localStorage.getItem('subjects')) {
    localStorage.setItem('subjects', JSON.stringify(MOCK_SUBJECTS));
  }
  if (!localStorage.getItem('attendance')) {
    localStorage.setItem('attendance', JSON.stringify(MOCK_ATTENDANCE));
  }
};

export const getStudents = () => JSON.parse(localStorage.getItem('students') || '[]');
export const saveStudents = (students) => localStorage.setItem('students', JSON.stringify(students));

export const getSubjects = () => JSON.parse(localStorage.getItem('subjects') || '[]');
export const saveSubjects = (subjects) => localStorage.setItem('subjects', JSON.stringify(subjects));

export const getAttendance = () => JSON.parse(localStorage.getItem('attendance') || '[]');
export const saveAttendance = (records) => localStorage.setItem('attendance', JSON.stringify(records));

export const setAuth = (status) => localStorage.setItem('isAuthenticated', status);
export const getAuth = () => localStorage.getItem('isAuthenticated') === 'true';
export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};
