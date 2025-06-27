import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { showMessageBoxGlobalStateReset } from '../../services/AlertBox/showMessageBox';
import { useDispatch } from 'react-redux';
// severity could be success, error, warning, info, or default

const MessageBox = (props) => {

  const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
 
    useEffect(() => {
      setOpen(props?.status);
    }, [props?.status]);

    useEffect(() => {
      let reset = false;
      setTimeout(() => {
        reset = true;
      }, [1000])
      return () => {
        if(props?.status && reset){
          setOpen(false);
            dispatch(showMessageBoxGlobalStateReset());
        }
      }
    });
    
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
      <Snackbar open={open} autoHideDuration={props?.duration} onClose={handleClose} anchorOrigin={{ vertical: props?.position || 'bottom', horizontal: props?.side || 'right' }}>
        <Alert
          onClose={handleClose}
          severity={props?.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default MessageBox;