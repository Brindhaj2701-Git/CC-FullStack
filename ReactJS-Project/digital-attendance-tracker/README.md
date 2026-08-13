# Digital Attendance Tracker

A modern, responsive digital attendance management application built with React JS for college students. The application uses `localStorage` for data persistence, ensuring a simple setup without the need for a backend or database.

## Features

- **Authentication**: Simple login system with demo credentials.
- **Dashboard**: Overview of key metrics, total students, classes, attendance percentage, and recent activity.
- **Student Management**: Add, edit, delete, and view students. Includes searching and filtering.
- **Subject Management**: Manage subjects, total classes, and faculty details.
- **Mark Attendance**: Interface to select a date and subject and mark students as Present or Absent. Prevents duplicate marking for the same date and subject.
- **Attendance History**: View historical attendance records with comprehensive filtering options.
- **Reports**: Detailed attendance percentage calculations with visual progress bars.
- **Low Attendance Alerts**: Dedicated section highlighting students with attendance below the mandatory 75% threshold.

## Technologies Used

- **React JS**: Component-based UI library.
- **Vite**: Next-generation frontend tooling for fast development.
- **JavaScript (JSX)**: Core logic and templating.
- **CSS3**: Vanilla CSS with CSS Variables for styling and responsiveness.
- **React Router DOM**: Client-side routing.
- **lucide-react**: Modern vector icons.
- **localStorage**: Client-side data persistence.

## React Concepts Demonstrated

- Functional Components
- JSX & Props
- `useState`, `useEffect` Hooks
- React Router (Nested routing, protected routes)
- Controlled Forms & Event Handling
- Conditional Rendering
- List mapping and keys
- Complex Array methods (`map`, `filter`, `reduce`)
- State persistence via `localStorage`

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Sidebar, Layout)
├── data/             # Initial mock data configuration
├── pages/            # Page-level components
├── utils/            # Helper functions for storage and calculations
├── App.jsx           # Main application routing logic
├── main.jsx          # Entry point
└── index.css         # Global styles and layout
```

## Demo Credentials

- **Username**: `admin`
- **Password**: `admin123`

## How to Install and Run

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd digital-attendance-tracker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173` (or the port specified in your terminal).

## Screenshots
*(Placeholder for future screenshots)*

## Future Enhancements
- Export attendance reports to CSV/PDF.
- Integration with a backend (Node.js/Spring Boot) and database (PostgreSQL/MongoDB).
- Role-based access control (Admin, Faculty, Student portals).
- Email/SMS notifications for low attendance.
