import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Input } from '../../shared/Form';
import { Link } from 'react-router-dom';

import { Box, Flex } from '@rebass/grid';
import { toast } from 'react-toastify';

import { Hacker } from '../../api';
import Team from '../../api/team';
import {
  FrontendRoute,
  HACKATHON_NAME,
  HackerStatus,
  HackerReviewerStatus,
  IAccount,
  IHacker,
  IMemberName,
  UserType,
} from '../../config';
import { ITeamResponse } from '../../config/teamGETResponse';
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
  onUpdate?: () => void;
}

const SingleHackerView: React.FC<IHackerViewProps> = (props) => {
  const [status, setStatus] = useState(props.hacker.status);
  const [reviewerStatus, setReviewerStatus] = useState(props.hacker.reviewerStatus);
  const [reviewerStatus2, setReviewerStatus2] = useState(props.hacker.reviewerStatus2);
  const [reviewerName, setReviewerName] = useState(props.hacker.reviewerName);
  const [reviewerName2, setReviewerName2] = useState(props.hacker.reviewerName2);
  const [reviewerComments, setReviewerComments] = useState(props.hacker.reviewerComments);
  const [reviewerComments2, setReviewerComments2] = useState(props.hacker.reviewerComments2);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<IMemberName[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);

  useEffect(() => {
    setStatus(props.hacker.status);
  }, [props.hacker.status]);

  const isStaffMember = props.userType === UserType.STAFF;
  const isHackboardMember = props.userType === UserType.HACKBOARD;
  const canViewAdminSection = isStaffMember || isHackboardMember;

  useEffect(() => {
    setReviewerStatus(props.hacker.reviewerStatus);
  }, [props]);
  useEffect(() => {
    setReviewerStatus2(props.hacker.reviewerStatus2);
  }, [props]);

  // Fetch team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      // only if hacker has a teamId
      if (props.hacker.teamId) {
        setIsLoadingTeam(true);
        // teamId might be an object (populated) or a string/ObjectId
        // extract the ID if it's an object, otherwise use it as-is
        let teamId: string;
        if (typeof props.hacker.teamId === 'object' && props.hacker.teamId !== null) {
          teamId = String((props.hacker.teamId as any)._id || (props.hacker.teamId as any).id);
        } else {
          teamId = String(props.hacker.teamId);
        }
        try {
          const teamResponse: ITeamResponse = (await Team.get(teamId)).data.data;

          // filter out the current hacker from the team members list
          // convert both IDs to strings for comparison to handle ObjectId vs string mismatches
          const currentHackerId = String(props.hacker.id);
          const otherMembers = teamResponse.members.filter(
            (member) =>
              member &&
              String(member.id) !== currentHackerId &&
              member.id &&
              member.firstName &&
              member.lastName
          );

          setTeamMembers(otherMembers);
        } catch (e: any) {
          setTeamMembers([]);
        } finally {
          setIsLoadingTeam(false);
        }
      } else {
        setTeamMembers([]);
      }
    };

    fetchTeamMembers();
  }, [props.hacker.teamId, props.hacker.id]);

  const submit = async () => {
    if (!isStaffMember && !isHackboardMember) {
      return;
    }
    try {
      setIsLoading(true);
      await Hacker.updateStatus(props.hacker.id, status);

      await Promise.all([
        Hacker.updateStatus(props.hacker.id, status),
        Hacker.updateReviewerStatus(props.hacker.id, reviewerStatus),
        Hacker.updateReviewerStatus2(props.hacker.id, reviewerStatus2),
        Hacker.updateReviewerName(props.hacker.id, reviewerName),
        Hacker.updateReviewerName2(props.hacker.id, reviewerName2),
        Hacker.updateReviewerComments(props.hacker.id, reviewerComments),
        Hacker.updateReviewerComments2(props.hacker.id, reviewerComments2),
      ]);
      // await Hacker.updateStatus(hacker.id, status);
      setIsLoading(false);
      toast.success(`Hacker information updated!`);
      // toast.success(`Hacker status updated to ${status}!`);
      if (props.onUpdate) props.onUpdate();

    } catch (e: any) {
      if (e && e.data) {
        ValidationErrorGenerator(e.data);
      }
    }
  };

  const handleChange = ({ value }: any) => {
    setStatus(value);
  };

  const handleReviewerNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerName(event.target.value);
  };

  const handleReviewerNameChange2 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerName2(event.target.value);
  };

  const handleReviewerCommentsChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerComments(event.target.value);
  };

  const handleReviewerCommentsChange2 = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerComments2(event.target.value);
  };

  const handleReviewerChange = async ({ value }: any) => {
    setReviewerStatus(value);
  };

  const handleReviewerChange2 = async ({ value }: any) => {
    setReviewerStatus2(value);
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
        {/* <hr hidden={!canViewAdminSection} /> */}
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
                mb="0px"
              >
                <Box width={[1, 1 / 2]} style={{ paddingTop: '10px' }}>
                  <StyledSelect
                    isTight={true}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={getOptionsFromEnum(HackerStatus)}
                    isDisabled={!isStaffMember}
                    onChange={handleChange}
                    value={{
                      label: status,
                      value: status,
                    }}
                  />
                </Box>
                {(
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
                      disabled={isLoading}
                    >
                      Save Changes
                    </Button>
                  </Flex>
                )}
              </Flex>
              <Flex
                width="100%"
                flexWrap="wrap"
                justifyContent="start"
                alignItems="center"
                mb="0px"

              >
                <Box width={[1, 1 / 2]} style={{ paddingTop: '10px', marginRight: '17px' }}>
                  <Input
                    onChange={handleReviewerNameChange}
                    placeholder={'Reviewer Name'}
                    value={reviewerName}
                  />
                </Box>
                {/* </Flex> */}
                {/* <Box width={[1, 1/5.5]} style={{ paddingTop: '1px' }}> */}
                <Box width={'9.1rem'} style={{ paddingTop: '1px' }}>
                  <StyledSelect
                    isTight={true}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={getOptionsFromEnum(HackerReviewerStatus)}
                    isDisabled={!isAdmin}
                    onChange={handleReviewerChange}
                    // onChange={(event) => handleReviewerChange(event, 1)}
                    value={{
                      label: reviewerStatus,
                      value: reviewerStatus,
                    }}
                  />
                </Box>
              </Flex>
              <Flex
                justifyContent={['center', 'flex-start']}
                alignItems="center"
                ml="0px"
                mt="-27px"
              >

                <Box width={[1, 0.7]} style={{ paddingTop: '0px', marginRight: '17px' }}>
                  <Input
                    onChange={handleReviewerCommentsChange}
                    placeholder={'Comments'}
                    value={reviewerComments}
                  />
                </Box>
              </Flex>
              <Flex
                width="100%"
                flexWrap="wrap"
                justifyContent="start"
                alignItems="center"
                mb="0px"

              >
                <Box width={[1, 1 / 2]} style={{ paddingTop: '-10px', marginRight: '17px' }}>
                  <Input
                    onChange={handleReviewerNameChange2}
                    placeholder={'Reviewer Name'}
                    value={reviewerName2}
                  />
                </Box>
                <Box width={'9.1rem'} style={{ paddingTop: '-10px' }}>
                  <StyledSelect
                    isTight={true}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={getOptionsFromEnum(HackerReviewerStatus)}
                    isDisabled={!isAdmin}
                    // onChange={(event) => handleReviewerChange(event, 2)}
                    onChange={handleReviewerChange2}
                    value={{
                      label: reviewerStatus2,
                      value: reviewerStatus2,
                    }}
                  />
                </Box>
              </Flex>
              <Flex
                justifyContent={['center', 'flex-start']}
                alignItems="center"
                ml="0px"
                mt="-27px"
              >
                <Box width={[1, 0.7]} style={{ paddingTop: '0px', marginRight: '17px' }}>
                  <Input
                    onChange={handleReviewerCommentsChange2}
                    placeholder={'Comments'}
                    value={reviewerComments2}
                  />
                </Box>
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
            <SHField label="School" text={props.hacker.application.general.school} />
            <SHField label="Degree" text={props.hacker.application.general.degree} />
            <SHField label="Status" text={props.hacker.status} />
            <SHField label="ReviewerStatus" text={props.hacker.reviewerStatus} />
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
          <hr />
          {/* Team Members Section */}
          {props.hacker.teamId && (
            <>
              <H2 color={theme.colors.black60}>Team Members</H2>
              {isLoadingTeam ? (
                <Box>Loading team members...</Box>
              ) : teamMembers.length > 0 ? (
                <Flex
                  width="100%"
                  flexWrap="wrap"
                  flexDirection="column"
                  style={{ marginTop: '1em' }}
                >
                  {teamMembers.map((member: IMemberName) => {
                    const hackerPage = FrontendRoute.VIEW_HACKER_PAGE.replace(
                      ':id',
                      member.id
                    );
                    return (
                      <Box key={member.id} mb="10px">
                        <Link to={hackerPage} style={{ textDecoration: 'none' }}>
                          <Box
                            style={{
                              padding: '8px 12px',
                              border: `1px solid ${theme.colors.purpleLight}`,
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e: any) => {
                              e.currentTarget.style.backgroundColor =
                                theme.colors.purpleLight;
                            }}
                            onMouseLeave={(e: any) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <strong>
                              {member.firstName} {member.lastName}
                            </strong>
                            {member.school && (
                              <Box style={{ fontSize: '14px', color: theme.colors.black60 }}>
                                {member.school}
                              </Box>
                            )}
                          </Box>
                        </Link>
                      </Box>
                    );
                  })}
                </Flex>
              ) : (
                <Box>No other team members found.</Box>
              )}
              <hr />
            </>
          )}
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
