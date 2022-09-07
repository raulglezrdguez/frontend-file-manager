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

const RecoveryPass = (props) => {
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
    if (variables.token) {
      const dt = jwtDecode(variables.token);
      setDecodedToken((value) => ({ ...value, ...dt }));
    }
  }, [variables.token]);

  const recoveryPassUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}auth/recoverypass`,
        {
          ...variables,
          name: decodedToken.name,
          email: decodedToken.email,
        }
      );
      setLoading(false);
      login(response.data);
      props.history.push('/');
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

    recoveryPassUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" gutterBottom component="div">
          Recovery user password
        </Typography>
        {decodedToken.name && decodedToken.email ? (
          <>
            {' '}
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
          label="New password"
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
          label="Confirm new password"
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
          Recovery password
        </Button>
        {errors.general ? (
          <RedTypography>{errors.general}</RedTypography>
        ) : null}
        <Typography variant="caption" display="block" gutterBottom>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default RecoveryPass;
