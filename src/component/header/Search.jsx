import { InputBase,styled,Box, List, ListItem } from "@mui/material";   
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

const SearchContainer = styled(Box)`
    background-color: #fff;
    width: 38%;
    border-radius: 2px;
    margin-left: 10px;
    display: flex;
`;
const InputSeachBase=styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;
`;
const SearchIconWrapper=styled(Box)`
    color:Blue;
    padding: 5px;
    display:flex;
    margin-left:auto
`;

const ListWrapper=styled(List) `
    position:absolute;
    background:#FFFFFF;
    color:#000;
    margin-top:30px;
`

const Search=()=>{
    const[text,setText]=useState('');

    const {products}=useSelector(state=>state.getProducts);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])
    const getText=(text)=>{
        setText(text);
    }
    return(
        <SearchContainer>
            <InputSeachBase 
                placeholder='Search for Products,Brands and More...'
                onChange={(e)=>getText(e.target.value)}
                value={text}
            />
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            {
                text && 
                    <ListWrapper>
                        {
                            products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                <ListItem>
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={()=>setText('')}
                                        style={{textDecoration:'none',color:'inherit'}}
                                    >
                                    {product.title.longTitle}
                                    </Link>
                                </ListItem>
                            ))
                        }
                    </ListWrapper>
            }
        </SearchContainer>
        
    )
}
export default Search;