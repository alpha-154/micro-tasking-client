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
import AdminPrivate from "../guard/AdminPrivate";
import AdminHome from "@/features/dashboard/admin/AdminHome";
import ManageUser from "@/features/dashboard/admin/ManageUser";
import ManageTask from "@/features/dashboard/admin/ManageTask";
//buyer imports
import BuyerPrivate from "../guard/BuyerPrivate";
import BuyerHome from "@/features/dashboard/buyer/BuyerHome";
import AddTask from "@/features/dashboard/buyer/AddTask";
import MyTask from "@/features/dashboard/buyer/MyTask";
import PurchaseCoin from "@/features/dashboard/buyer/PurchaseCoin";
import PaymentHistory from "@/features/dashboard/buyer/PaymentHistory";
//worker imports
import WorkerPrivate from "../guard/WorkerPrivate";
import WorkerHome from "@/features/dashboard/worker/WorkerHome";
import TaskLIst from "@/features/dashboard/worker/TaskLIst";
import MySubmissions from "@/features/dashboard/worker/MySubmissions";
import Withdrawals from "@/features/dashboard/worker/Withdrawals";

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
          <PrivateRoute>
            <DashboardLayout role="admin" />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <AdminPrivate>
              <AdminHome />
            </AdminPrivate>
          }
        />
        <Route
          path="manage-user"
          element={
            <AdminPrivate>
              <ManageUser />
            </AdminPrivate>
          }
        />
        <Route
          path="manage-task"
          element={
            <AdminPrivate>
              <ManageTask />
            </AdminPrivate>
          }
        />
      </Route>
      {/* buyer route */}
      <Route
        path="/dashboard/buyer"
        element={
          <PrivateRoute>
            <DashboardLayout role="buyer" />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <BuyerPrivate>
              <BuyerHome />
            </BuyerPrivate>
          }
        />
        <Route
          path="add-task"
          element={
            <BuyerPrivate>
              <AddTask />
            </BuyerPrivate>
          }
        />
        <Route
          path="my-task"
          element={
            <BuyerPrivate>
              <MyTask />
            </BuyerPrivate>
          }
        />
        <Route
          path="purchase-coins"
          element={
            <BuyerPrivate>
              <PurchaseCoin />
            </BuyerPrivate>
          }
        />
        <Route
          path="payment-history"
          element={
            <BuyerPrivate>
              <PaymentHistory />
            </BuyerPrivate>
          }
        />
      </Route>
      {/* worker */}
      <Route
        path="/dashboard/worker"
        element={
          <PrivateRoute>
            <DashboardLayout role="worker" />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <WorkerPrivate>
              <WorkerHome />
            </WorkerPrivate>
          }
        />
        <Route
          path="task-lists"
          element={
            <WorkerPrivate>
              <TaskLIst />
            </WorkerPrivate>
          }
        />
        <Route
          path="my-submissions"
          element={
            <WorkerPrivate>
              <MySubmissions />
            </WorkerPrivate>
          }
        />
        <Route
          path="withdrawals"
          element={
            <WorkerPrivate>
              <Withdrawals />
            </WorkerPrivate>
          }
        />
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
