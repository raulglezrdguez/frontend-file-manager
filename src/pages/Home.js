/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Stack, Typography } from '@mui/material';

import AppContext from '../context/AppContext';
import RedTypography from '../components/RedTypography';
import FileDetails from '../components/FileDetails';

function Home() {
  const { user, allFiles, setAllFiles } = useContext(AppContext);
  const [errors, setErrors] = useState({});

  const loadFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}file/allfiles`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setAllFiles(response.data);
    } catch (error) {
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        setErrors({ general: 'No response received' });
      } else {
        setErrors({ general: error.message });
      }
    }
  }, [user.token, setAllFiles]);

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={2}>
      <Typography variant="h6" gutterBottom component="div">
        Files
      </Typography>

      {allFiles.map((f) => (
        <FileDetails key={f.id} file={f} />
      ))}

      {errors.general && <RedTypography>{errors.general}</RedTypography>}
    </Stack>
  );
}

export default Home;
