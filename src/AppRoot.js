import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid, IconButton, Paper, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Home from './pages/Home';
import Register from './pages/Register';
import Activate from './pages/Activate';
import Login from './pages/Login';
import ForgotPass from './pages/ForgotPass';
import RecoveryPass from './pages/RecoveryPass';
import Files from './pages/Files';

import Header from './components/Header';

import AppContext from './context/AppContext';

const AppRoot = () => {
  const { user, snackbarMessage, snackbarOpened, closeSnackbar } =
    useContext(AppContext);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Router>
      <Paper style={{ minHeight: '95vh' }} variant="outlined">
        <Grid container direction="column" justifyContent="center" padding={1}>
          <Header />
          <Routes>
            {user ? (
              <>
                <Route path={'/files'} element={<Files />} />
                <Route path={'*'} element={<Home />} />
              </>
            ) : (
              <>
                <Route path={'/register'} element={<Register />} />
                <Route path={'/activate'} element={<Activate />} />
                <Route path={'/forgotpass'} element={<ForgotPass />} />
                <Route path={'/recovery'} element={<RecoveryPass />} />
                <Route path={'*'} element={<Login />} />
              </>
            )}
          </Routes>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpened}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          action={snackbarAction}
        />
      </Paper>
    </Router>
  );
};

export default AppRoot;
