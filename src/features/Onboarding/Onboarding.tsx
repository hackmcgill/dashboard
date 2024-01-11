import * as React from 'react';
import Helmet from 'react-helmet';
import DiscordOnboarding from './DiscordOnboarding';
import GeneralOnboarding from './GeneralOnboarding';
import NavContainer from './NavContainer';
import NavLink from './NavLink';
import Nav from './OnboardingNav';

import * as CONSTANTS from '../../config/constants';

export default class OnboardingContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeSection: 'general',
    };
  }

  public async componentDidMount() {
    document.addEventListener('scroll', () => {
      this.setState({ scrollY: window.pageYOffset });
    });
  }

  public render() {
    return (
      <>
        <Helmet>
          <title>Onboarding | {CONSTANTS.HACKATHON_NAME}</title>
        </Helmet>

        <Nav>
          <NavContainer>
            <NavLink
              className={this.state.activeSection === 'general' ? 'active' : ''}
              onClick={() => this.setState({ activeSection: 'general' })}
            >
              General Onboarding
            </NavLink>
            <NavLink
              className={this.state.activeSection === 'discord' ? 'active' : ''}
              onClick={() => this.setState({ activeSection: 'discord' })}
            >
              Discord Onboarding
            </NavLink>
          </NavContainer>
        </Nav>

        {this.state.activeSection === 'general' ? (
          <>
            <GeneralOnboarding />
          </>
        ) : null}

        {this.state.activeSection === 'discord' ? (
          <>
            <DiscordOnboarding />
          </>
        ) : null}
      </>
    );
  }
}
