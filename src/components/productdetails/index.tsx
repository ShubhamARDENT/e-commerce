
import { Container, Box, Typography, Button, CircularProgress, Card, CardContent, Rating } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { addtoCart, decrementQuantity, incrementQuantity } from '../../redux/cartSlice/cartActions';
import { Products } from '../../interfaces/cartInterface';
import { Reviews } from '../../interfaces/reviewInterface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


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
        fetch(`https://dummyjson.com/products/${id}?&select=title,price,id,thumbnail,price,description,images,category,reviews,warrantyInformation,shippingInformation,availabilityStatus,`).then(response => response.json()).then(data => setProduct(data))
    }, [id])

    if (!product) {
        return <Box sx={{ display: "flex", height: "80vh", justifyContent: "center", alignItems: 'center' }}>
            <CircularProgress size="5rem" />
        </Box>
    }
    const { reviews = [] } = product

    console.log(reviews)
    return (
        <>
            <Container sx={{
                display: 'flex',
                gap: 4,
                flexWrap: 'wrap',
                alignItems: 'center',
                flexDirection: "column",
                marginTop: 4,
                height: "80vh",
            }}
            >
                <Box sx={{ width: "45%" }}>
                    <img style={{ width: "95%" }} src={product.thumbnail} alt={product.title}
                    />
                    <Box sx={{ width: '100%' }}>
                        <Swiper
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            }}
                            slidesPerView={1}

                            spaceBetween={10}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            style={{ width: '100%', }}
                        >
                            {reviews.map((reviews: Reviews, index) => (
                                <SwiperSlide key={index}>
                                    <Card sx={{ maxWidth: 500, position: 'relative', height: '160px', borderRadius: '15px' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AccountCircleRoundedIcon sx={{ fontSize: '4rem' }} />
                                                <Typography component={'p'} sx={{ fontFamily: 'Lexend' }}>
                                                    {reviews.reviewerName}
                                                </Typography>
                                            </Box>
                                            <Box sx={{}}>
                                                <Rating value={reviews.rating} precision={0.5} readOnly />
                                                <Typography component={'p'} sx={{ fontFamily: 'Lexend', marginTop: '10px' }}>{reviews.comment}</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-next" style={{ position: 'absolute', left: "50%", top: '74%', cursor: 'pointer' }}>&#10095;</div>
                        <div className="swiper-button-prev" style={{ position: 'absolute', right: '79%', top: '74%', cursor: 'pointer' }}>&#10094;</div>
                    </Box>
                </Box>

                <Box sx={{ width: "35%" }}>
                    <Typography sx={{ fontSize: "2rem", fontWeight: 600, fontFamily: 'Lexend' }}>{product.title}</Typography>
                    <Typography sx={{ fontFamily: 'Lexend' }}>{product.category}</Typography>
                    <Typography sx={{
                        fontSize: "1.5rem", fontWeight: 600,
                        fontFamily: 'Lexend'
                    }}>${product.price}</Typography>

                    <Typography component={'p'} sx={{ fontSize: "1.5rem", fontFamily: 'Lexend' }}>{product.availabilityStatus}</Typography>

                    <Box sx={{ marginTop: "25px", borderTop: "1px solid gray", paddingTop: "20px" }
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
                    <Typography component={"p"} sx={{ fontSize: "0.8rem", fontWeight: 600, fontFamily: 'Lexend' }}>{product.description}</Typography>
                    {/* button */}
                    <Box sx={{ marginTop: "20px" }}>
                        <Typography component={"p"} sx={{ fontSize: "1.5rem", fontWeight: 600, fontFamily: 'Lexend' }}>{product.warrantyInformation}</Typography>
                        <Typography component={"p"} >{product.shippingInformation}</Typography>
                    </Box>
                </Box>


            </Container >


        </>


    )
}

export default ProdcutDetails