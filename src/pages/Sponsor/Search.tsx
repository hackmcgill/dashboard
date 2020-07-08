import SearchContainer from '../../features/Search/Search';
import withNavbar from '../../shared/HOC/withNavbar';
import withAuthRedirect from '../../shared/HOC/withAuthRedirect';
import { IAccount } from '../../config';
import { isSponsor } from '../../util';

export default withNavbar(
  withAuthRedirect(SearchContainer, {
    requiredAuthState: true,
    redirAfterLogin: true,
    AuthVerification: (user: IAccount) => user.confirmed && isSponsor(user),
  }),
  { activePage: 'search' }
);
