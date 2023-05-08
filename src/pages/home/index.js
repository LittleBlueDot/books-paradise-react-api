import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CssBaseline, Box, Typography, Container, Button } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'common.white',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/background.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CssBaseline />
      <Container
        component='main'
        sx={{
          mt: 8,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        maxWidth='sm'
      >
        <AutoStoriesIcon sx={{ fontSize: '10rem' }} />
        <Typography
          variant='h2'
          component='h1'
          
          sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', mb: '5px' }}
        >
          Books paradise
        </Typography>
        <Typography variant='h5' component='h2' gutterBottom sx={{ textAlign: 'center'}}>
          The ultimate destination for book lovers! <br />
          Our website provides information about books from The New York Times Best Sellers lists.
        </Typography>
        <Button component={RouterLink} variant='contained' size='large' to='/collection' sx={{ mt: '20px'}}>
          Explore!
        </Button>
      </Container>
    </Box>
  );
}
