
import Header from './component/header/Header';
import Home from './component/Home/Home'
import { Box } from '@mui/material';
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import DetailView from './component/details/DetailView';
import Cart from './component/cart/Cart';
import { useSelector } from 'react-redux';
import PaymentSuccess from './component/PaymentSuccess';

function App() {
  const {product} =useSelector(state=>state.getProductDetails)
  return (
    <DataProvider>
      <BrowserRouter>
      <Header />
      <Box style={{marginTop:54}}>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<DetailView/>}/>
        <Route path='/cart' element={<Cart product={product}/>}/>
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
        </Routes>
      </Box>   
      </BrowserRouter>   
    </DataProvider>
  );
}

export default App;
