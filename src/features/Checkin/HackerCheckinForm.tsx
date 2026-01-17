import React, { useState } from 'react';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as FormikElements from '../../shared/Form/FormikElements';
import { SubmitBtn } from '../../shared/Form';
import styled from 'styled-components';
import { submitCheckin } from '../../api/checkin';

import { PrizeCategories, SponsorChallenges, Workshops } from '../../config';
import { getOptionsFromEnum } from '../../util';

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

const HackerCheckinForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      console.log(values);
      await submitCheckin(values);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Failed to submit check-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        teamMember1: '',
        teamMember2: '',
        teamMember3: '',
        teamMember4: '',
        prizeCategories: [],
        sponsorChallenges: [],
        workshopsAttended: []
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.teamMember1) {
          errors.teamMember1 = 'Required';
        }
        if (!values.prizeCategories || values.prizeCategories.length === 0) {
          errors.prizeCategories = 'Required';
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {(fp) => (
        <StyledForm>
          <h2>Hacker Check-In Form</h2>
          <FastField
            name="teamMember1"
            label="Team Member 1 *"
            component={FormikElements.Input}
            required={true}
            value={fp.values.teamMember1}
          />
          <ErrorMessage component={FormikElements.Error} name="teamMember1" />

          <FastField
            name="teamMember2"
            label="Team Member 2"
            component={FormikElements.Input}
            value={fp.values.teamMember2}
          />
          <ErrorMessage component={FormikElements.Error} name="teamMember2" />

          <FastField
            name="teamMember3"
            label="Team Member 3"
            component={FormikElements.Input}
            value={fp.values.teamMember3}
          />
          <ErrorMessage component={FormikElements.Error} name="teamMember3" />

          <FastField
            name="teamMember4"
            label="Team Member 4"
            component={FormikElements.Input}
            value={fp.values.teamMember4}
          />
          <ErrorMessage component={FormikElements.Error} name="teamMember4" />

          <FastField
            name="prizeCategories"
            label="Which McHacks categories does your team plan to submit to? Note that all projects are entered into 'People's Choice' and 'Top 3 Hacks' automatically. Choose up to 3 options only. *"
            component={FormikElements.Select}
            isMulti={true}
            options={getOptionsFromEnum(PrizeCategories)}
            required={true}
            value={fp.values.prizeCategories}
          >
            
          </FastField>
          <ErrorMessage component={FormikElements.Error} name="prizeCategories" />

          <FastField
            name="sponsorChallenges"
            label="What sponsor challenge(s) does your team plan to submit to?"
            options={getOptionsFromEnum(SponsorChallenges)}
            component={FormikElements.Select}
            isMulti={true}
            value={fp.values.sponsorChallenges}
          >
            
          </FastField>
          <ErrorMessage component={FormikElements.Error} name="sponsorChallenges" />

          <FastField
            name="workshopsAttended"
            label="What workshops have you and your team attended?"
            component={FormikElements.Select}
            isMulti={true}
            options={getOptionsFromEnum(Workshops)}
            value={fp.values.workshopsAttended}
          >
            
          </FastField>
          <ErrorMessage component={FormikElements.Error} name="workshopsAttended" />

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

export default HackerCheckinForm;
