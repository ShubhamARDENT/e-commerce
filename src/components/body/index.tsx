import { Container, Typography, Box, List, ListItem, ListItemButton, Pagination, Menu, MenuItem } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { useEffect } from "react";
import ProductCard from "../productcards";
import { apiThunk } from "../../redux/cartSlice/cartActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Products } from "../../interfaces/cartInterface";
import { useState } from "react";
import React from "react";
import { ICategories } from "../../interfaces/categoryinterface";


interface INavbar {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}

const Home: React.FC<INavbar> = ({ query }) => {
  const dispatch = useAppDispatch()
  const [categoires, setCategories] = useState<ICategories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)
  const [currentPage, setcurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2)
  const data = useAppSelector(state => state.cartReducer.mainData)
  const totalItems = useAppSelector(state => state.cartReducer.totalItems)


  const fetchCategories = async () => {
    const data = await fetch('https://dummyjson.com/products/categories')
    const response = await data.json()
    setCategories(response)
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setcurrentPage(value)
  }

  useEffect(() => {
    dispatch(apiThunk({ page: currentPage, limit: itemsPerPage, search: query, category: selectedCategory }))

  }, [dispatch, currentPage, itemsPerPage, query, selectedCategory])

  // for getting all product categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
    handleClose()
  }

  // for sorting A-Z
  const handleClose2 = () => {
    setAnchorEl2(null);

  };

  if (data.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
      <Typography component={'p'} sx={{ fontSize: '2rem', fontFamily: 'Lexend' }}>Sorry we could not find that page</Typography>
    </Box>
  }

  // console.log(data)
  console.log(categoires)
  return <>
    <Container component={'section'} sx={{ margin: 0, paddingTop: 2, maxWidth: "100vw", fontFamily: "Lexend", }}
      maxWidth={false}>
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
          {/* categoires */}
          <List sx={{ display: "flex", justifyContent: "space-between", width: "48%" }}>
            <ListItem sx={{
              display: "flex", justifyContent: "space-between", background: "white", borderRadius: "50px", width: "25%", paddingLeft: '30px', paddingRight: "15px", paddingY: "10px"
            }}>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: "600", color: '#939393' }}>category</Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>All Categories</Typography>
              </Box>
              <Box>
                <ListItemButton
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  component={'button'}
                  onClick={handleClick}

                >
                  <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
                </ListItemButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {categoires.map((item, index) => <MenuItem
                    key={index}
                    onClick={() => handleSelectCategory(item.slug)}>{item.name}</MenuItem>)}
                </Menu>
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
          {/* sorting */}
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
                <ListItemButton
                  aria-controls={open2 ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? 'true' : undefined}
                  component={'button'}
                  onClick={handleClick2}>
                  <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
                </ListItemButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleClose2}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose2}>A-Z</MenuItem>
                </Menu>
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
    </Container>;
  </>

}
export default Home;
