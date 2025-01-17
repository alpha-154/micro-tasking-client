import React from "react";
import AppRoute from "./routes/main/AppRoute";

import { Toaster } from "@/components/ui/sonner";

const App = () => (
  <>
    <AppRoute />
    <Toaster
      className="max-sm:max-w-[350px]"
      richColors
      position="bottom-right"
    />
  </>
);

export default App;
