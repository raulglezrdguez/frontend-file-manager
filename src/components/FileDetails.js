import { Card, Stack, Typography } from '@mui/material';
import React from 'react';

function FileDetails({ file }) {
  const { id, name, originalFilename, size, status, updatedAt, createdAt } =
    file;
  return (
    <Card style={{ width: '80%' }}>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        padding={1}
        style={{ width: '100%' }}
      >
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
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={1}
          padding={1}
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
          padding={1}
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
          padding={1}
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
          padding={1}
          style={{ width: '100%' }}
        >
          <Typography variant="caption">Created at:</Typography>
          <Typography variant="caption">{createdAt}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default FileDetails;
