import { FieldProps } from 'formik';
import * as React from 'react';
import { Schools } from '../config';
import {
  AutosuggestItem,
  Label,
  LabelText,
  StyledAutosuggest,
} from '../shared/Form';

/**
 * SchoolComponent props
 */
export interface ISchoolComponentProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}
interface ISchoolComponentState {
  suggestions: string[];
}

/**
 * SchoolComponent renders a dropdown for users to select their which school they are a part of, and add their own.
 */
export default class SchoolComponent extends React.Component<
  ISchoolComponentProps & FieldProps,
  ISchoolComponentState
> {
  constructor(props: ISchoolComponentProps & FieldProps) {
    super(props);
    this.state = {
      suggestions: [],
    };
    // this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }
  public render() {
    const SchoolAutosuggest = StyledAutosuggest;
    const { suggestions } = this.state;
    const { value } = this.props;
    const inputProps = {
      placeholder: 'School name',
      value,
      onChange: this.onChange,
    };

    return (
      <Label>
        <LabelText label={this.props.label} required={this.props.required} />
        <SchoolAutosuggest
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
    const field = this.props.field;
    const form = this.props.form;
    if (data) {
      form.setFieldValue(field.name, data.newValue);
    } else {
      form.setFieldValue(field.name, '');
    }
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
    } else {
      form.setFieldValue(field.name, '');
    }
  }

  private getSuggestions(selection: string): string[] {
    const inputValue = selection.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestions =
      inputLength === 0
        ? []
        : Schools.filter((school) =>
            school
              .trim()
              .toLowerCase()
              .includes(inputValue)
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

export { SchoolComponent };
