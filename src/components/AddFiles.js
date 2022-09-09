import { Stack, Typography } from '@mui/material';
import React from 'react';

function AddFiles() {
  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={5}>
      <Typography variant="h6" gutterBottom component="div">
        Upload files
      </Typography>
    </Stack>
  );
}

export default AddFiles;
