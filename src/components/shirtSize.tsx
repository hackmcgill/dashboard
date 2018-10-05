import * as React from 'react';
import Select from 'react-select';
import ShirtSize from '../shared/shirtSizes';
import { ActionMeta } from 'react-select/lib/types'

interface IShirtSizeState {
    selectedOptions: ShirtSize
}
interface IShirtSizeProps {
    onShirtSizeChanged: (selectedOptions: ShirtSize) => void;

}

export class ShirtSizeComponent extends React.Component<IShirtSizeProps, IShirtSizeState> {
    constructor(props: IShirtSizeProps) {
        super(props);
        this.state = {
            selectedOptions: ShirtSize.M,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    public render() {
        const options: Array<{label:string,value:string}> = [
            { label:ShirtSize.XS, value:ShirtSize.XS },
            { label:ShirtSize.S, value:ShirtSize.S },
            { label:ShirtSize.M, value:ShirtSize.M },
            { label:ShirtSize.L, value:ShirtSize.L },
            { label:ShirtSize.XL, value:ShirtSize.XL },
            { label:ShirtSize.XXL, value:ShirtSize.XXL },
        ]
        return (
            <Select
                onChange={this.handleChange}
                options={options}
            />
        );
    }
    public getChosenShirtSizes(): string {
        return this.state.selectedOptions;
    }
    private handleChange(newValue: {label:ShirtSize,value:ShirtSize}, actionMeta: ActionMeta): void {
        this.setState({ selectedOptions: newValue.value });
        this.props.onShirtSizeChanged(newValue.value)
    }
}
