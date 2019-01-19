import { object, string, array } from "yup";

const getValidationSchema = () => {
    return object().shape({
        company: string().required('Required'),
        contractURL: string().url('Must be a valid url').required('Required'),
        nominees: array()
    })
}

export default getValidationSchema;
