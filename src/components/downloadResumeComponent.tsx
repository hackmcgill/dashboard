
import * as React from 'react';
import HackerAPI from 'src/api/hacker';

export interface IDownloadResumeProps {
    hackerId: string;
}
const DownloadResumeComponent: React.StatelessComponent<IDownloadResumeProps> = (props) => {
    return (
        <a onClick={handleClick(props)}>
            View Resume
        </a>
    )
}
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the checkbox component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleClick(props: IDownloadResumeProps): (event: React.MouseEvent<any>) => void {
    return (event: React.MouseEvent<any>) => {
        HackerAPI.downloadResume(props.hackerId).then((response) => {
            const resume = response.data.data.resume;
            const bufferObj = Buffer.from(resume[0].data);
            const blob = new Blob([bufferObj]);
            const url = window.URL.createObjectURL(blob);
            const tempLink = document.createElement('a');
            tempLink.href = url;
            // thoughts on changing the pdf name?
            tempLink.setAttribute('download', 'resume.pdf');
            tempLink.click();
        });
    }
}

export default DownloadResumeComponent;
