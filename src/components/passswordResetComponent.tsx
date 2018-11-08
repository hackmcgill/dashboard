import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import martletLogo from 'src/mchacks-martlet-tight.svg';
// import {Link} from 'react-router-dom';

const passwordResetComponent: React.StatelessComponent<{}> = (props) => {
    return (
        
        <div className='passwordReset'>
                <img src={martletLogo} className='Marletlogo' alt='logo'/>
                <h1 className='passwordReset__title'>Password reset</h1>
                <h3 className='passwordReset__description'>We’ve sent you a link to reset your password. Check your inbox and follow the instructions there. </h3>
                <img src={resetLogo} className='Resetlogo' alt='logo'/>
        </div>
    )
}

export default passwordResetComponent;