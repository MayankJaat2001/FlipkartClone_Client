import { Box, Typography, styled , Button} from "@mui/material"
import { Link, useSearchParams } from "react-router-dom"
import VerifiedIcon from '@mui/icons-material/Verified';

const Container = styled(Box)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 100px;
border : 2px solid #2874f0;
border-radius:10px;
color:white;
background:#2874f0;
`;

const Homebtn = styled(Link)`
    text-decoration:none;
    color:#2874f0;
    background:white;
    padding:8px;
    border:1px solid #2874f0;
    border-radius:10px;
`;

const Verifiedlogo = styled(VerifiedIcon)`
    font-size:92px;
    margin-left:30%;
`


const PaymentSuccess = ()=>{
    const searchQuery = useSearchParams()[0]
    const referenceNum = searchQuery.get("reference")
    return(
        <Container>
        <Box><Verifiedlogo />
            <h1>ORDER SUCCESSFUL</h1>
        <Typography style={{textAlign:'center'}}>
            Reference No. {referenceNum} <br/>
        <Button><Homebtn to = '/'>Go to Home</Homebtn></Button>
        </Typography>
        </Box>
        </Container>
    )
}
export default PaymentSuccess