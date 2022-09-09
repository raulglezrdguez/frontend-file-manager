import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../context/AppContext';

function Files() {
  const { user, files, setFiles } = useContext(AppContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {}, []);

  return <div>Files</div>;
}

export default Files;
