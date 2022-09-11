import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import RedTypography from '../components/RedTypography';

import { re_email } from '../util/regex';

const ForgotPass = () => {
  const [variables, setVariables] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [lastMessage, setLastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const forgotPass = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}auth/forgotpass`,
        variables
      );
      setLoading(false);
      setLastMessage(
        'Check your email and follow the instructions to recovery your password at FileManager'
      );
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

    forgotPass();
  };

  return (
    <>
      {lastMessage ? (
        <Stack spacing={2} alignItems="center">
          <Typography marginTop={5}>{lastMessage}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Recovery password?{' '}
            <Link component={RouterLink} to="/recoveryPass">
              Recovery
            </Link>
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" gutterBottom component="div">
              Forgot password
            </Typography>
            <TextField
              required
              id="email"
              name="email"
              label="email"
              type="email"
              value={variables.email}
              onChange={(e) =>
                setVariables({
                  ...variables,
                  email: e.target.value,
                })
              }
              error={
                !re_email.test(String(variables.email).toLowerCase()) ||
                (errors.email && errors.email !== '')
              }
              helperText={
                !re_email.test(String(variables.email).toLowerCase())
                  ? 'Incorrect email'
                  : errors.email
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
                !re_email.test(String(variables.email).toLowerCase()) ||
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
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Recovery password?{' '}
              <Link component={RouterLink} to="/recovery">
                Recovery
              </Link>
            </Typography>
          </Stack>
        </form>
      )}
    </>
  );
};

export default ForgotPass;
