import * as React from 'react';
import logo from 'src/logo.svg';
import {Link} from 'react-router-dom';

const HomeComponent: React.StatelessComponent<{}> = (props) => {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <h1 className='App-title'>Welcome to McHacks</h1>
            </header>
            <div className="container">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/createAccount/">createAccount</Link></li>
                    <li><Link to="/resetPassword">resetPassword</Link></li>
                </ul>
            <hr/>
            </div>
        </div>
    )
}

export default HomeComponent;