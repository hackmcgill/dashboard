import * as React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import DietaryRestriction from '../shared/dietaryRestrictions';

/**
 * DietaryRestrictionsComponent state
 */
export interface IDietRestrictionState {
    selectedOptions: string[]
}
/**
 * DietaryRestrictionsComponent props
 */
export interface IDietRestrictionProps {
    onDietaryRestrictionsChanged: (selectedOptions: string[]) => void;
}

/**
 * DietaryRestrictionsComponent renders a dropdown for users to select their dietary restrictions, and
 * potentially create their own restrictions.
 */
const DietaryRestrictionsComponent: React.StatelessComponent<IDietRestrictionProps> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: DietaryRestriction.DAIRY_FREE, value: DietaryRestriction.DAIRY_FREE },
        { label: DietaryRestriction.GLUTEN_FREE, value: DietaryRestriction.GLUTEN_FREE },
        { label: DietaryRestriction.HALAL, value: DietaryRestriction.HALAL },
        { label: DietaryRestriction.KOSHER, value: DietaryRestriction.KOSHER },
        { label: DietaryRestriction.VEGAN, value: DietaryRestriction.VEGAN },
        { label: DietaryRestriction.VEGETARIAN, value: DietaryRestriction.VEGETARIAN },
    ]
    return (
        <CreatableSelect
            id={"diet-restrictions"}
            isMulti={true}
            onChange={handleChange(props)}
            options={options}
        />
    );
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the DietaryRestrictions component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(props: IDietRestrictionProps): (event: Array<{ label: string, value: string }>) => void {
    return (newValue: Array<{ label: string, value: string }>) => {
        const values = newValue.map<string>((option) => option.value);
        props.onDietaryRestrictionsChanged(values);
    }
}

export default DietaryRestrictionsComponent;
