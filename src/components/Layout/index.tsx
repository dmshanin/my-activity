import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AppBar from '@/components/AppBar';
import Stack from '@mui/material/Stack';

const Layout = ({ children }) => {
    const [value, setValue] = useState(0);

  return (
    <Stack
        direction={{ xs: 'column' }}
        spacing={{ xs: 2 }}
        sx={{
            height: '100%',
            pb: 2
        }}
    >
        <AppBar />
        
        <Box sx={{ 
            flexGrow: 1,
            px: 3
        }}>
            {children}
        </Box>
        
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
    </Stack>
  );
};

export default Layout;
