import { createBrowserRouter } from "react-router-dom";
import App from '@/pages/App/App.tsx'
import Test from '@/pages/test/test.tsx'
import ErrorPage from "@/pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/test",
    element: <Test/>
  },
]);

export default router;