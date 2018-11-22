import * as React from 'react';
import CreateApplicationForm from 'src/components/applicationComponent';
import { ThemeProvider } from 'styled-components';
import Container from 'src/shared/Container';
import theme from 'src/theme';

export default class CreateApplicationContainer extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <CreateApplicationForm />
                </Container>
            </ThemeProvider>
        )
    }
}