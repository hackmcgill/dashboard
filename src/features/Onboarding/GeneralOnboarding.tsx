import React from 'react';
import { LinkDuo } from '../../shared/Elements';
import Container from './Container';
import Content from './Content';
import Text from './Text';

const GeneralOnboarding: React.FC = () => (
  <>
    <Container>
      <Content>
        <Text>
          <h2>Introduction</h2>
          <p>
            Hey there sponsor! We are looking forward to seeing you for the 13th edition of McHacks, Canada’s original collegiate hackathon, on {' '}
            <b>January 17-18th!</b> Before the event, we’d like to give you a pre-event outline of what to expect the day-of. 
            <br />
On this dashboard you can find information about check-in, sponsors’ spaces, event schedule, timings relevant to you, as well as tips to make the most out of McHacks.

          </p>
          <h2>Check-In</h2>
          <p>
            To initiate the check-in process, you first need to join our Discord. We recommend that you reach out to your sponsor liaison if you aren’t familiar with Discord. Once you are ready, you can join the channel by using the link on your sponsor on-boarding document. Once you join the server please rename yourself as [Name][Company]
            <br />
            <br />
            When you join our Discord, please send a message to your sponsor liaison with your name, company and role so we can add you to the channel we will communicate with you on. For the weekend of McHacks, we will be using Discord as the primary means of communication between hackers, organizers, volunteers, and of course, sponsors! 

            
            <br />
            At the event, you will be able to drop your things off and if need be take a breather in Room 403 which will be reserved for our sponsors, mentors and judges. 

            <br />
            <br />
            All members of the organizing committee will have their names on Discord as [M13][Name][Position] and their names will be highlighted in red. Your primary point of communication throughout the event should be your coordinator through your #[sponsor]-org channel. You may also locate members of the hackboard on-site identified by Maroon T-shirts. 

          </p>
          <h2>Venue</h2>
          <p>
            McHacks 13 will take place at the SSMU Building on McGill University’s downtown campus. 
            <br />
            Address: <a href="https://www.google.com/maps/place/University+Centre+(Students%E2%80%99+Society+of+McGill+University+Building)/@45.5035502,-73.5807236,16z/data=!3m2!4b1!5s0x4cc91a47430313dd:0x7bf87daa7d951af9!4m6!3m5!1s0x4cc91a38a037e75b:0x685436ea760f347f!8m2!3d45.5035465!4d-73.5781433!16s%2Fg%2F11b6__mrpy?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D">3480 Rue McTavish, Montréal, QC H3A 0G3</a>
          </p>
          <h2>Schedule</h2>
          <p>
           TBA
          </p>

          <h2>Sponsor Dashboard</h2>
          This sponsor dashboard includes onboarding information and participant info, which can be found on the “Search” page in the menu above. On that page, you can view all our applicants and participants, as well as their resumes and Devpost project submission links (available after the event). If you have any questions about this dashboard, please reach out to Tavi (Development Lead) on Discord or your sponsor liaison.

          <h2>Closing Remarks</h2>
          <p>
            Thank you for sponsoring McHacks 13, our event would not be the same without you. We truly appreciate your support and contribution to making this event a meaningful experience for our participants. 
            <br />
            <br />
            If you have any questions/concerns please do not hesitate to reach out to your sponsor liaison or any member of the organizing team. We hope this event is as memorable for you as it will be for us. Looking forward to seeing you this weekend!
          </p>
        </Text>
      </Content>
    </Container>
  </>
);

export default GeneralOnboarding;
