import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';

import { Flex, Box } from '@rebass/grid';

interface IFullNameInput {
    onFirstNameChanged: (firstName: string) => void;
    onLastNameChanged: (lastName: string) => void;
}
const FullNameInput: React.StatelessComponent<IFullNameInput> = (props) => {
    return (
        <Flex flexWrap={'wrap'} width={9 / 10} m='auto'>
            <Box width={[1 / 2]}>
                <Label>
                    First Name:
                    <Input type='text' onChange={handleChange(props, 'first')} />
                </Label>
            </Box>
            <Box width={[1 / 2]}>
                <Label>
                    Last Name:
                    <Input type='text' onChange={handleChange(props, 'last')} />
                </Label>
            </Box>
        </Flex>
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the EmailInput component.
 * @param nameType Whether it's a firstname or last name
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IFullNameInput, nameType: 'first' | 'last'): (event: React.ChangeEvent<HTMLInputElement>) => void {
    if (nameType === 'first') {
        return (event: React.ChangeEvent<HTMLInputElement>) => props.onFirstNameChanged(event.target.value);
    } else {
        return (event: React.ChangeEvent<HTMLInputElement>) => props.onLastNameChanged(event.target.value);
    }
}

export default FullNameInput;
