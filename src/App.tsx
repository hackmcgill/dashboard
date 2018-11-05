import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CreateAccount from './containers/createAccount';
import resetPassword from './containers/resetPassword';


class App extends React.Component {
    
    public render() {
      return (
        <Router>
          <div>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/createAccount/" component={CreateAccount}/>
          <Route path="/resetPassword/" component={resetPassword}/>
          </div>
        </Router>
      );
      
    }
  

}
const Home = () => 
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


export default App;
