
import * as React from 'react';
import HackerAPI from 'src/api/hacker';
import Button from 'src/shared/Button';

export interface IDownloadResumeProps {
    hackerId: string;
}
const DownloadResumeComponent: React.StatelessComponent<IDownloadResumeProps> = (props) => {
    return (
        <Button type="button" secondary={true} onClick={handleClick(props)}>
            View Current Resume
        </Button>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the checkbox component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleClick(props: IDownloadResumeProps): (event: React.MouseEvent<any>) => void {
    return () => {
        HackerAPI.downloadResume(props.hackerId).then((response) => {
            const resume = response.data.data.resume;
            const bufferObj = Buffer.from(resume[0].data);
            const pdf = (bufferObj.toString('base64'));
            const pdfWindow = window.open('');
            if (pdfWindow) {
                pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdf) + "'></iframe>")
            }
        });
    }
}

export default DownloadResumeComponent;
