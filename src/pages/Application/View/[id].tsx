import SingleHackerContainer from '../../../features/SingleHacker/Main';
import withNavbar from '../../../shared/HOC/withNavbar';
import withAuthRedirect from '../../../shared/HOC/withAuthRedirect';
import { userCanAccessHackerPage } from '../../../util';

export default withNavbar(
  withAuthRedirect(SingleHackerContainer, {
    requiredAuthState: true,
    redirAfterLogin: true,
    AuthVerification: userCanAccessHackerPage,
  })
);
