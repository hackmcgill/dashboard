import * as React from 'react';
import Schools from 'src/config/schools';
import { FieldProps } from 'formik';
import Label from 'src/shared/Label';
import { StyledAutosuggest, AutosuggestItem } from 'src/shared/Autosuggest';
import '../styles/schoolComponentStyle.css';


/**
 * SchoolComponent props
 */
export interface ISchoolComponentProps {
    name: string;
    label?: string;
}
interface ISchoolComponentState {
    suggestions: string[];
    value: string
}

/**
 * SchoolComponent renders a dropdown for users to select their which school they are a part of, and add their own.
 */
export default class SchoolComponent extends React.Component<ISchoolComponentProps & FieldProps, ISchoolComponentState> {
    constructor(props: ISchoolComponentProps & FieldProps) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        }
        // this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
    }
    public render() {
        const SchoolAutosuggest = StyledAutosuggest;
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'School name',
            value,
            onChange: this.onChange
        };

        return (
            <Label>
                <span>{this.props.label || 'Please enter the name of your school'}</span>
                <SchoolAutosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </Label>
        );
    }
    private shouldRenderSuggestions(value: string): boolean {
        return value.trim().length > 2;
    }

    private onChange(event: React.FormEvent<any>, data: any) {
        const field = this.props.field;
        const form = this.props.form;
        if (data) {
            this.setState({
                value: data.newValue
            })
            form.setFieldValue(field.name, data.newValue);
        } else {
            form.setFieldValue(field.name, '');
            this.setState({
                value: ''
            })
        }
    }
    /**
     * 
     */
    private onSuggestionSelected(event: React.FormEvent<any>, { suggestion }: { suggestion: string }) {
        const field = this.props.field;
        const form = this.props.form;
        if (suggestion) {
            console.log("1", suggestion);
            this.setState({ value: suggestion });
            form.setFieldValue(field.name, suggestion);
        } else {
            form.setFieldValue(field.name, '');
            this.setState({ value: '' })
        }
    }

    private getSuggestions(selection: string): string[] {
        const inputValue = selection.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : Schools.filter(school =>
            school.trim().toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    private onSuggestionsFetchRequested({ value }: { value: string }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };
    private onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }
    private getSuggestionValue(suggestion: string) {
        return suggestion;
    }
    private renderSuggestion(suggestion: string) {
        return (
            <AutosuggestItem>
                {suggestion}
            </AutosuggestItem>
        );
    }
}
