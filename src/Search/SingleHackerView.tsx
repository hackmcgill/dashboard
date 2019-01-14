import * as React from 'react';

import { Box, Flex } from '@rebass/grid';

import { IAccount, IHacker } from '../config';
import { H1, Paragraph } from '../shared/Elements';

interface IHackerViewProps {
  hacker: IHacker;
}

class SingleHackerView extends React.Component<IHackerViewProps, {}> {
  public render() {
    const { hacker } = this.props;
    const account = hacker.accountId as IAccount;
    return (
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <H1 marginLeft="0">{`${account.firstName} ${account.lastName}`}</H1>
        <Flex width="100%" flexWrap="wrap" justifyContent="space-between">
          <Box width={[1, 1 / 2]}>
            <strong>Status</strong>: {hacker.status}
          </Box>
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
          <Box width={[1, 1 / 2]}>
            <strong>Job interest</strong>: {hacker.application.jobInterest}
          </Box>
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
        </Flex>
      </article>
    );
  }
}

export default SingleHackerView;
