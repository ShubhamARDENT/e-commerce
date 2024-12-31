import { AppBar, Box, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Navbar = () => {
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
          <Typography
            variant="h1"
            sx={{ fontSize: "1.2rem", fontWeight: "600" }}
          >
            Chanta
          </Typography>
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
          <Typography
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ShoppingBagOutlinedIcon sx={{ marginRight: "8px" }} /> Cart
          </Typography>
          <Typography
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
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
