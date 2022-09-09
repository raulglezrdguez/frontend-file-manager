import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import AppContext from '../context/AppContext';

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

  return <div>Files</div>;
}

export default Files;
