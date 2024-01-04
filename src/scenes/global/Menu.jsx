import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";

import { shades } from "../../theme";
import { setIsMenuOpen } from "../../state";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.cart.isMenuOpen);
  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Box
      display={isMenuOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        // width="max(400px, 60%)"
        width={isNonMobile ? "max(400px)" : "100%"}
        height="100%"
        backgroundColor="white"
      >
        <Box padding={isNonMobile ? "30px" : "16px"} overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography
              variant={isNonMobile ? "h3" : "h4"}
              fontWeight='light'
              color={shades.secondary[500]}
              sx={{ "&:hover": { cursor: "pointer" }}}
              onClick={() => {
                navigate("/")
                dispatch(setIsMenuOpen({}))
              }}
            >
              CommerceZone
            </Typography>
            <IconButton onClick={() => dispatch(setIsMenuOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          <Box m="20px 0" flex flexDirection='column'>
            <FlexBox m="20px 0">
              <Typography
                variant={isNonMobile ? "h3" : "h4"}
                sx={{ "&:hover": { cursor: "pointer" }}}
                fontWeight="light"
                mt='20px'
                onClick={() => {
                  navigate("/about")
                  dispatch(setIsMenuOpen({}))
                }}
              >ABOUT US
              </Typography>
            </FlexBox>

            <FlexBox m="20px 0">
              <Typography
                variant={isNonMobile ? "h3" : "h4"}
                sx={{ "&:hover": { cursor: "pointer" }}}
                fontWeight="light"
                mt='10px'
                onClick={() => {
                  navigate("/contact")
                  dispatch(setIsMenuOpen({}))
                }}
              >
                CONTACT US
              </Typography>
            </FlexBox>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
