import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import UploadIcon from './UploadIcon';

function AddFiles() {
  const [loadingFile, setLoadingFile] = useState(false);
  const [filetoupload, setFiletoupload] = useState(null);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiletoupload(file);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(filetoupload);
    console.log(name);
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={2}>
      <Typography variant="h6" gutterBottom component="div">
        Upload files
      </Typography>
      <Card style={{ width: '80%' }}>
        <CardContent>
          <form onSubmit={submitForm}>
            <Stack direction="column" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                component="label"
                disabled={loadingFile}
              >
                <UploadIcon />
                <input
                  id="filetoupload"
                  name="filetoupload"
                  type="file"
                  style={{ display: 'none' }}
                  accept="*"
                  onChange={handleFileChange}
                />
              </Button>
              <TextField
                required
                id="name"
                name="name"
                label="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={name.length < 4 || (errors.name && errors.name !== '')}
                helperText={name.length < 4 ? 'Short name' : errors.name}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  name.length < 4 ||
                  (errors.name && errors.name !== '') ||
                  !filetoupload ||
                  loadingFile
                }
              >
                Upload file
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default AddFiles;
