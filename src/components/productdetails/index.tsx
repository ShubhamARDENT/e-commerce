
import { Container, Box, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { addtoCart, decrementQuantity, incrementQuantity } from '../../redux/cartSlice/cartActions';
import { Products } from '../../interfaces/cartInterface';

const ProdcutDetails: React.FC = () => {

    const { id } = useParams<{ id: string }>()

    const [product, setProduct] = useState<Products | null>(null)

    const dispatch = useAppDispatch()

    const handleAddToCart = (product: Products) => {
        dispatch(addtoCart(product))

    }
    const cartItems = useAppSelector(state => state.cartReducer.cart)

    const existingProduct = product ? cartItems.find((item: Products) => item.id === product.id) : undefined;

    const quantity = existingProduct ? existingProduct.quantity : 0;


    const handleIncrement = (prodcut: Products) => {
        dispatch(incrementQuantity(prodcut))
    }

    const handleDecrement = (prodcut: Products) => {
        dispatch(decrementQuantity(prodcut))
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}?&select=title,price,id,thumbnail,price,description,images,category`).then(response => response.json()).then(data => setProduct(data))
    }, [id])

    if (!product) {
        return <div>loading</div>
    }

    // console.log(product)
    return (
        <Container sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 4,
            height: "80vh"
        }}
        >
            <Box sx={{ width: "45%" }}>
                <img style={{ width: "95%" }} src={product.thumbnail} alt={product.title}
                />
            </Box>
            <Box sx={{ width: "35%" }}>
                <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>{product.title}</Typography>
                <Typography>{product.category}</Typography>
                <Typography sx={{
                    fontSize: "1.5rem", fontWeight: 600
                }}>${product.price}</Typography>
                <Box sx={{ marginTop: "50px", borderTop: "1px solid gray", paddingTop: "20px" }
                } >

                    {existingProduct ?
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
                            <Button sx={{
                                background: "black", color: "white",
                                borderRadius: "25px",


                            }} onClick={() => handleDecrement(product)}

                            >-</Button>
                            <Box sx={{
                                marginX: "20px",
                            }}>
                                {quantity}
                            </Box>
                            <Button sx={{
                                background: "black", color: "white",
                                borderRadius: "25px"
                            }}

                                onClick={() => handleIncrement(product)}>+</Button>
                        </Box> :
                        <Button
                            onClick={() => handleAddToCart(product)}
                            sx={{
                                width: "100%",
                                background: "black",
                                color: "white",
                                fontSize: '1.2rem',
                                textTransform: "none",
                                borderRadius: "50px",
                                display: "flex",
                                justifyContent: "space-between",
                                paddingX: "20px",
                                paddingY: "10px",
                                marginBottom: "50px"
                            }}>Add to cart <AddCircleRoundedIcon sx={{ marginLeft: "20px", fontSize: "3rem" }} /> </Button>}
                </Box>
                <Typography component={"p"} sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{product.description}</Typography>
            </Box>
        </Container >
    )
}

export default ProdcutDetails