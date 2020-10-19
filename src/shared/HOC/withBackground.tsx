import React from 'react';

import theme from '../../shared/Styles/theme';

const withBackground = <P extends {}>(
    Component: React.ComponentType<P>
): React.FC => {
    return (props: P) => {
        return (
            <div style={styles.background}>
                <Component key={1} {...props} />
            </div>
        );
    }
};

const styles = {
    background: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${theme.colors.white}, ${theme.colors.black5} 100%)`,
        zIndex: -1001
    }
}

export default withBackground;
