import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router'
import { addtoCart, decrementQuantity, incrementQuantity } from '../../redux/cartSlice/cartActions'
import { Products } from '../../interfaces/cartInterface'
import { useAppDispatch, } from '../../redux/hooks'
import { useAppSelector } from '../../redux/hooks'


const ProductCard: React.FC<{ product: Products }> = ({ product }) => {

    const dispatch = useAppDispatch()

    const cartitems = useAppSelector(state => state.cartReducer.cart)


    const existingProduct = cartitems.find((item: Products) => item.id === product.id)

    const quantity = existingProduct ? existingProduct.quantity : 0;
    const handleAddToCart = (product: Products) => {
        dispatch(addtoCart(product))
    }

    const handleIncrement = (prodcut: Products) => {
        dispatch(incrementQuantity(prodcut))
    }

    const handleDecrement = (prodcut: Products) => {
        dispatch(decrementQuantity(prodcut))
    }




    return (
        <Card elevation={0} sx={{
            width: "80%",
            cursor: "pointer",
            '&:hover': {
                '& .MuiCardContent-root': {
                    backgroundColor: '#f5f5f5',
                },
                '& .add-to-cart-button': {
                    opacity: 1,
                    transform: 'translateY(0)',
                },


            },
            position: "relative",
        }}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ objectFit: "contain", padding: 1, backgroundColor: "#f5f5f5" }}
                />
            </Link>
            {existingProduct ?
                <Box sx={{
                    paddingLeft: "75px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: 'absolute',
                    bottom: '35%',
                    zIndex: 1,
                }}

                >
                    <Button sx={{
                        background: "black", color: "white",
                        opacity: 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        zIndex: 1,

                    }} onClick={() => handleDecrement(product)}
                        className="add-to-cart-button"
                    >-</Button>
                    <Box sx={{
                        marginX: "20px",
                        opacity: 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        zIndex: 1,
                    }}
                        className="add-to-cart-button">
                        {quantity}
                    </Box>
                    <Button sx={{
                        background: "black", color: "white",
                        opacity: 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        zIndex: 1,
                    }}
                        className="add-to-cart-button"
                        onClick={() => handleIncrement(product)}>+</Button>
                </Box>
                :
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        bottom: '35%',
                        paddingX: "105px",
                        opacity: 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        zIndex: 1,
                        border: "none",
                        background: "black"
                    }}
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                >
                    Add to Cart
                </Button>}
            <CardContent sx={{ background: "#e5e5e5", paddingX: "5px" }}>
                <Typography component="p" sx={{ fontSize: "1rem", fontWeight: "600" }}>
                    {product.title}
                </Typography>
                <Typography component="p" sx={{ fontSize: "0.7rem" }}>{product.category}</Typography>
                <Typography component="p" sx={{ fontWeight: "600", marginTop: '15px' }}>
                    ${product.price}
                </Typography>
            </CardContent>

        </Card>


    )
}

export default ProductCard