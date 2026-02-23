import { createBrowserRouter } from "react-router-dom";
import FilterPage, { loader } from "./pages/FilterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
    loader,
  },
]);