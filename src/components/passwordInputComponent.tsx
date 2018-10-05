import * as React from 'react';

interface IPasswordInputProp {
    onPasswordChanged: (email: string) => void;
}
const PasswordInput: React.StatelessComponent<IPasswordInputProp> = (props) => {
    return (
        <label>
        Password:
            <input type="password" onChange={handleChange(props)} />
        </label>
    )
}

function handleChange(props:IPasswordInputProp): (event:React.ChangeEvent<HTMLInputElement>)=>void {
    return (event:React.ChangeEvent<HTMLInputElement>) => props.onPasswordChanged(event.target.value);
}

export default PasswordInput;
