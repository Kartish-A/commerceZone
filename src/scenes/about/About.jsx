import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

import Subscribe from "../home/Subscribe";


function About() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box mt='60px' >
        <Typography variant={isNonMobile ? 'h3' : 'h4'} color='black' sx={{ margin: '20px' }} >
          About Us
        </Typography>
        <Typography p="20px" m='10 0'>
          Welcome to my CommerceZone store! I'm a dedicated web developer who loves creating amazing online experiences. Here, you'll find a collection of unique products I've imagined and brought to life. Just so you know, these products aren't real – they're just for show. My goal is to demonstrate how good design, user-friendliness, and technical skills come together to make websites great. Feel free to look around, pick items for your "cart," and explore everything I've put together. Thanks for visiting! Remember, the products aren't real, but this showcase is all about what I can do as a web developer to create fantastic online spaces.
        </Typography>
        <Subscribe />
      </Box>
    </>
  )
}

export default About