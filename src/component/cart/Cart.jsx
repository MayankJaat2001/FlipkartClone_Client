import { Typography,Grid , Box,styled , Button } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataContext } from '../../context/DataProvider';
import { useContext } from "react";
import LoginDialog from "../login/LoginDialog";


const Container = styled(Grid)(({theme})=>({
    padding:'30px 135px',
    [theme.breakpoints.down('md')]:{
        padding:'15px 0'
    }
}));
    

const Header = styled(Box)`
    padding:15px 24px;
    background:#fff;
`;
const ButtonWrapper=styled(Box)`
        padding:16px 22px;
        background:#fff;
        box-shadow:0 -2px 10px 0 rgb(0 0 0 / 10%);
        border-top:1px solid 
`;
const StyledButton=styled(Button)`
    display:flex;
    margin-left:auto;
    background:#fb641b;
    color:#fff;
    width:250px;
    height:51px;
    border-radius:2px;
`;
const LeftComponent=styled(Grid)(({theme})=>({
    paddingRight:15,
    [theme.breakpoints.down('sm')]:{
        marginBottom: 15 
    }
}))

const Cart=({product})=>{
    const URL = 'https://flipkart-clone-server-txlw.onrender.com'
    const cartDetails  = useSelector(state=>state.cart);
    const account=useContext(DataContext);
    const [open,setOpen]=useState(false);
    const { cartItems } = cartDetails;
    const [price,setPrice]=useState(0);
    const [discount,setDiscount] = useState(0);
    useEffect(()=>{
        totalAmount();
    },[cartItems])
    const totalAmount=()=>{
        let price=0,discount=0;
        cartItems.map(item=>{
            price+=item.price.mrp;
            discount+=(item.price.mrp - item.price.cost);
        });
        setPrice(price);
        setDiscount(discount);
    }
    const openDialog =()=>{
        setOpen(true);
    }
    const buyNow =  async(amount) => {
        const { data:{key}} = await axios.get(`${URL}/getkey`)
        const {data:{order}} = await axios.post(`${URL}/checkout`,{
            amount
        })
        const options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Flipkart",
            description: "Test Transaction",
            image: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${URL}/paymentverification`,
            prefill: {
                name: account,
                email: `${account}@example.com`,
                contact: "9001000199"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
            razor.open();
    }
    return(
        <>
            {
                cartItems.length ?
                <Container container>
                    <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                        <Header>
                            <Typography>My Cart({cartItems?.length})</Typography>
                        </Header>
                        {
                            cartItems.map(item=>(
                                <CartItem item={item}/>
                            ))
                        }
                        <ButtonWrapper>
                            <StyledButton onClick={()=>account?buyNow(price-discount+40):openDialog()}>Place Order</StyledButton>
                        </ButtonWrapper>
                    </LeftComponent>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                         <TotalView cartItems={cartItems}/>
                    </Grid>
                </Container>
                :<EmptyCart/>
            }
            <LoginDialog open={open} setOpen={setOpen}/>
        </>
    )
}
export default Cart;