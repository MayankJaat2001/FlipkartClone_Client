import { useContext, useState } from "react";
import { Box,Button,styled } from "@mui/material";
import {ShoppingCart as Cart,FlashOn as Flash} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart   } from "../../redux/actions/cartAction";
import axios from 'axios';
import  { DataContext } from "../../context/DataProvider";
import LoginDialog from "../login/LoginDialog";

const LeftContainer=styled(Box)(({theme})=>({
    minWidth:'40%',
    padding: '40px 0 0 70px',
    [theme.breakpoints.down('lg')]:{
        padding:'20px 40px',
    }
}));

const Image=styled('img')({  
    width:'75%', 
    padding:'10px'
});

const StyledButton=styled(Button)(({theme})=>({
    width:'48%',
    height:50,
    borderRadius:2,
    [theme.breakpoints.down('lg')]:{
        width:'46%'
    },
    [theme.breakpoints.down('sm')]:{
        width:'48%'
    }
}));
    

const ActionItems=({product})=>{
    const URL='https://flipkart-clone-server-txlw.onrender.com'
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [open,setOpen]=useState(false);
    const quantity=useState(1);
    const account=useContext(DataContext);
    const {id} =product;
    const addItemToCart=()=>{
        dispatch(addToCart(id,quantity));
        navigate('/cart');
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
            name: "Mayank Flipkart Clone",
            description: "Test Transaction",
            image: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${URL}/paymentverification`,
            prefill: {
                name: account,
                email: `${account}@example.com`,
                contact: "9001000100"
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
        <LeftContainer>
            <Box style={{padding:'10px 20px',border:'1px solid #f0f0f0',marginBottom:10}}>
            <Image src={product.detailUrl}/></Box>
            <StyledButton variant="contained" onClick={()=>addItemToCart()} style={{marginRight:10,background:'#ff9f00'}}><Cart/>Add to Cart</StyledButton>
            <StyledButton variant="contained" onClick={()=>account?buyNow(product.price.cost):openDialog()} style={{background:'#fb541b'}}><Flash/>Buy Now</StyledButton>
            <LoginDialog open={open} setOpen={setOpen}/>
        </LeftContainer>
    )
}
export default ActionItems;