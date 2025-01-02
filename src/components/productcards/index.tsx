import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
import { Link } from 'react-router'

interface product {
    id: number,
    title: string,
    thumbnail: string,
    price: number,
    description: string
}
const ProductCard: React.FC<{ product: product }> = ({ product }) => {
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
                }
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
            >
                Add to Cart
            </Button>
            <CardContent sx={{ background: "#e5e5e5", paddingX: "5px" }}>
                <Typography component="p" sx={{ fontSize: "1rem", fontWeight: "600" }}>
                    {product.title}
                </Typography>
                <Typography component="p" sx={{ fontSize: "0.7rem" }}>Lorem ipsum dolor sit amet.</Typography>
                <Typography component="p" sx={{ fontWeight: "600", marginTop: '15px' }}>
                    ${product.price}
                </Typography>
            </CardContent>

        </Card>


    )
}

export default ProductCard