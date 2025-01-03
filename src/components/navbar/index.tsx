import { AppBar, Box, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { Products } from "../../interfaces/cartInterface";

const Navbar = () => {

  const cartItem = useAppSelector(state => state.cartReducer.cart)

  const totalQuantity = cartItem.reduce((total, item: Products) => total + (item.quantity || 0), 0)

  return (
    <>
      <AppBar
        sx={{
          background: "#e5e5e5",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: "30px",
          boxShadow: "none",
        }}
      >
        <Box>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography
              variant="h1"
              sx={{ fontSize: "1.2rem", fontWeight: "600" }}
            >
              Chanta
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography
              component="span"
              sx={{
                textDecoration: "none",
                marginRight: "20px",
                ":hover": {
                  textDecoration: "underline",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "10px",
                },
              }}
            >
              Shop
            </Typography>
          </Link>

          <Typography
            component="span"
            sx={{
              textDecoration: "none",
              marginRight: "20px",
              ":hover": {
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "10px",
              },
            }}
          >
            Collections
          </Typography>
          <Typography
            component="span"
            sx={{
              textDecoration: "none",
              marginRight: "20px",
              ":hover": {
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "10px",
              },
            }}
          >
            Explore
          </Typography>
          <Typography component="span">...</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <Link to={"/products/cart"} style={{ textDecoration: "none", color: "black" }}>
            <Typography
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                position: "relative",
                ":hover": {
                  textDecoration: "underline",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "10px",
                },
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ marginRight: "8px", }} />
              Cart
              <Typography sx={{
                position: "absolute",
                paddingX: "8px",
                background: "black",
                color: "white",
                fontSize: "1rem",
                borderRadius: "25px",
                left: "100%",
                bottom: "40%"
              }}>{totalQuantity}</Typography>
            </Typography>
          </Link>

          <Typography
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "10px",
              },

            }}
          >
            <PersonOutlineOutlinedIcon sx={{ marginRight: "8px" }} /> My Account
          </Typography>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
