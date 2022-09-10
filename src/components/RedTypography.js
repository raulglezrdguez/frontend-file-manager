import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

/**
 * Typography with red color
 */
const RedTypography = withStyles({
  root: {
    color: '#FF0000',
    border: '1px solid red',
    padding: 5,
    borderRadius: 5,
  },
})(Typography);

export default RedTypography;
