import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

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
  const { user } = useContext(AppContext);

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
      </Paper>
    </Router>
  );
};

export default AppRoot;
