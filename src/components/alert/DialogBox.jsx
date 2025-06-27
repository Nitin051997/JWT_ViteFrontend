import '../../css/DialogBox.css';
import { handleAppLogout } from '../../utils/handleAppLogout';
import { useDispatch } from 'react-redux';
import { showDialogBoxGlobalStateReset } from '../../services/AlertBox/showDialogBox';
import { useNavigate } from 'react-router-dom';

const DialogBox = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUserStatus = JSON.parse(sessionStorage.getItem("Web-Login-Status"));

  return (
        <div className='dialog-box-main select-text-disable'>
            <section className='dialog-box-title'>{props?.title}</section>
            <section className='dialog-box-message'>{props?.information} {props?.type === "sessiontimeout" ? props?.timer + "s." : ""}</section>
            {props?.type === "sessiontimeout" ? (
                <>
                    <div className='session-timeout-container'>
                        <div className='session-timeout-container-bar' style={{width: `${parseInt(props?.timer?.split(':')[1]) * 10}px`}}></div>
                    </div>
                </>
                ) : (<></>)}
            {props?.type === "logout" ? (
                <>
                    <section className='dialog-box-action'>
                        <button className='dialog-box-cancle' onClick={() => dispatch(showDialogBoxGlobalStateReset())}>Cancle</button>
                        <button className='dialog-box-event' onClick={() => handleAppLogout( dispatch, getUserStatus?.username, navigate, "LogOut" )}>Log Out</button>
                    </section>
                </>
                ) : props?.type === "sessiontimeout" ? (
                <>
                    <section className='dialog-box-action'>
                        <button className='dialog-box-cancle' onClick={() => handleAppLogout( dispatch, getUserStatus?.username, navigate, "LogOut" )}>Log Out</button>
                        <button className='dialog-box-event' onClick={() => {
                            navigate('/');
                            dispatch(showDialogBoxGlobalStateReset());
                        }}>Continue</button>
                    </section>
                </>
                ) : (<></>)}
        </div>
  )
}

export default DialogBox;