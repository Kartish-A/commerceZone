import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Item from "../../components/Item";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { shades } from "../../theme";
import { addToCart, addToFav } from "../../state";

const ItemDetails = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    try {
      const item = await fetch(
        `https://commerce-zone-ihttjto4t-abdoulfatahs-projects.vercel.app/api/items/${itemId}?populate=image`,
        {
          method: "GET",
        }
      );
      const itemJson = await item.json();
      setItem(itemJson.data);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  }
  

  async function getItems() {
    try {
      const items = await fetch(
        `https://commerce-zone-ihttjto4t-abdoulfatahs-projects.vercel.app/api/items?populate=image`,
        {
          method: "GET",
        }
      );
      const itemsJson = await items.json();
      setItems(itemsJson.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }
  

  const randomItems = items.sort(() => Math.random() - 0.5).slice(0, 5);

  // This function handles the back navigation logic.
  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box width="100%" display="flex" justifyContent="flex-end" alignItems='center' >
        <IconButton onClick={handleBack}  >
          <KeyboardBackspaceIcon fontSize="large" />
        </IconButton>
        <Typography marginLeft={isNonMobile ? '1%' : '4px'}>
          Go back
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" columnGap="40px">

        {/* IMAGES */}
        <Box flex="1 1 40%" mb={isNonMobile ? "40px" : '10px'}>
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`https://commerce-zone-ihttjto4t-abdoulfatahs-projects.vercel.app${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          {/* <Box display="flex" justifyContent="space-between" padding='1%'> */}

          {/* </Box> */}

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>

            <Box m="20px 0 5px 0" display="flex" alignItems='center'>
              <Button onClick={() => dispatch(addToFav({ item: { ...item, count } }))} >
                <FavoriteBorderOutlinedIcon />
              </Button>
              <Typography sx={{ ml: "5px" }}>ADD TO FAVORITES</Typography>
            </Box>

            <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {randomItems?.map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
