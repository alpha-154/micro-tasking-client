import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import RegisterForm from "@/features/auth/Register";
import LoginForm from "@/features/auth/Login";
import Unauthorized from "@/pages/Unauthorized";
import PrivateRoute from "../guard/PrivateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
//admin imports
import AdminHome from "@/features/dashboard/admin/AdminHome";
import ManageUser from "@/features/dashboard/admin/ManageUser";
import ManageTask from "@/features/dashboard/admin/ManageTask";
//buyer imports
import BuyerHome from "@/features/dashboard/buyer/BuyerHome";
import AddTask from "@/features/dashboard/buyer/AddTask";
import MyTask from "@/features/dashboard/buyer/MyTask";
import PurchaseCoin from "@/features/dashboard/buyer/PurchaseCoin";
import PaymentHistory from "@/features/dashboard/buyer/PaymentHistory";
//worker imports
import WorkerHome from "@/features/dashboard/worker/WorkerHome";
import TaskLIst from "@/features/dashboard/worker/TaskLIst";
import MySubmissions from "@/features/dashboard/worker/MySubmissions";
import Withdrawals from "@/features/dashboard/worker/Withdrawals";
import TaskDetail from "@/features/dashboard/worker/TaskDetail";

const AppRoute = () => (
  <Router>
    <Routes>
      {/* root layout */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      {/* dashboard layout */}
      {/* admin  */}
      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute role="admin">
            <DashboardLayout role="admin" />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="manage-user" element={<ManageUser />} />
        <Route path="manage-task" element={<ManageTask />} />
      </Route>
      {/* buyer route */}
      <Route
        path="/dashboard/buyer"
        element={
          <PrivateRoute role="buyer">
            <DashboardLayout role="buyer" />
          </PrivateRoute>
        }
      >
        <Route index element={<BuyerHome />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="my-task" element={<MyTask />} />
        <Route path="purchase-coin" element={<PurchaseCoin />} />
        <Route path="payment-history" element={<PaymentHistory />} />
      </Route>
      {/* worker */}
      <Route
        path="/dashboard/worker"
        element={
          <PrivateRoute role="worker">
            <DashboardLayout role="worker" />
          </PrivateRoute>
        }
      >
        <Route index element={<WorkerHome />} />
        <Route path="task-list" element={<TaskLIst />} />
        <Route path="my-submissions" element={<MySubmissions />} />
        <Route path="withdrawals" element={<Withdrawals />} />
        <Route path="task-details/:taskId" element={<TaskDetail />} />
      </Route>

      {/* auth routes */}
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default AppRoute;
