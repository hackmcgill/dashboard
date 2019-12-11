import { array, boolean, mixed, number, object, string } from 'yup';

const getValidationSchema = (isCreate: boolean) => {
  const resumeSchema = isCreate
    ? mixed().required('A resume is required')
    : mixed();
  return object().shape({
    application: object().shape({
      general: object().shape({
        school: string()
          .min(1, 'Select a school')
          .required('Required'),
        degree: string().required('Required'),
        fieldOfStudy: string().required('Required'),
        graduationYear: number()
          .required('Required')
          .min(2018)
          .max(2025),
        jobInterest: string().required('Required'),
        URL: object().shape({
          resume: resumeSchema
            .test(
              'fileSize',
              'File too large (<4MB only)',
              (value) => !value || value.size <= 4000000 // 4MB
            )
            .test(
              'fileFormat',
              'Unsupported Format (PDF only)',
              (value) => !value || value.type === 'application/pdf'
            ),
          github: string().url('Must be a valid url'),
          dribbble: string().url('Must be a valid url'),
          linkedIn: string().url('Must be a valid url'),
          personal: string().url('Must be a valid url'),
          other: string().url('Must be a valid url'),
        }),
      }),
      shortAnswer: object().shape({
        question1: string()
          .required('Required')
          .test(
            'length',
            'At most 2000 characters',
            (value) => value && value.length < 2000
          ),
        question2: string()
          .required('Required')
          .test(
            'length',
            'At most 2000 characters',
            (value) => value && value.length < 2000
          ),
        comments: string().test(
          'length',
          'At most 500 characters',
          (value) => !value || value.length < 500
        ),
      }),
      other: object().shape({
        ethnicity: array().required('Required'),
        privacyPolicy: boolean()
          .required('Required')
          .test('true', 'You must accept the MLH policies', (value) => value),
        codeOfConduct: boolean()
          .required('Required')
          .test(
            'true',
            'You must accept the McHacks policies',
            (value) => value
          ),
      }),
      accommodation: object().shape({
        dietaryRestrictions: string().required('Required'),
        shirtSize: string().required('Required'),
      }),
    }),
  });
};

export default getValidationSchema;
