import { FieldProps } from 'formik';
import * as React from 'react';
import { Countries } from '../../config';
import {
  AutosuggestItem,
  Label,
  LabelText,
  StyledAutosuggest,
} from '../../shared/Form';

/**
 * CountriesComponent props
 */
export interface ICountriesComponentProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}
interface ICountriesComponentState {
  suggestions: string[];
}

/**
 * CountriesComponent renders a dropdown for users to select their country of origin. Cannot add their own.
 */
export default class CountriesComponent extends React.Component<
  ICountriesComponentProps & FieldProps,
  ICountriesComponentState
> {
  constructor(props: ICountriesComponentProps & FieldProps) {
    super(props);
    this.state = {
      suggestions: [],
    };
    // this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested =
      this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested =
      this.onSuggestionsClearRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }
  public render() {
    const CountriesAutosuggest = StyledAutosuggest;
    const { suggestions } = this.state;
    const { value } = this.props;
    const inputProps = {
      placeholder: 'Country name',
      value,
      onChange: this.onChange,
    };

    return (
      <Label>
        <LabelText label={this.props.label} required={this.props.required} />
        <CountriesAutosuggest
          shouldRenderSuggestions={this.shouldRenderSuggestions}
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
    return this.getSuggestions(value).length < 50;
  }

  private onChange(event: React.FormEvent<any>, data: any) {
    // Only update the suggestions list, don't update the form value directly
    const value = data ? data.newValue : '';
    this.setState({ suggestions: this.getSuggestions(value) });
  }
  /**
   *
   */
  private onSuggestionSelected(
    event: React.FormEvent<any>,
    { suggestion }: { suggestion: string }
  ) {
    const field = this.props.field;
    const form = this.props.form;
    if (suggestion) {
      form.setFieldValue(field.name, suggestion);
    } 
  }

  private getSuggestions(selection: string): string[] {
    const inputValue = selection.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestions =
      inputLength === 0
        ? []
        : Countries.filter((country) =>
            country.trim().toLowerCase().includes(inputValue)
          );
    return suggestions;
  }

  private onSuggestionsFetchRequested({ value }: { value: string }) {
    const suggestions = this.getSuggestions(value);
    this.setState({ suggestions });
  }
  private onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }
  private getSuggestionValue(suggestion: string) {
    return suggestion;
  }
  private renderSuggestion(suggestion: string) {
    return <AutosuggestItem>{suggestion}</AutosuggestItem>;
  }
}

export { CountriesComponent };
