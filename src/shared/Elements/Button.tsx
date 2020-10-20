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
  Primary,
  Secondary,

  // Deprecated
  CallToAction,
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

  font-family: ${(props) => props.theme.fonts.header};
  font-size: 16px;
  font-weight: 400;
  text-transform: capitalize;
  min-height: 40px;
  max-height: 60px;

  border-radius: 8px;
  padding-left: 24px;
  padding-right: 24px;

  ${(props) =>
    // Call to action and primary buttons have solid background and gradient borders
    (props.variant === ButtonVariant.Primary) &&
    `
      background-color: ${props.theme.colors.purple};
      color: ${props.theme.colors.white};
      border: none;
      box-shadow: 2px 4px 16px 0 ${props.theme.colors.purpleLight};
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
    props.isOutlined &&
    `
    background: none;
    color: ${props.theme.colors.purple};
    border-color: ${props.variant === ButtonVariant.Secondary
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
        ${props.variant === ButtonVariant.Primary && `
          background-color: ${props.theme.colors.purpleLight};
          color: ${props.theme.colors.purple};
          box-shadow: none;
        `}

        ${props.variant === ButtonVariant.Secondary && `
          background-color: ${props.theme.colors.purple};
          border-color: ${props.theme.colors.purple};
          color: ${props.theme.colors.white};
        `}
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
    color: ${props.variant === ButtonVariant.Secondary
      ? props.theme.colors.black60
      : props.theme.colors.red
    };
    &:hover {
      color: ${props.variant === ButtonVariant.Secondary
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
      border: 3px solid ${props.variant === ButtonVariant.Secondary
      ? props.theme.colors.black30
      : props.theme.colors.redLight
    };
      border-top-color: ${props.theme.colors.white};
      animation: spinner .8s ease infinite;
    }`}
`;

export default Button;
