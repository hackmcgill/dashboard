import { object, string } from 'yup';

const getValidationSchema = (isCreate: boolean) => {
  const password = isCreate
    ? string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
    : string().when('newPassword', {
        is: (pass) => pass,
        then: string().required('Required to change password'),
        otherwise: string(),
      });
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return object().shape({
    firstName: string().required('Required'),
    lastName: string().required('Required'),
    email: string()
      .required('Required')
      .email('Must be a valid email'),
    password,
    newPassword: string().min(8, 'Must be at least 8 characters'),
    dietaryRestrictions: string(),
    pronoun: string(),
    shirtSize: string().required('Required'),
    phoneNumber: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    birthDate: string()
      .test('validDate', 'Must be valid date', (value) => {
        if (!value || value.length !== 8) {
          return false;
        } else {
          // Assume MMDDYYYY
          const month = parseInt(value.substr(0, 2), 10);
          const day = parseInt(value.substr(2, 2), 10);
          const year = parseInt(value.substr(4, 4), 10);
          return month <= 12 && day <= 31 && year >= 1901 && year <= 2018;
        }
      })
      .required('Required'),
  });
};

export default getValidationSchema;
