import { object, string } from 'yup';

export const getValidationSchema = () => {
  return object().shape({
    email: string().email('Must be a valid email.').required('Required'),
    accountType: string().required('Required'),
  });
};

export default getValidationSchema;
