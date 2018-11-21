/// <reference types="react"/>

declare module 'react-phone-number-input' {
  type FlagsMap = { [countryCode: string]: () => HTMLImageElement };

  interface ComponentProps {
    autoComplete?: string;
    className?: string;
    country?: string;
    countries?: string[];
    countryOptions?: string[];
    countrySelectComponent?: (props: any) => React.Component<object>;
    countrySelectTabIndex?: number;
    disabled?: boolean;
    displayInitialValueAsLocalNumber?: boolean;
    error?: string;
    ext?: HTMLInputElement;
    flagComponent?: (props: { country: string, flagsPath: string, flags: FlagsMap }) => React.Component<object, object>;
    flags?: FlagsMap;
    flagsPath?: string;
    getInputClassName?: (props?: { disable?: boolean, invalid?: boolean }) => string;
    indicateInvalid?: boolean;
    inputComponent?: any;
    international?: boolean;
    internationalIcon?: (val: any) => void;
    inputClassName?: string;
    labels?: { [countryCode: string]: string }[];
    limitMaxLength?: boolean;
    locale?: any;
    metadata?: any;
    placeholder?: string;
    onChange: (phone: string) => void;
    onCountryChange?: (props?: any) => void;
    showCountrySelect?: boolean;
    style?: React.HTMLProps<HTMLDivElement>;
    value?: string;
  }

  //@ts-ignore
  export default class PhoneInput extends React.Component<ComponentProps, object> { };
}
