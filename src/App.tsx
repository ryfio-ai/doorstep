import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import { StudentLayout } from './components/layouts/StudentLayout';
import { TrainerLayout } from './components/layouts/TrainerLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseDiscovery from './pages/student/CourseDiscovery';
import CourseDetail from './pages/student/CourseDetail';
import BookDemoPage from './pages/student/BookDemoPage';
import EnrollPage from './pages/student/EnrollPage';
import MyClassesPage from './pages/student/MyClassesPage';
import TrainerSchedule from './pages/trainer/TrainerSchedule';
import TrainerEarnings from './pages/trainer/TrainerEarnings';
import StudentManagement from './pages/admin/StudentManagement';
import TrainerManagement from './pages/admin/TrainerManagement';
import CourseManagement from './pages/admin/CourseManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-inter">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<LandingPage />} />
          <Route path="/trainers" element={<LandingPage />} />
          <Route path="/contact" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/courses" element={<CourseDiscovery />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          {/* Student Portal */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<CourseDiscovery />} />
            <Route path="courses/:id" element={<CourseDetail />} />
            <Route path="classes" element={<MyClassesPage />} />
            <Route path="book-demo/:id" element={<BookDemoPage />} />
            <Route path="enroll/:id" element={<EnrollPage />} />
          </Route>
          
          {/* Trainer Portal */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route path="dashboard" element={<TrainerDashboard />} />
            <Route path="schedule" element={<TrainerSchedule />} />
            <Route path="earnings" element={<TrainerEarnings />} />
          </Route>
          
          {/* Admin Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="trainers" element={<TrainerManagement />} />
            <Route path="courses" element={<CourseManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
