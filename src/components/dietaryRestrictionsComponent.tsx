import * as React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import DietaryRestriction from '../shared/dietaryRestrictions';
import { ActionMeta } from 'react-select/lib/types';

export interface IDietRestrictionState {
    selectedOptions: string[]
}
export interface IDietRestrictionProps {
    onDietaryRestrictionsChanged: (selectedOptions: string[]) => void;

}

export default class DietRestrictionsComponent extends React.Component<IDietRestrictionProps, IDietRestrictionState> {
    constructor(props: IDietRestrictionProps) {
        super(props);
        this.state = {
            selectedOptions: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }
    public render() {
        const options: Array<{label:string,value:string}> = [
            { label:DietaryRestriction.DAIRY_FREE, value:DietaryRestriction.DAIRY_FREE },
            { label:DietaryRestriction.GLUTEN_FREE, value:DietaryRestriction.GLUTEN_FREE },
            { label:DietaryRestriction.HALAL, value:DietaryRestriction.HALAL },
            { label:DietaryRestriction.KOSHER, value:DietaryRestriction.KOSHER },
            { label:DietaryRestriction.VEGAN, value:DietaryRestriction.VEGAN },
            { label:DietaryRestriction.VEGETARIAN, value:DietaryRestriction.VEGETARIAN },
        ]
        // const options: string[] = [DietaryRestriction.DAIRY_FREE, DietaryRestriction.GLUTEN_FREE, DietaryRestriction.HALAL, DietaryRestriction.KOSHER, DietaryRestriction.VEGAN, DietaryRestriction.VEGETARIAN]
        return (
            <CreatableSelect
                id={"diet-restrictions"}
                isMulti={true}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
    public getDietaryRestriction(): string[] {
        return this.state.selectedOptions;
    }
    private handleChange(newValue: Array<{label:string,value:string}>, actionMeta: ActionMeta): void {
        console.log(newValue);
        const values =newValue.map<string>((option) => option.value);
        this.setState({ selectedOptions: values });
        this.props.onDietaryRestrictionsChanged(values);
    }

}
