

import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { decrementQuantity, incrementQuantity } from '../../redux/cartSlice/cartActions'
import { Products } from '../../interfaces/cartInterface'
import { Link } from 'react-router'

const CartPage = () => {

    const { cart } = useAppSelector(state => state.cartReducer)
    console.log(cart)

    const dispatch = useDispatch()


    const handleIncrement = (item: Products) => {
        dispatch(incrementQuantity(item))
    }

    const handleDecrement = (item: Products) => {
        dispatch(decrementQuantity(item))
    }
    if (cart.length === 0) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
            <Typography component={'p'} sx={{ fontSize: '2rem', fontFamily: 'Lexend' }}>You Cart Looks Empty</Typography>
            <Link to='/'>
                <Button sx={{ background: 'black', color: 'white', marginTop: '10px', borderRadius: '10px' }}>Shop Now</Button>
            </Link>
        </Box>
    }
    
    return (
        <>
            <Container maxWidth={false} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "25px", alignItems: "center" }}>
                {cart.map((item) => (
                    <Card key={item.id} sx={{ width: "30%", }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={item.thumbnail}
                            alt={item.title}
                            sx={{ objectFit: "contain", padding: 1, backgroundColor: "#f5f5f5" }}
                        />

                        <CardContent sx={{ background: "#e5e5e5", paddingX: "15px", }}>
                            <Typography component="p" sx={{ fontSize: "1rem", fontWeight: "600" }}>
                                {item.title}
                            </Typography>
                            <Typography component="p" sx={{ fontSize: "0.7rem" }}>{item.category}</Typography>
                            <Typography component="p" sx={{ fontWeight: "600", marginTop: '15px' }}>
                                ${item.price}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
                                <Button sx={{ background: "black", color: "white" }} onClick={() => handleDecrement(item)}>-</Button>
                                <Box sx={{ marginX: "20px" }}>
                                    {item.quantity}

                                </Box>
                                <Button sx={{ background: "black", color: "white" }} onClick={() => handleIncrement(item)}>+</Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </>

    )
}

export default CartPage