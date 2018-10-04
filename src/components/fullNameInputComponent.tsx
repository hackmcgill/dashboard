import * as React from 'react';

interface IFullNameInput {
    onFirstNameChanged: (firstName: string) => void;
    onLastNameChanged: (lastName: string) => void;
}
const FullNameInput: React.StatelessComponent<IFullNameInput> = (props) => {
    return (
        <div>
            <label>
                First Name:
                <input type="text" onChange={handleChange(props,'first')} />
            </label>
            <label>
                Last Name:
                <input type="text" onChange={handleChange(props,'last')} />
            </label>
        </div>
    );
}
function handleChange(props:IFullNameInput, nameType:'first'|'last'): (event:React.ChangeEvent<HTMLInputElement>)=>void {
    if(nameType==='first') {
        return (event:React.ChangeEvent<HTMLInputElement>) => props.onFirstNameChanged(event.target.value);
    } else {
        return (event:React.ChangeEvent<HTMLInputElement>) => props.onLastNameChanged(event.target.value);
    }
}

export default FullNameInput;