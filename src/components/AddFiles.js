import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import UploadIcon from './UploadIcon';

import AppContext from '../context/AppContext';

function AddFiles() {
  const { uploadFile, showSnackbarMessage } = useContext(AppContext);
  const [loadingFile, setLoadingFile] = useState(false);
  const [filetoupload, setFiletoupload] = useState(null);
  const [name, setName] = useState('');
  const theme = useTheme();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 0) {
      setFiletoupload(file);
    } else {
      setFiletoupload(null);
      showSnackbarMessage('File must have size greater than zero');
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    setLoadingFile(true);
    const result = await uploadFile({ filetoupload, name: name.trim() });
    setLoadingFile(false);
    if (result.general) {
      showSnackbarMessage(result.general);
    }
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
                <UploadIcon fill={theme.palette.primary} />
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
                error={name.trim().length < 4}
                helperText={name.trim().length < 4 ? 'Short name' : ''}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  name.trim().length < 4 || !filetoupload || loadingFile
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
