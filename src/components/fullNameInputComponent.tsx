import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';

import { Flex } from '@rebass/grid';
import MaxWidthBox from 'src/shared/MaxWidthBox';

interface IFullNameInput {
    onFirstNameChanged: (firstName: string) => void;
    onLastNameChanged: (lastName: string) => void;
}
const FullNameInput: React.StatelessComponent<IFullNameInput> = (props) => {
    return (
        <Flex flexWrap={'wrap'} width={[1, 1 - 0.12]} m='auto' name='name_flex'>
            <MaxWidthBox width={[1, 0.5]} m={'none'} marginBottom='0px'>
                <Label>
                    First Name:
                    <Input type='text' onChange={handleChange(props, 'first')} isTight={true} />
                </Label>
            </MaxWidthBox>
            <MaxWidthBox width={[1, 0.5,]} m={'none'} marginBottom='0px' >
                <Label>
                    Last Name:
                        <Input type='text' onChange={handleChange(props, 'last')} isTight={true} />
                </Label>
            </MaxWidthBox>
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
