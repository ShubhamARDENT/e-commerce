
import { Container, Box, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
const ProdcutDetails: React.FC = () => {
    interface Product {
        id: number,
        title: string,
        images: string,
        price: number,
        description: string,
        category: string
    }

    const { id } = useParams<{ id: string }>()

    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}?&select=title,price,id,thumbnail,price,description,images,category`).then(response => response.json()).then(data => setProduct(data))
    }, [id])

    if (!product) {
        return <div>loading</div>
    }

    console.log(product)
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
                <img style={{ width: "95%" }} src={product.images} alt={product.title}
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

                    <Button sx={{
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
                    }}>Add to cart <AddCircleRoundedIcon sx={{ marginLeft: "20px", fontSize: "3rem" }} /> </Button>
                </Box>
                <Typography component={"p"} sx={{ fontSize:"0.8rem",fontWeight: 600 }}>{product.description}</Typography>
            </Box>
        </Container >
    )
}

export default ProdcutDetails