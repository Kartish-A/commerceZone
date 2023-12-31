import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { shades } from "../../theme";
import { setIsCartOpen, setIsMenuOpen, setIsFavoriteOpen } from "../../state";



function Navbar() {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const fav = useSelector((state) => state.fav.fav);
  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Box
      width="100%"
      height="60px"
      display="flex"
      alignItems="center"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="82%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          variant={isNonMobile ? "h3" : "h4"}
          color={shades.secondary[500]}
        >
          CommerceZone
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>

          <Badge badgeContent={fav.length}
            color="secondary"
            invisible={fav.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: " 0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}>
            <IconButton
              onClick={() => disptach(setIsFavoriteOpen({}))}
              sx={{ color: "black" }} >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </Badge>

          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: " 0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => disptach(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton
            onClick={() => disptach(setIsMenuOpen({}))}
            sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
