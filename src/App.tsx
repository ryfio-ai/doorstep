import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { GamificationProvider } from './context/GamificationContext';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AuthCallback from './pages/auth/AuthCallback';
import OAuthConsentPage from './pages/auth/OAuthConsentPage';
import PaytmCallback from './pages/auth/PaytmCallback';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CourseDiscovery from './pages/student/CourseDiscovery';
import CourseDetail from './pages/student/CourseDetail';

// Student Portal
import StudentLayout from './components/layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import BookDemoPage from './pages/student/BookDemoPage';
import DemoConfirmation from './pages/student/DemoConfirmation';
import MyClassesPage from './pages/student/MyClassesPage';
import StudyMaterials from './pages/student/StudyMaterials';
import EnrollPage from './pages/student/EnrollPage';
import PaymentSuccess from './pages/student/PaymentSuccess';
import PaymentFailed from './pages/student/PaymentFailed';
import PaymentPending from './pages/student/PaymentPending';
import PaymentsHistory from './pages/student/PaymentsHistory';
import NotificationsPage from './pages/student/NotificationsPage';
import StudentProfile from './pages/student/StudentProfile';
import EduCoinWallet from './pages/student/EduCoinWallet';
import MyCoursePath from './pages/student/MyCoursePath';
import ReportsPage from './pages/student/ReportsPage';
import ParentDashboard from './pages/parent/ParentDashboard';

// Trainer Portal
import TrainerLayout from './components/layouts/TrainerLayout';
import TrainerOnboarding from './pages/trainer/TrainerOnboarding';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerSchedule from './pages/trainer/TrainerSchedule';
import TrainerStudents from './pages/trainer/TrainerStudents';
import TrainerMaterials from './pages/trainer/TrainerMaterials';
import TrainerEarnings from './pages/trainer/TrainerEarnings';
import TrainerNotifications from './pages/trainer/TrainerNotifications';
import TrainerProfile from './pages/trainer/TrainerProfile';

// Admin Portal
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import TrainerManagement from './pages/admin/TrainerManagement';
import CourseManagement from './pages/admin/CourseManagement';
import DemoManagement from './pages/admin/DemoManagement';
import EnrollmentManagement from './pages/admin/EnrollmentManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import AutoAssignment from './pages/admin/AutoAssignment';
import Communications from './pages/admin/Communications';
import CouponsReferrals from './pages/admin/CouponsReferrals';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <GamificationProvider>
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
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/oauth/consent" element={
                <ProtectedRoute requireOnboarding={false}>
                  <OAuthConsentPage />
                </ProtectedRoute>
              } />
              <Route path="/payment/callback" element={<PaytmCallback />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/courses" element={<CourseDiscovery />} />
              <Route path="/courses/:id" element={<CourseDetail />} />

              {/* Student Portal */}
              <Route path="/student" element={
                <ProtectedRoute allowedRole="student">
                  <StudentLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<CourseDiscovery />} />
                <Route path="courses/:id" element={<CourseDetail />} />
                <Route path="book-demo/:id" element={<BookDemoPage />} />
                <Route path="demo-confirmed" element={<DemoConfirmation />} />
                <Route path="classes" element={<MyClassesPage />} />
                <Route path="materials" element={<StudyMaterials />} />
                <Route path="enroll/:id" element={<EnrollPage />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="payment-failed" element={<PaymentFailed />} />
                <Route path="payment-pending" element={<PaymentPending />} />
                <Route path="payments" element={<PaymentsHistory />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="wallet" element={<EduCoinWallet />} />
                <Route path="course-path/:id" element={<MyCoursePath />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="parent-view" element={<ParentDashboard />} />
              </Route>

              {/* Trainer Portal */}
              <Route path="/trainer" element={
                <ProtectedRoute allowedRole="trainer">
                  <TrainerLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="onboarding" element={<TrainerOnboarding />} />
                <Route path="dashboard" element={<TrainerDashboard />} />
                <Route path="schedule" element={<TrainerSchedule />} />
                <Route path="students" element={<TrainerStudents />} />
                <Route path="materials" element={<TrainerMaterials />} />
                <Route path="earnings" element={<TrainerEarnings />} />
                <Route path="notifications" element={<TrainerNotifications />} />
                <Route path="profile" element={<TrainerProfile />} />
              </Route>

              {/* Admin Portal */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="trainers" element={<TrainerManagement />} />
                <Route path="courses" element={<CourseManagement />} />
                <Route path="demos" element={<DemoManagement />} />
                <Route path="enrollments" element={<EnrollmentManagement />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="assignment" element={<AutoAssignment />} />
                <Route path="communications" element={<Communications />} />
                <Route path="coupons" element={<CouponsReferrals />} />
                <Route path="reports" element={<Reports />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          </Router>
        </GamificationProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
