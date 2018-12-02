import * as React from 'react';
import logo from 'src/logo.svg';
import { Link } from 'react-router-dom';
import FrontendRoute from 'src/config/FrontendRoute';

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
                    <li><Link to={FrontendRoute.CREATE_ACCOUNT_PAGE}>create account</Link></li>
                    <li><Link to={FrontendRoute.RESET_PASSWORD_PAGE}>Reset password</Link></li>
                </ul>
                <hr />
            </div>
        </div>
    )
}

export default HomeComponent;