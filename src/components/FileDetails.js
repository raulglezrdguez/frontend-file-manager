import React from 'react';

function FileDetails({ file }) {
  const { id, name, originalFilename, size, status, updatedAt, createdAt } =
    file;
  console.log(name);
  return <div>FileDetails</div>;
}

export default FileDetails;
