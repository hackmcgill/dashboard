
import * as React from 'react';
import HackerAPI from 'src/api/hacker';
import Button from 'src/shared/Button';

interface IViewPDFProps {
    hackerId: string;
}
interface IViewPDFState {
    isLoading: boolean;
}
class ViewPDFComponent extends React.Component<IViewPDFProps, IViewPDFState> {

    constructor(props: IViewPDFProps) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        return (
            <Button
                isLoading={this.state.isLoading}
                disabled={this.state.isLoading} 
                secondary={true}
                type="button" 
                onClick={this.handleClick(this.props)}
            >
                View Current Resume
            </Button>
        )
    }

    private handleClick(props: IViewPDFProps): (event: React.MouseEvent<any>) => void {
        return () => {
            this.setState({
                isLoading: true
            })
            const pdfWindow = window.open('');
            
            HackerAPI.downloadResume(props.hackerId).then((response) => {
                const resume = response.data.data.resume;
                const bufferObj = Buffer.from(resume[0].data);
                const pdf = (bufferObj.toString('base64'));
                if (pdfWindow) {
                    pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(pdf) + "'></iframe>")
                }
                this.setState({
                    isLoading: false
                })
            });
        }
    }
}

export default ViewPDFComponent;
