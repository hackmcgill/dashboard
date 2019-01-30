import { object, string } from 'yup';

const getValidationSchema = () => {
  return object().shape({
    company: string().required('Required'),
  });
};

export default getValidationSchema;
