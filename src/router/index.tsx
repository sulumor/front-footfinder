import { createBrowserRouter } from "react-router-dom";
import App from '@/components/App/App'
import Test from '@/pages/test/test.tsx'
import ErrorPage from "../components/Error/Error";

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