import * as React from 'react';
// import Auth from '../api/auth';
export class LoginContainer extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    // private onLogin(email: string, password: string) {
    //     Auth.login(email,password);
    // }
}
