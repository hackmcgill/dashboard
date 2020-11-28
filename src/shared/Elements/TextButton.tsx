import React from 'react';
import theme from '../Styles/theme';

export interface ITextButtonProps {
    isGrey?: boolean;
    isLoading?: boolean;
    onClick?: any;
}

/**
 * Button that displays simmilarly to a link
 */
const TextButton: React.FC<ITextButtonProps> = (props) => (
    <>
        {
            props.isLoading ?
                <div className="loading">Loading...</div> :
                <div className="button" onClick={props.onClick}>{props.children}</div>
        }
        <style jsx>{`
            .button {
                display: inline-block;
                color: ${props.isGrey ? theme.colors.black60 : theme.colors.purple};
                text-decoration: underline;
                cursor: pointer;
                transition: color 0.25s ease-in;
            }

            .button:hover {
                color: ${props.isGrey ? theme.colors.red : theme.colors.yellow};
            }

            .loading {
                color: ${theme.colors.black40};
            }
        `}</style>
    </>
)

export default TextButton;
