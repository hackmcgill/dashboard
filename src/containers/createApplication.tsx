import * as React from 'react';
import CreateApplicationForm from 'src/components/applicationComponent';
import Container from 'src/shared/Container';

export default class CreateApplicationContainer extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Container>
                <CreateApplicationForm />
            </Container>
        )
    }
}