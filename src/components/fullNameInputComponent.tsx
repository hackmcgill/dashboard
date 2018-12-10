import * as React from 'react';
import Input from 'src/shared/Input';
import Label from 'src/shared/Label';

import { Flex } from '@rebass/grid';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import LabelTextComponent from './LabelTextComponent';
import { FIRST_NAME_LABEL, LAST_NAME_LABEL } from 'src/config/constants';

interface IFullNameInput {
    firstNameValue?: string;
    lastNameValue?: string;
    onFirstNameChanged: (firstName: string) => void;
    onLastNameChanged: (lastName: string) => void;
}
const FullNameInput: React.StatelessComponent<IFullNameInput> = (props: IFullNameInput) => {
    return (
        <Flex flexWrap={'wrap'} width={1} m='auto' name='name_flex'>
            <MaxWidthBox width={[1, 0.5]} mb={'20px'} pr={[0, '10px']}>
                <Label>
                    <LabelTextComponent label={FIRST_NAME_LABEL} required={true} />
                    <Input type='text' onChange={handleChange(props, 'first')} isTight={true} value={props.firstNameValue} />
                </Label>
            </MaxWidthBox>
            <MaxWidthBox width={[1, 0.5]} mb={'20px'} pl={[0, '10px']}>
                <Label>
                    <LabelTextComponent label={LAST_NAME_LABEL} required={true} />
                    <Input type='text' onChange={handleChange(props, 'last')} isTight={true} value={props.lastNameValue} />
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
