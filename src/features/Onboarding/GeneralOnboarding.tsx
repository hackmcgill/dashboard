import React from 'react';
import { LinkDuo } from '../../shared/Elements';
import Text from "./Text";
import Container from './Container';
import Content from './Content';

const GeneralOnboarding: React.FC = () => (
    <>
        <Container>
            <Content>
                <Text>
                <h2>Introduction</h2>
                <p>
                    Hey there, sponsor! We’re looking forward to seeing you for round eight 
                    of McHacks, Canada’s original collegiate hackathon, on <b>January 29th! </b> 
                    Before the event, we’d like to offer you a pre-event outline of what 
                    to expect on the day-of.
                    <br></br>
                    <br></br>
                    On the dashboard, you can find information about check-in, sponsors' space, 
                    mentorship, event schedule, as well as some tips to make the most out of McHacks.
                </p>
                <h2>Check-In</h2>
                <p>
                    When you join our Discord, please send a message to your coordinator on Discord 
                    with your name, company, and role so we can add you to the channel we will 
                    communicate with you on.
                    <br></br>
                    <br></br>
                    On the day of, sponsor check-in will start at <b>6:00 p.m. </b>on Discord. Please 
                    check in with your coordinator when you arrive.
                    <br></br>
                    <br></br>
                    If part of your package involves speaking at the opening ceremonies, please ensure 
                    your video is uploaded to{" "}
                    <LinkDuo to="https://docs.google.com/forms/d/e/1FAIpQLSfNpGJqIaWfaK7uJIZk0vq-ia3wZksEnnem0GPz3M6tutQ0aQ/viewform">
                        <span>this form</span>
                    </LinkDuo>
                    . If you are unable to provide a video, please 
                    let your coordinator know for accommodations.
                </p>
                <h2>Sponsors</h2>
                <p>
                    This year, our sponsors with recruiter passes will have their own Discord 
                    channels. This is where you can interact with hackers, showcase your 
                    products, and distribute swag. Make sure you have access to social media 
                    so that you can share your weekend with our audience and yours!
                    <br></br>
                    In addition, this year we will be holding a speed networking session on 
                    Saturday from 1:00pm-3:00pm. If you would like to participate and haven’t 
                    let your coordinator know, please confirm your recruiters as soon as possible.
                    <br></br>
                    <br></br>
                    The event will run from Friday, January 29th at 7:00 p.m. to Sunday, January 31st 
                    at 9:00 a.m. We’ve found that hackers are most eager to chat up sponsors on Saturday 
                    between noon and 6:00 p.m., so try to have as many company representatives as 
                    possible present during these hours.
                    <br></br>
                    <br></br>
                    We ask that each individual representative fill out the{" "}
                    <LinkDuo to="https://docs.google.com/forms/d/e/1FAIpQLScsDpuCxaFJnV7DBSGuIDjEHKhbAe2dH7O9bBZ180FKOzPb1Q/viewform?usp=sf_link">
                        <span>sponsor representative form</span>
                    </LinkDuo>
                    {" "}if you haven’t already to help us stay connected for the hackathon.
                </p>
                <h2>Engineers and Designers</h2>
                <p>
                    If you are sending engineers and designers, they will be{" "}
                    <b>mentors</b>, and the entire venue is at their disposal. Mentors are
                    free to roam around hacking spaces and interact with hackers as much
                    as possible throughout the weekend. There will also be a mentor space
                    where hackers can go themselves and find mentors.
                    <br></br>
                    <br></br>
                    In the{" "}
                    <LinkDuo to="https://docs.google.com/forms/d/e/1FAIpQLScsDpuCxaFJnV7DBSGuIDjEHKhbAe2dH7O9bBZ180FKOzPb1Q/viewform?usp=sf_link">
                        <span>sponsor representative form</span>
                    </LinkDuo>
                    , mentors will be able to submit a quick bio outlining their areas of
                    expertise and general areas of interest. We will be integrating
                    mentorship requests into our slack and this information will help us
                    connect them to hackers who will benefit the most.
                </p>
                <h2>Judging</h2>
                <p>
                    The judges will consist of McGill Computer Science professors, 
                    HackMcGill alumni, eligible sponsors and members of the local tech 
                    community. Judges will evaluate projects on various criteria (technical 
                    aspects, creativity, and marketability) to select the top 3 teams. Then, 
                    teams will demo their hacks at closing ceremonies to determine our champions.
                    <br></br>
                    <br></br>
                    If you are offering a <b>custom prize</b>, you will have the opportunity to speak 
                    about it during opening ceremonies (if stage time is included in your package) and 
                    we will provide you with your winner's list containing contact information for prize 
                    distribution. You will also be judging for the prize and are responsible for creating 
                    a judging criteria.
                </p>
                <h2>Workshops {"&"} Mini Events</h2>
                If you are hosting a workshop or mini-event, they will be held starting immediately after 
                opening ceremonies and all day Saturday. If there is specific software hackers need to 
                download, or any other tasks hackers should do before attending your workshop, let us know 
                so that we can include that in your workshop description. We encourage bringing mentors to 
                help during and after the workshop so hackers can explore their new skills with friendly 
                faces around to assist them.
                <h2>Communication</h2>
                <p>
                    For the weekend of McHacks, we will be using Discord as the primary means of 
                    communication between hackers, organizers, volunteers, and of course, sponsors! 
                    Once each of your representatives has filled out the{" "}
                    <LinkDuo to="https://docs.google.com/forms/d/e/1FAIpQLScsDpuCxaFJnV7DBSGuIDjEHKhbAe2dH7O9bBZ180FKOzPb1Q/viewform?usp=sf_link">
                        <span>sponsor representative form</span>
                    </LinkDuo>
                    , they will be invited to join. More information on Discord can be found on our Sponsor 
                    Discord Guide.
                    <br></br>
                    <br></br>
                    All members of the organizing committee will have their names on Discord as 
                    {'“{Name} (Organizer)”'}. Your primary point of communication throughout the event 
                    should be your coordinator through your hb-{'{sponsor}'} channel.
                    <br></br>
                    <br></br>
                    In the event of an emergency, <b>contact</b> the co-directors Elisa 
                    ( +1 705 790-8412 ) or Idil ( +1 514 409 7463 ) for assistance. 
                    Please also contact any organizer for immediate assistance.

                </p>
                </Text>
            </Content>
        </Container>
    </>
);

export default GeneralOnboarding;