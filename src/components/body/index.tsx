import { Container, Typography, Box, List, ListItem, ListItemButton, Pagination } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { useEffect } from "react";
import ProductCard from "../productcards";
import { apiThunk } from "../../redux/cartSlice/cartActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Products } from "../../interfaces/cartInterface";
import { useState } from "react";


const Home = () => {

  const [currentPage, setcurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const data = useAppSelector(state => state.cartReducer.mainData)
  const totalItems = useAppSelector(state => state.cartReducer.totalItems)
  const dispatch = useAppDispatch()


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setcurrentPage(value)
  }

  useEffect(() => {
    dispatch(apiThunk({ page: currentPage, limit: itemsPerPage }))
  }, [dispatch, currentPage, itemsPerPage])

  // console.log(data)
  return <Container sx={{ margin: 0, paddingTop: 2, maxWidth: "100vw", fontFamily: "Lexend", }} maxWidth={false}>
    <Box>
      <Typography component={"p"} sx={{ fontSize: "3rem", fontWeight: 600 }}>
        Get Inspired
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, maxime?
      </Typography>
    </Box>

    <Box sx={{ marginTop: "40px", }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <List sx={{ display: "flex", justifyContent: "space-between", width: "48%" }}>
          <ListItem sx={{
            display: "flex", justifyContent: "space-between", background: "white", borderRadius: "50px", width: "25%", paddingLeft: '30px', paddingRight: "15px", paddingY: "10px"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", color: '#939393' }}>category</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>All Categories</Typography>
            </Box>
            <Box>
              <ListItemButton >
                <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
              </ListItemButton>
            </Box>
          </ListItem>

          <ListItem sx={{
            display: "flex", justifyContent: "space-between", background: "white", borderRadius: "50px", width: "21%", paddingLeft: '27px', paddingRight: "15px", paddingY: "10px",
            alignItems: "center"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", color: '#939393' }}>colors</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>All Colors</Typography>
            </Box>
            <Box>
              <ListItemButton >
                <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
              </ListItemButton>
            </Box>
          </ListItem>

          <ListItem sx={{
            display: "flex", justifyContent: "space-between", background: "white", borderRadius: "50px", width: "23%", paddingLeft: '30px', paddingRight: "15px", paddingY: "10px"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", color: '#939393' }}>features</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>All Features</Typography>
            </Box>
            <Box>
              <ListItemButton >
                <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
              </ListItemButton>
            </Box>
          </ListItem>

          <ListItem sx={{
            display: "flex", justifyContent: "space-between", background: "white", borderRadius: "50px", width: "27%", paddingLeft: '30px', paddingRight: "15px", paddingY: "10px"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", color: '#939393' }}>price</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>From $0 - $1000</Typography>
            </Box>
            <Box>
              <ListItemButton >
                <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
              </ListItemButton>
            </Box>
          </ListItem>
        </List>

        <List sx={{ width: "42%" }}>
          <ListItem sx={{
            display: "flex", justifyContent: "space-between", background: "white", borderRadius: "50px", width: "23%", paddingLeft: '30px', paddingRight: "15px", paddingY: "10px",
            ml: "auto",
            alignItems: "center"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", color: '#939393' }}>sort</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>New In</Typography>
            </Box>

            <Box>
              <ListItemButton >
                <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
              </ListItemButton>
            </Box>
          </ListItem>
        </List>

      </Box>

      <Grid2 container wrap="wrap" sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }} spacing={1} columns={3}>
        {
          data.map((eachProduct: Products) => (
            <Grid2 sx={{
              width: { xs: "100%", sm: "50%", md: "33.33%", lg: "21%" },
            }} key={eachProduct.id}>

              <ProductCard
                product={eachProduct} />
            </Grid2>
          ))
        }
      </Grid2>
      <Pagination count={Math.ceil(totalItems / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }} />
    </Box>
  </Container >;
};

export default Home;
