import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import AppContext from '../context/AppContext';

import RedTypography from '../components/RedTypography';

import { re_email } from '../util/regex';

const Login = (props) => {
  const { login } = useContext(AppContext);

  const [variables, setVariables] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}auth/login`,
        variables
      );
      setLoading(false);
      console.log(response.data);
      login(response.data);
      props.history.push('/files');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        console.log(error);
        setErrors({ general: 'No response received' });
      } else {
        setErrors({ general: error.message });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" gutterBottom component="div">
          Login
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
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={
            !re_email.test(String(variables.email).toLowerCase()) ||
            variables.password.length < 6 ||
            loading
          }
        >
          Login
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
        <Typography variant="caption" display="block" gutterBottom>
          Forgot password?{' '}
          <Link component={RouterLink} to="/forgotpass">
            Recovery password
          </Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Activate account?{' '}
          <Link component={RouterLink} to="/activate">
            Activate
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default Login;
