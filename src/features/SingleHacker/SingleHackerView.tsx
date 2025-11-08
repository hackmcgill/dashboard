import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import { Box, Flex } from '@rebass/grid';
import { toast } from 'react-toastify';

import { Hacker } from '../../api';
import {
  HACKATHON_NAME,
  HackerStatus,
  IAccount,
  IHacker,
  UserType,
} from '../../config';
import {
  Button,
  ButtonVariant,
  H1,
  H2,
  MaxWidthBox,
} from '../../shared/Elements';
import ViewPDFComponent from '../../shared/Elements/ViewPDF';
import { Form, StyledSelect } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import theme from '../../shared/Styles/theme';

// date2age is currently unused
import { date2age, getOptionsFromEnum } from '../../util';

import SHField from './SingleHackerField';
import SHLink from './SingleHackerLink';
import SHParagraph from './SingleHackerParagraph';
import SingleHackerSection from './SingleHackerSection';

interface IHackerViewProps {
  hacker: IHacker;
  userType: UserType;
}

const SingleHackerView: React.FC<IHackerViewProps> = (props) => {
  const [status, setStatus] = useState(props.hacker.status);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStatus(props.hacker.status);
  }, [props]);

  const isStaffMember = props.userType === UserType.STAFF;
  const isHackboardMember = props.userType === UserType.HACKBOARD;
  const canViewAdminSection = isStaffMember || isHackboardMember;
  const restrictedStatuses = new Set<HackerStatus>([
    HackerStatus.HACKER_STATUS_ACCEPTED,
    HackerStatus.HACKER_STATUS_DECLINED,
  ]);
  const statusRestrictedForHackboard =
    isHackboardMember && restrictedStatuses.has(status);

  const submit = async () => {
    if (!canViewAdminSection) {
      return;
    }
    if (statusRestrictedForHackboard) {
      toast.error(
        'Hackboard members cannot set status to Accepted or Declined.'
      );
      return;
    }
    try {
      setIsLoading(true);
      await Hacker.updateStatus(props.hacker.id, status);
      setIsLoading(false);
      toast.success(`Hacker status updated to ${status}!`);
    } catch (e: any) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  };

  const handleChange = ({ value }: any) => {
    setStatus(value);
  };

  const hackerDetails = props.hacker;
  const account = (hackerDetails.accountId as IAccount) || {};
  const pronoun = account.pronoun ? `(${account.pronoun})` : '';

  // convert birthdates to ages if age value doesn't exist and birthdate value does
  if (account.birthDate && !account.age) {
    account.age = date2age(account.birthDate);
  }

  return (
    <article>
      <Helmet>
        <title>
          {`${account.firstName} ${account.lastName}`} | {HACKATHON_NAME}
        </title>
      </Helmet>
      <MaxWidthBox maxWidth="800px">
        <Flex flexDirection={'column'} style={{ marginTop: '4em' }}>
          <H1 marginLeft="0">
            {`${account.firstName} ${account.lastName} ${pronoun}`}
          </H1>
        </Flex>
        <hr hidden={!canViewAdminSection} />
        <Box ml="6px">
          <SingleHackerSection
            title={'Administrative Information'}
            hidden={!canViewAdminSection}
          >
            <Form>
              <Flex
                width="100%"
                flexWrap="wrap"
                justifyContent="start"
                alignItems="center"
                mb="16px"
              >
                <Box width={[1, 1 / 2]} style={{ paddingTop: '10px' }}>
                  <StyledSelect
                    isTight={true}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={getOptionsFromEnum(HackerStatus)}
                    isDisabled={!canViewAdminSection}
                    isOptionDisabled={
                      isHackboardMember
                        ? (option: { value: HackerStatus }) =>
                            restrictedStatuses.has(option.value)
                        : undefined
                    }
                    onChange={handleChange}
                    value={{
                      label: status,
                      value: status,
                    }}
                  />
                </Box>
                <Flex
                  justifyContent={['center', 'flex-start']}
                  alignItems="center"
                  ml="16px"
                >
                  <Button
                    type="button"
                    onClick={submit}
                    variant={ButtonVariant.Primary}
                    isLoading={isLoading}
                    disabled={
                      isLoading ||
                      !canViewAdminSection ||
                      statusRestrictedForHackboard
                    }
                  >
                    Change status
                  </Button>
                </Flex>
              </Flex>
            </Form>
            <Flex
              width="100%"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <SHField label="Age" text={account.age} />
              <SHField
                label="Shirt Size"
                text={hackerDetails.application.accommodation.shirtSize}
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
                  account.dietaryRestrictions &&
                  account.dietaryRestrictions.join(', ')
                }
              />
              <SHParagraph
                label="Impairments"
                text={hackerDetails.application.accommodation.impairments}
              />
              <SHParagraph
                label="Barriers"
                text={hackerDetails.application.accommodation.barriers}
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
              text={hackerDetails.application.general.school}
            />
            <SHField
              label="Degree"
              text={hackerDetails.application.general.degree}
            />
            <SHField label="Status" text={hackerDetails.status} />
            <SHField
              label="Graduation Year"
              text={hackerDetails.application.general.graduationYear}
            />
            <SHField
              label="Field(s) of Study"
              text={hackerDetails.application.general.fieldOfStudy.join(', ')}
            />
            <SHField
              label="Skills"
              text={
                hackerDetails.application.shortAnswer.skills &&
                hackerDetails.application.shortAnswer.skills.join(', ')
              }
            />
            <SHField
              label="Job interest"
              text={hackerDetails.application.general.jobInterest}
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
              link={hackerDetails.application.general.URL.github}
            />
            <SHLink
              label="LinkedIn"
              link={hackerDetails.application.general.URL.linkedIn}
            />
            <SHLink
              label="Website"
              link={hackerDetails.application.general.URL.other}
            />
            <SHLink
              label="Dribbble"
              link={hackerDetails.application.general.URL.dribbble}
            />
          </Flex>
          {/* Only tier1 sponsors and admin have access to user resumes */}
          {props.userType === UserType.SPONSOR_T1 || canViewAdminSection ? (
            <Flex flexDirection={'column'} style={{ marginTop: '4em' }}>
              <ViewPDFComponent hackerId={hackerDetails.id} />
            </Flex>
          ) : null}
          <SingleHackerSection
            title="Additional Information"
            hidden={!canViewAdminSection}
          >
            <SHParagraph
              label="Why McHacks?"
              text={hackerDetails.application.shortAnswer.question1}
            />
            <SHParagraph
              label="What are you passionate about?"
              text={hackerDetails.application.shortAnswer.question2}
            />
            <SHParagraph
              label="Comments"
              text={hackerDetails.application.shortAnswer.comments}
            />
          </SingleHackerSection>
        </Box>
      </MaxWidthBox>
    </article>
  );
};

export default SingleHackerView;
