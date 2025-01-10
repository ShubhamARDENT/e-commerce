import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Error from "./components/error";
import Navbar from "./components/navbar";
import Home from "./components/body";
import { Box } from "@mui/material";
import ProdcutDetails from "./components/productdetails";
import CartPage from "./components/cartpage";
import { useState } from "react";

const Applayout = ({ query, setQuery }: { query: string; setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Box sx={{ paddingTop: "90px" }}>
        <Outlet />
      </Box>
    </>
  );
};

function App() {
  const [query, setQuery] = useState<string>("");

  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Applayout query={query} setQuery={setQuery} />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home query={query} setQuery={setQuery} /> },
        { path: "/products/:id", element: <ProdcutDetails /> },
        { path: "/products/cart", element: <CartPage /> },
      ],
    },
  ]);

  return <RouterProvider router={AppRouter} />;
}

export default App;
