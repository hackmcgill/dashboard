import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import CreateAccount from './containers/createAccount';
import resetPassword from './containers/resetPassword';
import HomeComponent from './components/HomeComponent';


class App extends React.Component {
    
    public render() {
      return (
        <Router>
          <div>
            <Route exact={true} path="/" component={HomeComponent}/>
            <Route path="/createAccount/" component={CreateAccount}/>
            <Route path="/resetPassword/" component={resetPassword}/>
          </div>
        </Router>
      );
      
    }
  

}

export default App;
