import { createBrowserRouter } from "react-router-dom";
import App from '@/pages/App/App.tsx'
import Test from '@/pages/test/test.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/test",
    element: <Test/>
  },
]);

export default router;