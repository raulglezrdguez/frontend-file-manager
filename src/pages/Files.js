import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppContext from '../context/AppContext';
import FileDetails from '../components/FileDetails';
import RedTypography from '../components/RedTypography';

function Files() {
  const { user, files, setFiles } = useContext(AppContext);
  const [errors, setErrors] = useState({});

  const loadFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}file/files`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setFiles(response.data);
    } catch (error) {
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        setErrors({ general: 'No response received' });
      } else {
        setErrors({ general: error.message });
      }
    }
  }, [user.token, setFiles]);

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={5}>
      <Typography variant="h6" gutterBottom component="div">
        Files
      </Typography>
      {files.map((f) => (
        <FileDetails key={f.id} file={f} />
      ))}

      {errors.general && <RedTypography>{errors.general}</RedTypography>}
    </Stack>
  );
}

export default Files;
