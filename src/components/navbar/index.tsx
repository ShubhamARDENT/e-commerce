import { AppBar, Box, IconButton, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { Products } from "../../interfaces/cartInterface";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useState } from "react";


interface INavbar {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}

const Navbar: React.FC<INavbar> = ({ query, setQuery }) => {
  const [Expanded, setExpanded] = useState(false)
  const cartItem = useAppSelector(state => state.cartReducer.cart)
  const totalQuantity = cartItem.reduce((total, item: Products) => total + (item.quantity || 0), 0)

  // make search input box visible
  const handleSearchInputDisplay = () => {
    setExpanded((Expanded) => !Expanded)
  }

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }


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
          fontFamily: "Lexend"
        }}
      >
        {/* title */}
        <Box>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography
              variant="h1"
              sx={{ fontSize: "1.2rem", fontWeight: "600", fontFamily: "Lexend" }}
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
                fontFamily: "Lexend",
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
              fontFamily: "Lexend",
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
              fontFamily: "Lexend",
              ":hover": {
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "10px",
              },
            }}
          >
            Explore
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }} component="span">...</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          {/* search box */}
          <form >
            <InputBase
              type="text"
              placeholder="search products"
              value={query}
              onChange={handleOnchange}
              sx={{
                transition: '0.3s ease',
                marginRight: "10px",
                borderBottom: "2px solid black",
                opacity: Expanded ? 1 : 0,
                fontFamily: 'Lexend',
              }} />
            <IconButton onClick={handleSearchInputDisplay}>
              <SearchIcon sx={{ color: 'black' }} />
            </IconButton>
          </form>

          {/* cart */}
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
              {totalQuantity >= 1 && <Typography sx={{
                position: "absolute",
                paddingX: "8px",
                background: "black",
                color: "white",
                fontSize: "1rem",
                borderRadius: "25px",
                left: "100%",
                bottom: "40%"
              }}>{totalQuantity}</Typography>}
            </Typography>
          </Link>
          {/* my account */}
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
      </AppBar >
    </>
  );
};

export default Navbar;
