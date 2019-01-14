import * as React from 'react';

import { Box, Flex } from '@rebass/grid';
import { toast } from 'react-toastify';

import { Hacker } from '../api';
import { HackerStatus, IAccount, IHacker } from '../config';
import { Button, H1, H2, Paragraph } from '../shared/Elements';
import ViewPDFComponent from '../shared/Elements/ViewPDF';
import { Form, StyledSelect } from '../shared/Form';
import theme from '../shared/Styles/theme';
import { getOptionsFromEnum } from '../util';

interface IHackerViewProps {
  hacker: IHacker;
}

interface IHackerViewState {
  canEdit: boolean;
  isLoading: boolean;
  status: HackerStatus;
}

class SingleHackerView extends React.Component<
  IHackerViewProps,
  IHackerViewState
> {
  constructor(props: IHackerViewProps) {
    super(props);
    this.state = {
      status: HackerStatus.HACKER_STATUS_APPLIED,
      canEdit: true,
      isLoading: false,
    };
  }

  public componentDidMount() {
    const {
      hacker: { status },
    } = this.props;
    this.setState({ status });
    this.submit = this.submit.bind(this);
  }

  public render() {
    const { hacker } = this.props;
    const account = hacker.accountId as IAccount;
    return (
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Flex justifyContent="space-between">
          <H1 marginLeft="0">{`${account.firstName} ${account.lastName}`}</H1>
          <ViewPDFComponent hackerId={hacker.id} />
        </Flex>
        <Form>
          <Flex
            width="100%"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Box width={[1, 1 / 2]}>
              <StyledSelect
                isTight={true}
                className="react-select-container"
                classNamePrefix="react-select"
                options={getOptionsFromEnum(HackerStatus)}
                isDisabled={!this.state.canEdit}
                onChange={this.handleChange}
                value={{
                  label: this.state.status,
                  value: this.state.status,
                }}
              />
            </Box>
            <Box width={[1, 1 / 2]}>
              <Button
                type="button"
                onClick={this.submit}
                isLoading={this.state.isLoading}
                disabled={this.state.isLoading}
              >
                Change status
              </Button>
            </Box>
          </Flex>
        </Form>
        <hr />
        <Box ml="6px">
          <H2 color={theme.colors.grey}>Basic Information</H2>
          <Flex
            width="100%"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width={[1, 1 / 2]}>
              <strong>Email</strong>: {account.email}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>School</strong>: {hacker.school}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Degree</strong>: {hacker.degree}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Status</strong>: {hacker.status}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Graduation Year</strong>: {hacker.graduationYear}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Major(s)</strong>: {hacker.major}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Skills</strong>:{' '}
              {hacker.application.skills
                ? hacker.application.skills.join(', ')
                : 'None'}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Job interest</strong>: {hacker.application.jobInterest}
            </Box>
          </Flex>
          <hr />
          <H2 color={theme.colors.grey}>Links</H2>
          <Flex
            width="100%"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width={[1, 1 / 2]}>
              <strong>GitHub</strong>:{' '}
              {hacker.application.portfolioURL.github ? (
                <a href={hacker.application.portfolioURL.github}>
                  {hacker.application.portfolioURL.github}
                </a>
              ) : (
                'None'
              )}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>LinkedIn</strong>:{' '}
              {hacker.application.portfolioURL.linkedIn ? (
                <a href={hacker.application.portfolioURL.linkedIn}>
                  {hacker.application.portfolioURL.linkedIn}
                </a>
              ) : (
                'None'
              )}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Website</strong>:{' '}
              {hacker.application.portfolioURL.personal ? (
                <a href={hacker.application.portfolioURL.personal}>
                  {hacker.application.portfolioURL.personal}
                </a>
              ) : (
                'None'
              )}
            </Box>
            <Box width={[1, 1 / 2]}>
              <strong>Dribbble</strong>:{' '}
              {hacker.application.portfolioURL.dropler ? (
                <a href={hacker.application.portfolioURL.dropler}>
                  {hacker.application.portfolioURL.dropler}
                </a>
              ) : (
                'None'
              )}
            </Box>
          </Flex>
          <hr />
          <H2 color={theme.colors.grey}>Additional Information</H2>
          <Box width={1}>
            <strong>Why McHacks:</strong>{' '}
            <Paragraph fontSize="16px">{hacker.application.essay}</Paragraph>
          </Box>
          {hacker.application.comments && (
            <Box width={1}>
              <strong>Other comments:</strong>{' '}
              <Paragraph fontSize="16px">
                {hacker.application.comments}
              </Paragraph>
            </Box>
          )}
        </Box>
      </article>
    );
  }

  private async submit() {
    try {
      const { hacker } = this.props;
      const { status } = this.state;
      this.setState({ isLoading: true });
      await Hacker.updateStatus(hacker.id, status);
      this.setState({ isLoading: false });
      toast.success(`Hacker status updated to ${status}!`);
    } catch (e) {
      toast.error(`Hacker status update failed! Message: ${e}`);
    }
  }

  private handleChange = ({ value }: any) => {
    this.setState({ status: value });
  };
}

export default SingleHackerView;
