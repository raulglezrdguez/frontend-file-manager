import React, { useState } from 'react';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import UploadIcon from './UploadIcon';

function AddFiles() {
  const [loadingFile, setLoadingFile] = useState(false);
  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={2}>
      <Typography variant="h6" gutterBottom component="div">
        Upload files
      </Typography>
      <Card style={{ width: '80%' }}>
        <CardContent>
          <Button variant="outlined" component="label" disabled={loadingFile}>
            <UploadIcon />
            <input
              id="photo"
              name="photo"
              type="file"
              style={{ display: 'none' }}
              accept="*"
              //   onChange={handlePhotoChange}
            />
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default AddFiles;
