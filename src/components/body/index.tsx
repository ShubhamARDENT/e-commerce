import { Container, Typography, Box, List, ListItem, ListItemButton } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { useEffect, useState } from "react";
import ProductCard from "../productcards";

const Home = () => {
  const [products, setProducts] = useState<Products[]>([])

  // type defined for each products
  interface Products {
    id: number,
    title: string,
    thumbnail: string,
    price: number,
    description: string
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=12&select=title,price,id,thumbnail,price,description")
        const data = await response.json()
        // seting the state
        setProducts(data.products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  console.log(products)
  // console.log(products)
  return <Container sx={{ margin: 0, paddingTop: 2, maxWidth: "100vw" }} maxWidth={false}>
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
              <Typography sx={{ fontSize: "0.8rem" }}>category</Typography>
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
              <Typography sx={{ fontSize: "0.8rem" }}>colors</Typography>
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
              <Typography sx={{ fontSize: "0.8rem" }}>features</Typography>
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
              <Typography sx={{ fontSize: "0.8rem" }}>price</Typography>
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
              <Typography sx={{ fontSize: "0.8rem" }}>sort</Typography>
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

      <Grid2 container wrap="wrap" sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }} spacing={1} columns={4}>
        {
          products.map((eachProduct) => (
            <Grid2 sx={{
              width: { xs: "100%", sm: "50%", md: "33.33%", lg: "21%" },
            }} key={eachProduct.id} >

              <ProductCard
                product={eachProduct} />
            </Grid2>
          ))
        }
      </Grid2>
    </Box>
  </Container >;
};

export default Home;
