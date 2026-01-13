import React, { useState, useEffect } from 'react';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as FormikElements from '../../shared/Form/FormikElements';
import { SubmitBtn } from '../../shared/Form';
import styled from 'styled-components';
import { submitCheckin } from '../../api/checkin';
import { Hacker } from '../../api';

import { PrizeCategories, SponsorChallenges, Workshops, FrontendRoute } from '../../config';
import { getOptionsFromEnum } from '../../util';
import { Button, ButtonVariant, MaxWidthBox } from '../../shared/Elements';

const StyledForm = styled(Form).attrs({
  placeholder: undefined
})`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TeamCheckinForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasTeam, setHasTeam] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has a team
    const checkTeam = async () => {
      try {
        const response = await Hacker.getSelf();
        const hacker = response.data.data;
        setHasTeam(!!hacker.teamId);
      } catch (error) {
        console.error('Failed to fetch hacker info:', error);
        setHasTeam(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkTeam();
  }, []);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      await submitCheckin(values);
      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      setSubmitError('Failed to submit check-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  if (!hasTeam) {
    return (
      <MaxWidthBox 
        maxWidth="600px"
        m="0 auto"
        style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffc107', 
          borderRadius: '8px', 
          padding: '20px', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h3 style={{ color: '#856404', marginTop: 0 }}>Team Required</h3>
        <p style={{ color: '#856404' }}>
          You must create or join a team before accessing this form.
        </p>
        <p style={{ color: '#856404' }}>
          <strong>Solo hackers:</strong> You may create a team with just yourself.
        </p>
        <Button
          variant={ButtonVariant.Primary}
          as="a"
          href={FrontendRoute.TEAM_PAGE}
          style={{ 
            marginTop: '15px',
            paddingTop: '10px',
            paddingBottom: '10px',
            minHeight: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Go to Team Page
        </Button>
      </MaxWidthBox>
    );
  }

  return (
    <Formik
      initialValues={{
        prizeCategories: [],
        sponsorChallenges: [],
        // workshopsAttended: [],
        discordTag: '',
        devpostLink: ''
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.prizeCategories || values.prizeCategories.length === 0) {
          errors.prizeCategories = 'Required';
        }
        if (!values.discordTag) {
          errors.discordTag = 'Required';
        }
        if (!values.devpostLink) {
          errors.devpostLink = 'Required';
        } else {
          try {
            const url = new URL(values.devpostLink);
            if (url.hostname !== 'devpost.com') {
              errors.devpostLink = 'Please enter a valid Devpost URL';
            }
          } catch (e) {
            errors.devpostLink = 'Please enter a valid Devpost URL';
          }
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {(fp) => (
        <StyledForm>

          <FastField
            name="prizeCategories"
            label={<>
              Which McHacks categories does your team plan to submit for? <br/>
              All projects are automatically eligible for People’s Choice and Top 3 Hacks. <br/>
              (Choose up to 3) *
            </>}
            component={FormikElements.Select}
            isMulti={true}
            maxSelections={3}
            options={getOptionsFromEnum(PrizeCategories)}
            required={true}
            value={fp.values.prizeCategories}
          >

          </FastField>
          <ErrorMessage component={FormikElements.Error} name="prizeCategories" />

          <FastField
            name="sponsorChallenges"
            label={<>
              Which sponsor challenge(s) does your team plan to submit for? <br/>
              (Choose up to 5)
            </>}
            options={getOptionsFromEnum(SponsorChallenges)}
            component={FormikElements.Select}
            maxSelections={5}
            isMulti={true}
            value={fp.values.sponsorChallenges}
          >

          </FastField>
          <ErrorMessage component={FormikElements.Error} name="sponsorChallenges" />

          {/* <FastField
            name="workshopsAttended"
            label="What workshops have you and your team attended?"
            component={FormikElements.Select}
            isMulti={true}
            options={getOptionsFromEnum(Workshops)}
            value={fp.values.workshopsAttended}
          >

          </FastField>
          <ErrorMessage component={FormikElements.Error} name="workshopsAttended" /> */}

          <FastField
            name="discordTag"
            label={<>
              Discord tag of the main point of contact for your team <br/> (e.g. JaneDoe#1234) *
            </>}
            component={FormikElements.Input}
            required={true}
            value={fp.values.discordTag}
          >

          </FastField>
          <ErrorMessage component={FormikElements.Error} name="discordTag" />

          <FastField
            name="devpostLink"
            label={<>
              Devpost Draft Link <br/> (Must start with https://devpost.com) *
            </>}
            component={FormikElements.Input}
            required={true}
            value={fp.values.devpostLink}
          >

          </FastField>
          <ErrorMessage component={FormikElements.Error} name="devpostLink" />

          <SubmitBtn disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </SubmitBtn>
          {submitError && <div style={{ color: 'red', marginBottom: '1rem' }}>{submitError}</div>}
          {submitSuccess && <div style={{ color: 'green', marginBottom: '1rem' }}>✓ Check-in submitted successfully!</div>}
        </StyledForm>
      )}
    </Formik>
  );
};

export default TeamCheckinForm;
