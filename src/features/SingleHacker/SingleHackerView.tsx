import * as React from 'react';
import Helmet from 'react-helmet';

import { Box, Flex } from '@rebass/grid';
import { toast } from 'react-toastify';

import { Hacker } from '../../api';
import { HackerStatus, IAccount, IHacker, UserType } from '../../config';
import { Button, H1, H2, MaxWidthBox } from '../../shared/Elements';
import ViewPDFComponent from '../../shared/Elements/ViewPDF';
import { Form, StyledSelect } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import theme from '../../shared/Styles/theme';
import { date2age, getOptionsFromEnum } from '../../util';

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
          <hr hidden={isAdmin} />
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
                <SHField
                  label="Shirt Size"
                  text={hacker.accommodation.shirtSize}
                />
                {/* Removed as shirt size is no longer a property of account
                  <SHField label="Shirt Size" text={account.shirtSize} /> */}
                <SHField label="Gender" text={account.gender} />
                <SHLink
                  label="Phone Number"
                  link={`tel:${account.phoneNumber}`}
                  linkText={account.phoneNumber}
                />
                <SHField
                  label="Dietary Restrictions"
                  text={
                    hacker.accommodation.dietaryRestrictions &&
                    hacker.accommodation.dietaryRestrictions.join(', ')
                  }
                />
                <SHParagraph
                  label="Impairments"
                  text={hacker.application.accommodation.impairments}
                />
                <SHParagraph
                  label="Barriers"
                  text={hacker.application.accommodation.barriers}
                />
              </Flex>
              <hr />
            </SingleHackerSection>
            <H2 color={theme.colors.black60}>Basic Information</H2>
            <Flex
              width="100%"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <SHField label="Email" text={account.email} />
              <SHField
                label="School"
                text={hacker.application.general.school}
              />
              <SHField
                label="Degree"
                text={hacker.application.general.degree}
              />
              <SHField label="Status" text={hacker.status} />
              <SHField
                label="Graduation Year"
                text={hacker.application.general.graduationYear}
              />
              <SHField
                label="Field(s) of Study"
                text={hacker.application.general.fieldOfStudy}
              />
              <SHField
                label="Skills"
                text={
                  hacker.application.shortAnswer.skills &&
                  hacker.application.shortAnswer.skills.join(', ')
                }
              />
              <SHField
                label="Job interest"
                text={hacker.application.general.jobInterest}
              />
            </Flex>
            <hr />
            <H2 color={theme.colors.black60}>Links</H2>
            <Flex
              width="100%"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <SHLink
                label="GitHub"
                link={hacker.application.general.URL.github}
              />
              <SHLink
                label="LinkedIn"
                link={hacker.application.general.URL.linkedIn}
              />
              <SHLink
                label="Website"
                link={hacker.application.general.URL.personal}
              />
              <SHLink
                label="Dribbble"
                link={hacker.application.general.URL.dribbble}
              />
            </Flex>
            <ViewPDFComponent hackerId={hacker.id} />
            <SingleHackerSection
              title="Additional Information"
              hidden={!isAdmin}
            >
              <SHParagraph
                label="Why McHacks?"
                text={hacker.application.shortAnswer.question1}
              />
              <SHParagraph
                label="Some Q?"
                text={hacker.application.shortAnswer.question2}
              />
              <SHParagraph
                label="Comments"
                text={hacker.application.shortAnswer.comments}
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
