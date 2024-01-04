import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Typography, useMediaQuery } from "@mui/material";

import { shades } from "../../theme";
import { setIsFavoriteOpen, removeFromFav } from "../../state";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Favorites = () => {
  const dispatch = useDispatch();
  const fav = useSelector((state)=> state.fav.fav)
  const isFavoriteOpen = useSelector((state) => state.fav.isFavoriteOpen);
  const isNonMobile = useMediaQuery("(min-width:600px)");


  return (
    <Box
      display={isFavoriteOpen ? "block" : "none"}
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
            <Typography variant={isNonMobile ? "h3" : "h4"}fontWeight='light'>
              FAVORITE ITEMS
            </Typography>
            <IconButton onClick={() => dispatch(setIsFavoriteOpen())}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

        {/* FAVORITE LIST */}
          <Box m="20px 0" flex flexDirection='column'>
          {fav.map((item) => (
            <Box key = {`${item.attributes.name}-${item.id}`}>
              <FlexBox p='15px 0'>
                <Box flex="1 1 40%">
                  <img 
                    alt={item?.name}
                    width='123px'
                    height='164px'
                    src={`https://commerce-zone-ihttjto4t-abdoulfatahs-projects.vercel.app${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                  />
                </Box>

                <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromFav({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.shortDescription}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                      </Box>
                      <Typography fontWeight="bold">
                        ${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>

              </FlexBox>
              <Divider/>
            </Box>
          ))}
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Favorites;
