import * as React from 'react';
import CreateApplicationForm from 'src/components/applicationComponent';
import MaxWidthBox from 'src/shared/MaxWidthBox';

export default class CreateApplicationContainer extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <MaxWidthBox maxWidth={'500px'} m={'auto'}>
                <CreateApplicationForm />
            </MaxWidthBox>
        )
    }
}
