import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Link,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const theme = createTheme();

const ListBooks = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=5UjGY9ZfQAs9hiYISxNqdaY5bZGjUHh3'
        );
        const result = await response.json();
        setIsLoaded(true);
        setItems(result);

        // Delay the next API request by 30 seconds
        setTimeout(fetchData, 30000);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
        if (error.response && error.response.status === 429) {
          console.log('Too many requests, retrying in 30 seconds...');
          setTimeout(fetchData, 30000);
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (items.length) {
    return (
      <ThemeProvider theme={theme}>
        <main>
          <Box
            sx={{
              pt: 8,
            }}
          >
            <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
              <RouterLink to='/' style={{ textDecoration: 'none' }}>
                <AutoStoriesIcon
                  sx={{ fontSize: '10rem', color: 'grey.800' }}
                />
                <Typography
                  variant='h2'
                  component='h1'
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    mb: '5px',
                    color: 'grey.800',
                    textDecoration: 'none',
                  }}
                >
                  Books paradise
                </Typography>
              </RouterLink>
              <Typography
                variant='h5'
                align='center'
                color='text.secondary'
                paragraph
              >
                Browse the books we have in our disposal.
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth='lg'>
            <Grid container spacing={4}>
              {items.map((book) => (
                <Grid item key={book.title} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component='img'
                      sx={{
                        pt: '0',
                        height: '200px',
                      }}
                      image='https://source.unsplash.com/HH4WBGNyltc'
                      alt='book cover'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {book.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        By {book.author}
                      </Typography>
                      <Typography sx={{ pt: '10px' }}>
                        {book.description}
                      </Typography>
                      <Typography sx={{ pt: '10px', fontStyle: 'italic' }}>
                        {book.ranks_history &&
                          book.ranks_history.length > 0 && (
                            <p>Rank: {book.ranks_history[0].rank}</p>
                          )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'grey.800', p: 4 }} component='footer'>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              color='inherit'
              href='https://developer.nytimes.com'
              target='_blank'
            >
              <Box
                component='img'
                sx={{
                  width: 150,
                }}
                alt='New York Times API'
                src='https://developer.nytimes.com/files/poweredby_nytimes_150a.png?v=1583354208339'
              />
            </Link>
          </Box>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
  }
};
export default ListBooks;
