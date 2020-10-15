import styled from '../Styles/styled-components';

/**
 * Type of button refers to the visual weight of the button with
 * Primary button being more visually bold than Secondary buttons
 * and so on
 * ---
 * Spec for what buttons of different types should look like:
 * https://www.figma.com/file/8eJ5e9icjoAOxMRcomRhZV/ui-elements?node-id=0%3A1
 */
export enum ButtonVariant {
  CallToAction,
  Primary,
  Secondary,
  Tertiary,
}

export interface IButtonProps {
  variant?: ButtonVariant; // Default to primary button if type is not provided
  isLoading?: boolean;
  isNarrow?: boolean;
  isOutlined?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<IButtonProps>`
  padding: 0;
  margin: 0;
  min-width: ${(props) => (!props.isNarrow ? '100px' : 'initial')};
  cursor: pointer;
  transition: 0.15s linear all;
  position: relative;

  ${(props) =>
    // Handle styling for primary, secondary and call-to-action buttons seperatly from tertiary action buttons
    // as these all have the classical "button" type look while tertiary buttons have more of a "link" look
    (props.variant === undefined || props.variant !== ButtonVariant.Tertiary) &&
    `
      font-family: ${props.theme.fonts.header};
      font-size: 16px;
      font-weight: 400;
      text-transform: capitalize;
      min-height: 40px;
      max-height: 60px;


      /* Default border radius to values befiting a call to action button 
         - these values will be reset later if button is not a call to action */
      border-radius: 40px;
      padding-left: 32px;
      padding-right: 32px;
  `}

  ${(props) =>
    // Call to action and primary buttons have solid background and gradient borders
    (props.variant === ButtonVariant.CallToAction ||
      props.variant === ButtonVariant.Primary ||
      props.variant === undefined) &&
    `
      background-color: ${props.theme.colors.purple};
      color: ${props.theme.colors.white};
      border: 2px solid ${props.theme.colors.purple};
  `}

  ${(props) =>
    // Call to action and primary buttons have solid background and gradient borders
    props.variant === ButtonVariant.Secondary &&
    `
      background-color: ${props.theme.colors.purpleLight};
      color: ${props.theme.colors.purple};
      border: 2px solid transparent;
  `}

  ${(props) =>
    // Primary and secondary button have only slighly rounded corners and less
    // horizontal padding
    (props.variant === ButtonVariant.Primary ||
      props.variant === ButtonVariant.Secondary ||
      props.variant === undefined) &&
    `
      border-radius: 8px;
      padding-left: 24px;
      padding-right: 24px;
  `}

  ${(props) =>
    props.isOutlined &&
    `
    background: none;
    color: ${props.theme.colors.purple};
    border-color: ${
      props.variant === ButtonVariant.Secondary
        ? props.theme.colors.purpleLight
        : props.theme.colors.purple
    };
    `}

  ${(props) =>
    props.disabled
      ? `
        cursor: not-allowed;
        color: ${props.theme.colors.black60};
        background-color: ${props.theme.colors.black10};
        border-color: ${props.theme.colors.black10};
      `
      : `&:hover {
          background-color: ${
            props.variant === ButtonVariant.Secondary
              ? props.theme.colors.purple
              : props.theme.colors.purpleLight
          };
          border-color: ${
            props.variant === ButtonVariant.Secondary
              ? props.theme.colors.purple
              : props.theme.colors.purpleLight
          };
          color: ${
            props.variant === ButtonVariant.Secondary
              ? props.theme.colors.white
              : props.theme.colors.purple
          };
        }
    `}

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.isLoading &&
    `
    color: ${
      props.variant === ButtonVariant.Secondary
        ? props.theme.colors.black60
        : props.theme.colors.red
    };
    &:hover {
      color: ${
        props.variant === ButtonVariant.Secondary
          ? props.theme.colors.purpleLight
          : props.theme.colors.purpleLight
      };
    }
    &:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      border-radius: 50%;
      border: 3px solid ${
        props.variant === ButtonVariant.Secondary
          ? props.theme.colors.black30
          : props.theme.colors.redLight
      };
      border-top-color: ${props.theme.colors.white};
      animation: spinner .8s ease infinite;
    }`}
`;

export default Button;
