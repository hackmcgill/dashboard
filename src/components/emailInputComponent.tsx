import * as React from 'react';

interface IEmailInputProp {
    onEmailChanged: (email: string) => void;
}
const EmailInput: React.StatelessComponent<IEmailInputProp> = (props) => {
    return (
        <label>
        Email:
            <input type="email" onChange={handleChange(props)} />
        </label>
    )
}

function handleChange(props:IEmailInputProp): (event:React.ChangeEvent<HTMLInputElement>)=>void {
    return (event:React.ChangeEvent<HTMLInputElement>) => props.onEmailChanged(event.target.value);
}

export default EmailInput;