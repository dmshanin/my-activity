import { SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CasinoIcon from '@mui/icons-material/Casino';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AppBar from '@/components/AppBar';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router'
import { Sections } from '@/constants';

const { ESection } = Sections;

const Layout = ({ 
    children,
    title = 'Моя активность',
    section
}) => {
    const router = useRouter()
    
    const getSectionUrl = (section) => {
        switch(section) {
            case ESection.Random:
                return '/';
            
            case ESection.Plan:
                return '/plan';

            case ESection.News:
                return '/news';
        }
    }
    const changeSection = (event: SyntheticEvent, section) => {
        const sectionUrl = getSectionUrl(section);

        event.preventDefault()
        router.push(sectionUrl)
    }

    return (
        <Stack
            direction={{ xs: 'column' }}
            spacing={{ xs: 2 }}
            sx={{
                height: '100%',
                backgroundColor: 'rgb(245, 245, 245)',
                pt: 8,
                pb: 11,
                overflow: 'auto',
            }}
        >
            <AppBar
                title={title}
                position='fixed'
                boxShadow={1}
            />
            
            <Box
                sx={{ 
                    flexGrow: 1,
                    px: 3,
                    py: 5,
                    backgroundColor: 'rgb(255, 255, 255)',
                }}
                boxShadow={1}
            >
                {children}
            </Box>
            
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgb(255, 255, 255)',
                    pb: 2,
                }}
                boxShadow={1}
            >
                <BottomNavigation
                    showLabels
                    value={section}
                    onChange={(event, value) => changeSection(event, value)}
                >
                    <BottomNavigationAction title="Случайно" icon={<CasinoIcon />} />
                    <BottomNavigationAction title="План" icon={<ListAltIcon />} />
                    {false && (
                        <BottomNavigationAction title="Что нового" icon={<AnnouncementIcon />} />
                    )}
                </BottomNavigation>
            </Box>
        </Stack>
    );
};

export default Layout;
