import { array, boolean, mixed, number, object, string } from 'yup';

const getValidationSchema = (isCreate: boolean) => {
  const resumeSchema = isCreate
    ? mixed().required('A resume is required')
    : mixed();
  return object().shape({
    school: string()
      .min(1, 'Select a school')
      .required('Required'),
    degree: string().required(),
    application: object().shape({
      portfolioURL: object().shape({
        github: string().url('Must be a valid url'),
        dropler: string().url('Must be a valid url'),
        linkedIn: string().url('Must be a valid url'),
        personal: string().url('Must be a valid url'),
        other: string().url('Must be a valid url'),
      }),
      jobInterest: string().required(),
      essay: string()
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
    resumeFile: resumeSchema
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
    ethnicity: array().required('Required'),
    major: string().required('Required'),
    graduationYear: number()
      .required('Required')
      .min(2018)
      .max(2025),
    codeOfConduct_MLH: boolean()
      .required('Required')
      .test('true', 'You must accept the MLH policies', (value) => value),
    codeOfConduct_MCHACKS: boolean()
      .required('Required')
      .test('true', 'You must accept the McHacks policies', (value) => value),
  });
};

export default getValidationSchema;
