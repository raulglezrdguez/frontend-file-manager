import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppContext from '../context/AppContext';
import FileDetails from '../components/FileDetails';

function Files() {
  const { user, files, setFiles } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}file/files`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setFiles(response.data);
      setLoading(false);
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
  }, [user.token, setFiles]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={5}>
      <Typography variant="h6" gutterBottom component="div">
        Files
      </Typography>
      {files.map((f) => (
        <FileDetails key={f.id} file={f} />
      ))}
    </Stack>
  );
}

export default Files;
