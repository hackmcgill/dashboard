import SearchContainer from '../../features/Search/Search';
import withNavbar from '../../shared/HOC/withNavbar';
import withAuthRedirect from '../../shared/HOC/withAuthRedirect';
import { IAccount, UserType } from '../../config';

export default withNavbar(
  withAuthRedirect(SearchContainer, {
    requiredAuthState: true,
    redirAfterLogin: true,
    AuthVerification: (user: IAccount) =>
      user.confirmed && user.accountType === UserType.STAFF,
  }),
  { activePage: 'search' }
);
