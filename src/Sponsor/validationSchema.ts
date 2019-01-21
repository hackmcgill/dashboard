import { object, string } from "yup";

const getValidationSchema = () => {
  return object().shape({
    company: string().required('Required'),
    contractURL: string().url('Must be a valid url').required('Required'),
  })
}

export default getValidationSchema;
