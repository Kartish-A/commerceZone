import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';


import Subscribe from '../home/Subscribe';

function Contact() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
    <Box mt='60px' >
      <Typography variant={isNonMobile ? 'h3' : 'h4'} color='black' sx={{margin:'20px'}} >
        Contact Us
      </Typography>
      <Subscribe />
    </Box>
    </>
  )
}

export default Contact