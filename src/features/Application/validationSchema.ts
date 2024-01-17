import { array, boolean, mixed, number, object, string } from 'yup';

const getValidationSchema = (isCreate: boolean, pageNumber: number) => {
  const resumeSchema = isCreate
    ? mixed().required('A resume is required')
    : mixed();
  switch (pageNumber) {
    case 1:
      return object().shape({
        hacker: object().shape({
          application: object().shape({
            general: object().shape({
              school: string().min(1, 'Select a school').required('Required'),
              degree: string().required('Required'),
              fieldOfStudy: array().of(string()).required('Required'),
              graduationYear: number()
                .typeError('Required')
                .required('Required')
                .min(2024, 'Graduation year must be 2024 or later')
                .max(2030, 'Graduation year must be between 2024 and 2030'),
            }),
          }),
        }),
      });

    case 2:
      return object().shape({
        hacker: object().shape({
          application: object().shape({
            general: object().shape({
              school: string().min(1, 'Select a school').required('Required'),
              degree: string().required('Required'),
              fieldOfStudy: array().of(string()).required('Required'),
              graduationYear: number()
                .typeError('Required')
                .required('Required')
                .min(2024, 'Graduation year must be 2024 or later')
                .max(2030, 'Graduation year must be between 2024 and 2030'),
              jobInterest: string().required('Required'),
              URL: object().shape({
                resume: string(),
                github: string()
                  .url('Must be a valid URL')
                  .matches(/github.com\/\w+/, {
                    message: 'Must be a valid Github URL',
                    excludeEmptyString: true,
                  }),
                dribbble: string()
                  .url('Must be a valid URL')
                  .matches(/dribbble.com\/\w+/, {
                    message: 'Must be a valid Dribbble URL',
                    excludeEmptyString: true,
                  }),
                linkedIn: string()
                  .url('Must be a valid URL')
                  .matches(/linkedin.com\/in\/\w+/, {
                    message: 'Must be a valid LinkedIn URL',
                    excludeEmptyString: true,
                  }),
                personal: string().url('Must be a valid URL'),
                other: string().url('Must be a valid URL'),
              }),
            }),
            accommodation: object().shape({
              attendancePreference: string().required('Required'),
            }),
            other: object().shape({
              ethnicity: array().required('Required'),
            }),
          }),
        }),
        resume: resumeSchema
          .test(
            'fileSize',
            'File too large (<4MB only)',
            (value: any) => !value || value.length > 0 || value.size <= 4000000 // 4MB
          )
          .test(
            'fileFormat',
            'Unsupported Format (PDF only)',
            (value: any) =>
              !value || value.length > 0 || value.type === 'application/pdf'
          ),
      });
    case 3:
      return object().shape({
        hacker: object().shape({
          application: object().shape({
            general: object().shape({
              school: string().min(1, 'Select a school').required('Required'),
              degree: string().required('Required'),
              fieldOfStudy: array().of(string()).required('Required'),
              graduationYear: number()
                .typeError('Required')
                .required('Required')
                .min(2024, 'Graduation year must be 2024 or later')
                .max(2030, 'Graduation year must be between 2024 and 2030'),
              jobInterest: string().required('Required'),
              URL: object().shape({
                resume: string(),
                github: string()
                  .url('Must be a valid URL')
                  .matches(/github.com\/\w+/, {
                    message: 'Must be a valid Github URL',
                    excludeEmptyString: true,
                  }),
                dribbble: string()
                  .url('Must be a valid URL')
                  .matches(/dribbble.com\/\w+/, {
                    message: 'Must be a valid Dribbble URL',
                    excludeEmptyString: true,
                  }),
                linkedIn: string()
                  .url('Must be a valid URL')
                  .matches(/linkedin.com\/in\/\w+/, {
                    message: 'Must be a valid LinkedIn URL',
                    excludeEmptyString: true,
                  }),
                personal: string().url('Must be a valid URL'),
                other: string().url('Must be a valid URL'),
              }),
            }),
            shortAnswer: object().shape({
              previousHackathons: number()
                .typeError('Required')
                .required('Required')
                .min(0, 'Must be between at least 0')
                .max(5, 'Must be at most 5'),
              question1: string()
                .required('Required')
                .test(
                  'length',
                  'At most 2000 characters',
                  (value) => value.length <= 2000
                ),
              question2: string()
                .required('Required')
                .test(
                  'length',
                  'At most 2000 characters',
                  (value) => value.length <= 2000
                ),
              comments: string().test(
                'length',
                'At most 500 characters',
                (value) => !value || value.length < 500
              ),
            }),
            accommodation: object().shape({
              attendancePreference: string().required('Required'),
            }),
            other: object().shape({
              ethnicity: array().required('Required'),
            }),
          }),
        }),
        resume: resumeSchema
          .test(
            'fileSize',
            'File too large (<4MB only)',
            (value: any) => !value || value.length > 0 || value.size <= 4000000 // 4MB
          )
          .test(
            'fileFormat',
            'Unsupported Format (PDF only)',
            (value: any) =>
              !value || value.length > 0 || value.type === 'application/pdf'
          ),
      });
    case 4:
      return object().shape({
        hacker: object().shape({
          application: object().shape({
            general: object().shape({
              school: string().min(1, 'Select a school').required('Required'),
              degree: string().required('Required'),
              fieldOfStudy: array().of(string()).required('Required'),
              graduationYear: number()
                .typeError('Required')
                .required('Required')
                .min(2024, 'Graduation year must be 2024 or later')
                .max(2030, 'Graduation year must be between 2024 and 2030'),
              jobInterest: string().required('Required'),
              URL: object().shape({
                resume: string(),
                github: string()
                  .url('Must be a valid URL')
                  .matches(/github.com\/\w+/, {
                    message: 'Must be a valid Github URL',
                    excludeEmptyString: true,
                  }),
                dribbble: string()
                  .url('Must be a valid URL')
                  .matches(/dribbble.com\/\w+/, {
                    message: 'Must be a valid Dribbble URL',
                    excludeEmptyString: true,
                  }),
                linkedIn: string()
                  .url('Must be a valid URL')
                  .matches(/linkedin.com\/in\/\w+/, {
                    message: 'Must be a valid LinkedIn URL',
                    excludeEmptyString: true,
                  }),
                personal: string().url('Must be a valid URL'),
                other: string().url('Must be a valid URL'),
              }),
            }),
            shortAnswer: object().shape({
              previousHackathons: number()
                .typeError('Required')
                .required('Required')
                .min(0, 'Must be between at least 0')
                .max(5, 'Must be at most 5'),
              question1: string()
                .required('Required')
                .test(
                  'length',
                  'At most 2000 characters',
                  (value) => value.length <= 2000
                ),
              question2: string()
                .required('Required')
                .test(
                  'length',
                  'At most 2000 characters',
                  (value) => value.length <= 2000
                ),
              comments: string().test(
                'length',
                'At most 500 characters',
                (value) => !value || value.length < 500
              ),
            }),
            accommodation: object().shape({
              shirtSize: string().required('Required'),
              attendancePreference: string().required('Required'),
              impairments: string().test(
                'length',
                'At most 2000 characters',
                (value) => !value || value.length <= 2000
              ),
              barriers: string().test(
                'length',
                'At most 2000 characters',
                (value) => !value || value.length <= 2000
              ),
            }),
            other: object().shape({
              ethnicity: array().required('Required'),
            }),
          }),
        }),
        resume: resumeSchema
          .test(
            'fileSize',
            'File too large (<4MB only)',
            (value: any) => !value || value.length > 0 || value.size <= 4000000 // 4MB
          )
          .test(
            'fileFormat',
            'Unsupported Format (PDF only)',
            (value: any) =>
              !value || value.length > 0 || value.type === 'application/pdf'
          ),
      });
    default:
      return object().shape({
        hacker: object().shape({
          application: object().shape({
            general: object().shape({
              school: string().min(1, 'Select a school').required('Required'),
              degree: string().required('Required'),
              fieldOfStudy: array().of(string()).required('Required'),
              graduationYear: number()
                .typeError('Required')
                .required('Required')
                .min(2024, 'Graduation year must be 2024 or later')
                .max(2030, 'Graduation year must be between 2024 and 2030'),
              jobInterest: string().required('Required'),
              URL: object().shape({
                resume: string(),
                github: string()
                  .url('Must be a valid URL')
                  .matches(/github.com\/\w+/, {
                    message: 'Must be a valid Github URL',
                    excludeEmptyString: true,
                  }),
                dribbble: string()
                  .url('Must be a valid URL')
                  .matches(/dribbble.com\/\w+/, {
                    message: 'Must be a valid Dribbble URL',
                    excludeEmptyString: true,
                  }),
                linkedIn: string()
                  .url('Must be a valid URL')
                  .matches(/linkedin.com\/in\/\w+/, {
                    message: 'Must be a valid LinkedIn URL',
                    excludeEmptyString: true,
                  }),
                personal: string().url('Must be a valid URL'),
                other: string().url('Must be a valid URL'),
              }),
            }),
            shortAnswer: object().shape({
              previousHackathons: number()
                .typeError('Required')
                .required('Required')
                .min(0, 'Must be between at least 0')
                .max(5, 'Must be at most 5'),
              question1: string()
                .required('Required')
                .test(
                  'length',
                  'At most 2000 characters',
                  (value) => value.length <= 2000
                ),
              question2: string()
                .required('Required')
                .test(
                  'length',
                  'At most 2000 characters',
                  (value) => value.length <= 2000
                ),
              comments: string().test(
                'length',
                'At most 500 characters',
                (value) => !value || value.length < 500
              ),
            }),
            accommodation: object().shape({
              shirtSize: string().required('Required'),
              attendancePreference: string().required('Required'),
              impairments: string().test(
                'length',
                'At most 2000 characters',
                (value) => !value || value.length <= 2000
              ),
              barriers: string().test(
                'length',
                'At most 2000 characters',
                (value) => !value || value.length <= 2000
              ),
              travel: object().shape({
                amount: number()
                  .min(0, 'Must be non-negative')
                  .integer('Must be an integer')
                  .typeError('Must be a number'),
                reason: string().test(
                  'length',
                  'At most 2000 characters',
                  (value) => !value || value.length <= 2000
                ),
              }),
            }),
            other: object().shape({
              ethnicity: array().required('Required'),
              privacyPolicy: boolean()
                .required('Required')
                .test(
                  'true',
                  'You must accept the MLH policies',
                  (value) => value
                ),
              codeOfConduct: boolean()
                .required('Required')
                .test(
                  'true',
                  'You must accept the McHacks policies',
                  (value) => value
                ),
            }),
          }),
        }),
        resume: resumeSchema
          .test(
            'fileSize',
            'File too large (<4MB only)',
            (value: any) => !value || value.length > 0 || value.size <= 4000000 // 4MB
          )
          .test(
            'fileFormat',
            'Unsupported Format (PDF only)',
            (value: any) =>
              !value || value.length > 0 || value.type === 'application/pdf'
          ),
      });
  }
};

export default getValidationSchema;
