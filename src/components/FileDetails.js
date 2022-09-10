import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import AppContext from '../context/AppContext';
import { dateToString } from '../util/dateFormat';

function FileDetails({ file, editMode = false }) {
  const { id, name, originalFilename, size, status, updatedAt, createdAt } =
    file;

  const { updateFile, deleteFile, downloadFile, showSnackbarMessage } =
    useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [errors, setErrors] = useState({});

  const changeName = async () => {
    const result = await updateFile({ fileId: id, name: newName });

    if (result.general) {
      showSnackbarMessage(result.general);
    }
  };

  const removeFile = async () => {
    const result = await deleteFile(id);
    if (result.general) {
      showSnackbarMessage(result.general);
    }
  };

  const getFile = async () => {
    const result = await downloadFile({ fileId: id, name });
    if (result.general) {
      showSnackbarMessage(result.general);
    } else {
      showSnackbarMessage("Can't download file: maybe it's not zipped yet");
    }
  };

  return (
    <Card style={{ width: '80%' }}>
      <CardContent>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          padding={1}
          style={{ width: '100%' }}
        >
          {edit ? (
            <form>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setErrors({});
                }}
                error={
                  newName.length < 4 || (errors.name && errors.name !== '')
                }
                helperText={newName.length < 4 ? 'Short name' : errors.name}
              />
            </form>
          ) : (
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={1}
              padding={1}
              style={{ width: '100%' }}
            >
              <Typography variant="h5">Name:</Typography>
              <Typography variant="h5">{name}</Typography>
            </Stack>
          )}

          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            padding={0}
            style={{ width: '100%' }}
          >
            <Typography variant="caption">Original name:</Typography>
            <Typography variant="caption">{originalFilename}</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            padding={0}
            style={{ width: '100%' }}
          >
            <Typography variant="caption">Size:</Typography>
            <Typography variant="caption">{size} bytes</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            padding={0}
            style={{ width: '100%' }}
          >
            <Typography variant="caption">Status:</Typography>
            <Typography variant="caption">
              {status === 0 ? 'Uploaded' : 'Compressed'}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            padding={0}
            style={{ width: '100%' }}
          >
            <Typography variant="caption">Created at:</Typography>
            <Typography variant="caption">{dateToString(createdAt)}</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
            padding={0}
            style={{ width: '100%' }}
          >
            <Typography variant="caption">Updated at:</Typography>
            <Typography variant="caption">{dateToString(updatedAt)}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {edit ? (
          <>
            <Button size="small" onClick={changeName}>
              Save
            </Button>
            <Button size="small" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            {editMode && (
              <>
                <Button size="small" onClick={() => setEdit(true)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={removeFile}>
                  Delete
                </Button>
              </>
            )}

            <Button size="small" color="warning" onClick={getFile}>
              Download
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default FileDetails;
