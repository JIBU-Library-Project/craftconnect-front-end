import {  createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Layout from "./layouts/Layout";
import HomePage from "./pages/userpublic/HomePage";
import SearchPage from "./pages/userpublic/SearchPage";
import ContactPage from "./pages/userpublic/ContactPage";

// Artisan
import ArtisanDashboardLayout from "./layouts/ArtisanDashboardLayout";
import ArtisanDashboardPage from "./pages/artisan/ArtisanDashboardPage";
import ArtisanProfilePage from "./pages/artisan/ArtisanProfilePage";
import ArtisanJobsPage from "./pages/artisan/ArtisanJobsPage";
import ArtisanJobDetailPage from "./pages/artisan/ArtisanJobDetailPage";
import ArtisanServicesViewPage from "./pages/artisan/ArtisanServicesViewPage";
import ArtisanAddEditServicesPage from "./pages/artisan/ArtisanAddEditServicesPage";
import ArtisanProfileEditPage from "./pages/artisan/ArtisanProfileEditPage";
import ArtisanVerificationPage from "./pages/artisan/ArtisanVerificationPage";
import ArtisanVerificationStatusPage from "./pages/artisan/ArtisanVerificationStatusPage";

//user
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserJobsPage from "./pages/user/UserJobsPage";
import UserJobDetailPage from "./pages/user/UserJobDetailPage";
import PublicArtisanProfilePage from "./pages/userpublic/PublicArtisanProfilePage";
import LeaveReviewPage from "./pages/user/LeaveReviewPage";
import UserProfilePage from "./pages/user/UserProfilePage.";
import UserReviewsPage from "./pages/user/UserReviewsPage";

//Admin
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminVerificationPage from "./pages/admin/AdminVerificationPage";
import AdminVerificationDetailPage from "./pages/admin/AdminVerificationDetailPage";
import AdminReviewListPage from "./pages/admin/AdminReviewListPage";
import AdminReviewDetailPage from "./pages/admin/AdminReviewDetailPage";
import AdminUsersListPage from "./pages/admin/AdminUsersListPage";
import AdminUserDetailPage from "./pages/admin/AdminUserDetailPage";
import AdminArtisansListPage from "./pages/admin/AdminArtisansListPage";
import AdminArtisanDetailPage from "./pages/admin/AdminArtisanDetailPage";

//Auth
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "search", element: <SearchPage /> },
        { path: "artisan/:id", element: <PublicArtisanProfilePage /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },

    // Artisan Dashboard Layout
    {
      path: "/artisan",
      element: <ArtisanDashboardLayout />,
      children: [
        { index: true, element: <ArtisanDashboardPage /> },
        { path: "profile", element: <ArtisanProfilePage /> },
        { path: "jobs", element: <ArtisanJobsPage /> },
        { path: "jobs/view/:jobId", element: <ArtisanJobDetailPage /> },
        { path: "services", element: <ArtisanServicesViewPage /> },
        { path: "services-edit", element: <ArtisanAddEditServicesPage /> },
        { path: "profile/edit", element: <ArtisanProfileEditPage /> },
        { path: "verification", element: <ArtisanVerificationPage /> },
        { path: "verify/status", element: <ArtisanVerificationStatusPage /> },
      ],
    },

    // Homeowner Dashboard Layout
    {
      path: "/homeowner",
      element: <UserDashboardLayout />,
      children: [
        { index: true, element: <UserDashboardPage /> },
        { path: "my-jobs", element: <UserJobsPage /> },
        { path: "my-jobs/:jobId", element: <UserJobDetailPage /> },
        { path: "my-jobs/:id/review", element: <LeaveReviewPage /> },
        { path: "user-profile", element: <UserProfilePage /> },
        { path: "user-reviews", element: <UserReviewsPage /> },
      ],
    },

    // Admin Layout
    {
      path: "/admin",
      element: <AdminDashboardLayout />,
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: "verification", element: <AdminVerificationPage /> },
        { path: "verify-detail", element: <AdminVerificationDetailPage /> },
        { path: "reviews", element: <AdminReviewListPage /> },
        { path: "reviews/:reviewId", element: <AdminReviewDetailPage /> },
        { path: "users", element: <AdminUsersListPage /> },
        { path: "users/:userId", element: <AdminUserDetailPage /> },
        { path: "artisan", element: <AdminArtisansListPage /> },
        { path: "artisan/:artisanId", element: <AdminArtisanDetailPage /> },
      ],
    },

    // Auth routes
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/reset", element: <ResetPasswordPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },

    // Catch-all 404
    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center text-white">
          Page Not Found
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
