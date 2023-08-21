import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

import { setItems } from "../../state";
import Item from "../../components/Item";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
    console.log("Items : " , items);
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

const WomensSuitsItems = items.filter(
  (item) => item.attributes.category === "WomensSuits"
);
const WomensSkirtsItems = items.filter(
  (item) => item.attributes.category === "WomensSkirts"
);
  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const MensShirtsItems = items.filter(
    (item) => item.attributes.category === "Shirts"
  );
  const MensSuitsItems = items.filter(
    (item) => item.attributes.category === "Men's Suits"
  );


  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
      Curated <b>Must-Haves</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="WOMEN'S SUITS" value="WomensSuits" />
        <Tab label="WOMEN'S SKIRTS" value="WomensSkirts" />
        <Tab label="MEN'S SUITS" value="Men's Suits" />
        <Tab label="SHIRTS" value="Shirts" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="TOP RATED" value="topRated" />
        



      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === "Shirts" &&
          MensShirtsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === "Men's Suits" && 
          MensSuitsItems.map((item)=> (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === "WomensSuits" && 
          WomensSuitsItems.map((item)=> (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {value === "WomensSkirts" && 
          WomensSkirtsItems.map((item)=> (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
