import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CasinoIcon from '@mui/icons-material/Casino';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AnnouncementIcon from '@mui/icons-material/Announcement';
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
            pb: 2,
            backgroundColor: 'rgb(245, 245, 245)'
        }}
    >
        <AppBar />
        
        <Box sx={{ 
            flexGrow: 1,
            px: 3,
            backgroundColor: "rgb(255, 255, 255)"
        }}>
            {children}
        </Box>
        
        <Box sx={{
            px: 2
        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{backgroundColor: "rgb(255, 255, 255)"}}
            >
                <BottomNavigationAction label="Случайно" icon={<CasinoIcon />} />
                <BottomNavigationAction label="План" icon={<ListAltIcon />} />
                <BottomNavigationAction label="Что нового" icon={<AnnouncementIcon />} />
            </BottomNavigation>
        </Box>
    </Stack>
  );
};

export default Layout;
