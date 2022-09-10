import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import AppContext from '../context/AppContext';
import RedTypography from '../components/RedTypography';

const Activate = (props) => {
  const { login } = useContext(AppContext);

  const [decodedToken, setDecodedToken] = useState({
    email: '',
    id: '',
    name: '',
  });

  const [variables, setVariables] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (variables.token.length > 60) {
      try {
        const dt = jwtDecode(variables.token);
        setDecodedToken((value) => ({ ...value, ...dt }));
      } catch (error) {
        setErrors({ token: 'Invalid token' });
      }
    } else {
      setErrors({ token: 'Invalid token' });
    }
  }, [variables.token]);

  const activateUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}auth/activate`,
        {
          ...variables,
          name: decodedToken.name,
          email: decodedToken.email,
        }
      );
      setLoading(false);
      login(response.data);
      props.history.push('/files');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        setErrors({ general: 'No response received' });
      } else {
        setErrors({ general: error.message });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    activateUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" gutterBottom component="div">
          Activate user account
        </Typography>
        {decodedToken.name && decodedToken.email ? (
          <>
            <Typography variant="subtitle2" gutterBottom component="div">
              {decodedToken.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              {decodedToken.email}
            </Typography>
          </>
        ) : null}

        <TextField
          required
          id="token"
          name="token"
          label="Token"
          type="token"
          multiline
          value={variables.token}
          onChange={(e) =>
            setVariables({
              ...variables,
              token: e.target.value,
            })
          }
          error={
            variables.token.length < 60 || (errors.token && errors.token !== '')
          }
          helperText={
            variables.token.length < 60 ? 'Incorrect token' : errors.token
          }
        />
        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          value={variables.password}
          onChange={(e) =>
            setVariables({
              ...variables,
              password: e.target.value,
            })
          }
          error={
            variables.password.length < 6 ||
            (errors.password && errors.password !== '')
          }
          helperText={
            variables.password.length < 6
              ? 'Incorrect password'
              : errors.password
          }
        />
        <TextField
          required
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={variables.confirmPassword}
          onChange={(e) =>
            setVariables({
              ...variables,
              confirmPassword: e.target.value,
            })
          }
          error={
            variables.confirmPassword.length < 6 ||
            variables.confirmPassword !== variables.password ||
            (errors.confirmPassword && errors.confirmPassword !== '')
          }
          helperText={
            variables.confirmPassword.length < 6 ||
            variables.confirmPassword !== variables.password
              ? 'Passwords dont match'
              : errors.confirmPassword
          }
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={
            variables.password.length < 6 ||
            variables.confirmPassword !== variables.password ||
            loading
          }
        >
          Activate
        </Button>
        {errors.general ? (
          <RedTypography>{errors.general}</RedTypography>
        ) : null}
        <Typography variant="caption" display="block" gutterBottom>
          Forgot password?{' '}
          <Link component={RouterLink} to="/forgotpass">
            Recovery password
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default Activate;
