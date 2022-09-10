import React, { useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Avatar from '@mui/material/Avatar';

import AppContext from '../context/AppContext';
import LogoIcon from './LogoIcon';

import { stringAvatar } from '../util/utils';

/**
 * Component to show the application Header
 * @returns Header component
 */
const Header = () => {
  const location = useLocation();

  const { darkMode, switchDarkMode, user, logout } = useContext(AppContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/"
          >
            <LogoIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1 }}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            FileManager
          </Typography>

          {location && location.pathname === '/' && (
            <>
              {user && (
                <>
                  <Avatar
                    color="inherit"
                    component={RouterLink}
                    to="/files"
                    alt={user.name}
                    src={`/static/images/avatar/${user.name}.jpg`}
                    {...stringAvatar(user.name)}
                  />
                  <Box marginX={2}>
                    <Button onClick={logout}>
                      <ExitToAppIcon color="error" />
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={switchDarkMode}
          >
            {darkMode ? (
              <WbSunnyIcon color="secondary" />
            ) : (
              <Brightness2Icon color="secondary" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
