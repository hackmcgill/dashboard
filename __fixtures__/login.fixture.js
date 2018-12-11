import loginComponent from "src/containers/login";
import withThemeProvider from 'src/hoc/withThemeProvider';

export default {
    component: withThemeProvider(loginComponent),
    props: {}
};
