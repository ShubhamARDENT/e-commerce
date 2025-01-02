import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Error from "./components/error";
import Navbar from "./components/navbar";
import Home from "./components/body";
import { Box } from "@mui/material";
import ProdcutDetails from "./components/productdetails";


const Applayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ paddingTop: "90px" }}>
        <Outlet />
      </Box>
    </>
  );
};
// add errorlement
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [{ path: "/", element: <Home /> },
    { path: "/products/:id", element: <ProdcutDetails /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
