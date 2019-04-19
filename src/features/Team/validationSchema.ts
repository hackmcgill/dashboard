import { object, string } from 'yup';

const getValidationSchema = () => {
  return object().shape({
    name: string().required('Required'),
  });
};

export default getValidationSchema;
