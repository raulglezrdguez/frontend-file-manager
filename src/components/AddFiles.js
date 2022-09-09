import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

function AddFiles() {
  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={2}>
      <Typography variant="h6" gutterBottom component="div">
        Upload files
      </Typography>
      <Card style={{ width: '80%' }}>
        <CardContent>
          <Button variant="outlined" component="label" disabled={loadingFile}>
            <Avatar alt="upload file" src={`/static/images/upload.png`} />
            <input
              id="photo"
              name="photo"
              type="file"
              style={{ display: 'none' }}
              accept="image/png, image/jpeg"
              onChange={handlePhotoChange}
            />
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default AddFiles;
