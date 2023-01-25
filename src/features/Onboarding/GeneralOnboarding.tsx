import React from 'react';
import { LinkDuo } from '../../shared/Elements';
import Text from './Text';
import Container from './Container';
import Content from './Content';

const GeneralOnboarding: React.FC = () => (
  <>
    <Container>
      <Content>
        <Text>
          <h2>Introduction</h2>
          <p>
            Hey there, sponsor! We’re looking forward to seeing you for round
            ten of McHacks, Canada’s original collegiate hackathon, on{' '}
            <b>January 28th! </b>
            Before the event, we’d like to offer you a pre-event outline of what
            to expect on the day-of.
            <br />
            <br />
            On the dashboard, you can find information about check-in, sponsors'
            space, mentorship, event schedule, as well as some tips to make the
            most out of McHacks.
            <br />
            <br />
            For a sponsor specific schedule, you can find it{' '}
            <LinkDuo to="https://docs.google.com/document/d/1ClrMBzOffam8vU00YCq_YPFAVaYFnBKR0CEILWQsirg/edit?usp=sharing">
              here
            </LinkDuo>
            . We will be updating it as we continue receiving information from
            our sponsors regarding workshop times and other details.
          </p>
          <h2>Check-In</h2>
          <p>
            To initiate the check-in process, you first need to join our
            Discord. we recommend that you read our Discord Onboarding Guide
            first if you don’t know what Discord is. Once you are ready, join
            the channel by clicking
            <LinkDuo to="https://discord.com/invite/6W25XWfHUr">
              <span> this link. </span>
            </LinkDuo>
            <br />
            <br />
            When you join our Discord, please send a message to Andrew Kan on
            Discord with your name, company, and role so we can add you to the
            channel we will communicate with you on.
            <br />
            <br />
            On January 28th, sponsor check-in will start at <b>8:00 a.m. </b>.
            Once you have logged onto Discord, message your coordinator
            to let them know you are ready to go! We ask you to check-in at
            least 15 minutes before opening ceremonies at at <b>10:00 a.m. </b>
            We also ask you to fill up the sponsor{' '}
            <LinkDuo to="https://forms.gle/mdsimQyWJG83vYDZ8">
              <span>check-in form</span>
            </LinkDuo>.
            <br />
            <br />
            If you are scheduled to speak during the opening ceremony,
            please email <b>sponsor@mchacks.ca</b> with your slides or video. If you are unable to provide a video, please let your coordinator
            know for accommodations.
          </p>
          <h2>Sponsors</h2>
          <p>
            This year, our sponsors with recruiter passes will have their own tables.
            This is where you can interact with hackers and
            showcase your products! Make sure you have access to social media so
            that you can share your weekend with our audience and yours! There
            are two important times we ask you to be present:
            <br />
            <br />
            <b>1. Tabling, Saturday 12:00pm-5:00pm:</b> Only applicable to
            sponsors with tabling in their package. This is your designated
            sponsor booth slot. All hackers will know that you will be in-person
            and available at this time, so they will drop by to chat with
            you!
            <br />
            <br />
            <b>2. Speed Networking, Saturday 5:00pm-7:00pm:</b> Only applicable
            to sponsors with speed networking in their package. If you would
            like to participate and you haven’t let your coordinator know,
            please do so as soon as possible.
            <br />
            <br />
            If you would like to add additional sponsors booth time outside of
            the slot reserved above, please let your coordinator know. This way,
            we can enter it into the schedule for all hackers to see.
          </p>
          <h2>Engineers and Designers</h2>
          <p>
            If you are sending engineers and designers, they will be{' '}
            <b>mentors</b>, and the entire venue is at their disposal. Mentors
            are free to roam around hacking spaces and interact with hackers as
            much as possible throughout the weekend. There will also be a mentor
            space where hackers can go themselves and find mentors.
            <br />
            <br />
            Here is an important time we ask mentors to be available:
            <br />
            <b>Saturday, 10:00am-12:00pm.</b>
            <br />
            However, as hackers always need a helping hand, mentors are more
            than welcome to come and go throughout the event!
            <br />
            <br />
            We will be integrating mentorship requests into our Discord. Mentors
            will be able to see the various tickets flagged by hackers who are
            experiencing difficulties with their hacks.
          </p>
          <h2>Judging</h2>
          <p>
            The judges will consist of McGill Computer Science professors,
            HackMcGill alumni, eligible sponsors and members of the local tech
            community. Judges will evaluate projects on various criteria
            (technical aspects, creativity, and marketability) to select the top
            3 teams. Then, teams will demo their hacks at closing ceremonies to
            determine our champions.
            <br />
            <br />
            If you are offering a <b>custom prize</b>, you will have the
            opportunity to speak about it during opening ceremonies (if stage
            time is included in your package) and we will provide you with your
            winner's list containing contact information for prize distribution.
            You will also be judging for the prize and are responsible for
            creating a judging criteria.
            <br />
            <br />
            If you are interested in judging the other prizes and haven’t told
            your coordinator, please do so as we have a judging workshop on
            Sunday at <b>9:00a.m.</b> or <b>10:30a.m.</b> that is mandatory.
          </p>
          <h2>Workshops {'&'} Mini Events</h2>
          If you are hosting a workshop or mini-event, they will be held
          starting immediately after opening ceremonies and all day Saturday. If
          there is specific software hackers need to download, or any other
          tasks hackers should do before attending your workshop, let us know so
          that we can include that in your workshop description. We encourage
          bringing mentors to help during and after the workshop so hackers can
          explore their new skills with friendly faces around to assist them.
          <h2>Communication</h2>
          <p>
            For the weekend of McHacks, we will be using Discord as the primary
            means of communication between hackers, organizers, volunteers, and
            of course, sponsors!
            <br />
            <br />
            All members of the organizing committee will have their names on
            Discord as
            {'“{Name} (Organizer)”'}. Your primary point of communication
            throughout the event should be your coordinator through your hb-
            {'{sponsor}'} channel.
            <br />
            <br />
            In the event of an emergency, <b>contact</b> the co-directors Jenny
            (+1 905-621-6698) or Elisa (+1 705-790-8412). Please also contact
            any organizer for immediate assistance.
          </p>
        </Text>
      </Content>
    </Container>
  </>
);

export default GeneralOnboarding;
