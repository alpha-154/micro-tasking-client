// utils/roles.js
export const roles = {
  admin: [
    { path: "/dashboard/admin", title: "Home" },
    { path: "/dashboard/admin/manage-user", title: "Manage Users" },
    { path: "/dashboard/admin/manage-task", title: "Manage Tasks" },
  ],
  buyer: [
    { path: "/dashboard/buyer", title: "Home" },
    { path: "/dashboard/buyer/add-task", title: "Add Task" },
    { path: "/dashboard/buyer/my-task", title: "My Task" },
    { path: "/dashboard/buyer/payment-history", title: "Payment History" },
    { path: "/dashboard/buyer/purchase-coin", title: "Purchase Coin" },
  ],
  worker: [
    { path: "/dashboard/worker", title: "Home" },
    { path: "/dashboard/worker/task-list", title: "Task List" },
    { path: "/dashboard/worker/my-submissions", title: "My Submissions" },
    { path: "/dashboard/worker/withdrawals", title: "Withdrawals" },
  ],
};
