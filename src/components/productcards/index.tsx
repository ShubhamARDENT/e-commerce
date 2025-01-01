import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
interface product {
    id: number,
    title: string,
    image: string,
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
                }
            }

        }}>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", padding: 1, backgroundColor: "#f5f5f5" }}
            />
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