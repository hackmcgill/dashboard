import * as React from 'react';
import Helmet from 'react-helmet';

import { Box, Flex } from '@rebass/grid';
import { toast } from 'react-toastify';

import { Hacker } from '../api';
import { HackerStatus, IAccount, IHacker, UserType } from '../config';
import { Button, H1, H2, MaxWidthBox } from '../shared/Elements';
import ViewPDFComponent from '../shared/Elements/ViewPDF';
import { Form, StyledSelect } from '../shared/Form';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import theme from '../shared/Styles/theme';
import { date2age, getOptionsFromEnum } from '../util';

import SHField from './SingleHackerField';
import SHLink from './SingleHackerLink';
import SHParagraph from './SingleHackerParagraph';
import SingleHackerSection from './SingleHackerSection';

interface IHackerViewProps {
  hacker: IHacker;
  userType: UserType;
}

interface IHackerViewState {
  isAdmin: boolean;
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
      status: props.hacker.status,
      isAdmin: true,
      isLoading: false,
    };
  }

  public componentDidMount() {
    const isAdmin = this.props.userType === UserType.STAFF;
    this.setState({ isAdmin });
    this.submit = this.submit.bind(this);
  }

  public componentDidUpdate(prevProps: IHackerViewProps) {
    if (
      prevProps.hacker.id !== this.props.hacker.id &&
      this.props.hacker.status !== this.state.status
    ) {
      const {
        hacker: { status },
      } = this.props;
      this.setState({ status });
    }
  }

  public render() {
    const { hacker } = this.props;
    const { isAdmin, isLoading, status } = this.state;
    const account = (hacker.accountId as IAccount) || {};
    const pronoun = account.pronoun ? `(${account.pronoun})` : '';
    return (
      <article>
        <Helmet>
          <title>
            {`${account.firstName} ${account.lastName}`} | McHacks 6
          </title>
        </Helmet>
        <MaxWidthBox maxWidth="800px">
          <H1 marginLeft="0">
            {`${account.firstName} ${account.lastName} ${pronoun}`}
          </H1>
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
                  isDisabled={!isAdmin}
                  onChange={this.handleChange}
                  value={{
                    label: status,
                    value: status,
                  }}
                />
              </Box>
              <Flex
                width={[1, 1 / 2]}
                justifyContent={['center', 'flex-start']}
              >
                <Button
                  type="button"
                  onClick={this.submit}
                  isLoading={isLoading}
                  disabled={isLoading || !isAdmin}
                >
                  Change status
                </Button>
              </Flex>
            </Flex>
          </Form>
          <hr />
          <Box ml="6px">
            <SingleHackerSection
              title={'Administrative Information'}
              hidden={!isAdmin}
            >
              <Flex
                width="100%"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
              >
                <SHField label="Age" text={date2age(account.birthDate)} />
                <SHField label="Shirt Size" text={account.shirtSize} />
                <SHLink
                  label="Phone Number"
                  link={`tel:${account.phoneNumber}`}
                  linkText={account.phoneNumber}
                />
                <SHField
                  label="Dietary Restrictions"
                  text={
                    account.dietaryRestrictions &&
                    account.dietaryRestrictions.join(', ')
                  }
                />
              </Flex>
              <hr />
            </SingleHackerSection>
            <H2 color={theme.colors.grey}>Basic Information</H2>
            <Flex
              width="100%"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <SHField label="Email" text={account.email} />
              <SHField label="School" text={hacker.school} />
              <SHField label="Degree" text={hacker.degree} />
              <SHField label="Status" text={hacker.status} />
              <SHField label="Graduation Year" text={hacker.graduationYear} />
              <SHField label="Major(s)" text={hacker.major} />
              <SHField
                label="Skills"
                text={
                  hacker.application.skills &&
                  hacker.application.skills.join(', ')
                }
              />
              <SHField
                label="Job interest"
                text={hacker.application.jobInterest}
              />
            </Flex>
            <hr />
            <H2 color={theme.colors.grey}>Links</H2>
            <Flex
              width="100%"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <SHLink
                label="GitHub"
                link={hacker.application.portfolioURL.github}
              />
              <SHLink
                label="LinkedIn"
                link={hacker.application.portfolioURL.linkedIn}
              />
              <SHLink
                label="Website"
                link={hacker.application.portfolioURL.personal}
              />
              <SHLink
                label="Dribbble"
                link={hacker.application.portfolioURL.dropler}
              />
            </Flex>
            <ViewPDFComponent hackerId={hacker.id} />
            <SingleHackerSection
              title="Additional Information"
              hidden={!isAdmin}
            >
              <SHParagraph
                label="Why McHacks?"
                text={hacker.application.essay}
              />
              <SHParagraph
                label="Comments"
                text={hacker.application.comments}
              />
            </SingleHackerSection>
          </Box>
        </MaxWidthBox>
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
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  }

  private handleChange = ({ value }: any) => {
    this.setState({ status: value });
  };
}

export default SingleHackerView;
