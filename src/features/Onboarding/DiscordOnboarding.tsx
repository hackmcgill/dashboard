import React from 'react';
import Text from "./Text";
import Container from './Container';
import Content from './Content';
import StyledGIF from './StyledGIF';
import SetNickNameGIF from '../../assets/gifs/setnickname.gif';
import MarkAsReadGIF from '../../assets/gifs/markasread.gif';
import ScreenshareGIF from '../../assets/gifs/screenshare.gif';
import NotifsToMentionGIF from '../../assets/gifs/notifstomention.gif';

const DiscordOnboarding: React.FC = () => (
    <>
        <Container>
            <Content>
                <Text>
                    <h2>What is Discord?</h2>
                    <p>
                        Discord is a voice and text platform that allows people to interact in real time through audio 
                        and video channels. If you are familiar with Slack, then you can think of Discord as a more 
                        casual version! You can download both the desktop and mobile version of Discord by visiting{" "}
                        <a
                            href="https://discord.com/download"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://discord.com/download
                        </a>
                        {" "}or open Discord in your browser by visiting{" "} 
                        <a
                            href="https://discord.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://discord.com/.
                        </a>
                    </p>
                    <h2>What is a discord server?</h2>
                    <ul>
                        <li>
                            An invite-only home for the community - in our case, McHacks 8! If you are a 
                            slack user, you can think of it like a Slack workspace. It is a place where 
                            you can talk, ask for help, get announcements, hang out, and have fun!
                        </li>
                        <li>
                            There will be a bunch of channels within the server for different purposes.
                        </li>
                        <li>
                            The column on the very left-hand side of your Discord app is your server list.
                            Any time you add a server, you'll see it pop up as a small circular icon in this list
                        </li>
                        <li>
                            <b>Pro Tip: </b>You can rearrange your server list by dragging server icons up and down
                        </li>
                    </ul>
                    <h2>How do I make an account?</h2>
                    <p>If you're on browser:</p>
                    <ol>
                        <li>
                            Visit{" "} 
                            <a
                                href="https://discord.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://discord.com/.
                            </a>
                        </li>
                        <li>
                            Create your username
                        </li>
                        <li>
                            Complete the captcha
                        </li>
                        <li>
                            A pop-up will appear; click Skip for now
                        </li>
                        <li>
                            You will then get a notification, asking you to claim your account. Enter 
                            your email address and password, then click confirm
                        </li>
                        <li>
                            Another pop-up will appear; if you wish to continue to stick with the 
                            browser version of discord, click skip
                        </li>
                        <li>
                            You should receive a confirmation email within the next few minutes. Click the 
                            link and verify your Discord account
                        </li>
                    </ol>
                    <p>If you’re on desktop:</p>
                    <ol>
                        <li>
                            Click register, below login button
                        </li>
                        <li>
                            Enter email, username, password, date of birth, then click continue
                        </li>
                        <li>
                            You should receive a confirmation email within the next few minutes. Click the link and 
                            verify your Discord account
                        </li>
                    </ol>
                    <h2>How do I join the McHacks 8 Discord server?</h2>
                    <p>To join a server, click the "+" icon at the very bottom of the server list.</p>
                    <ul>
                        <li>
                            Select “Join a Server” at the bottom of the pop-up and you will be asked for an “Invite Link”, which is provided 
                            in our week of email
                        </li>
                        <li>
                            Paste the link and press “Join Server”. And you are good to go! 
                        </li>
                        <li>
                            Please set your nickname in the server in the format: (First Name) (Last Name) (Company/School) 
                        </li>
                        <li>
                            Please note that the invite links are case sensitive and could be expired. Also, a user cannot be a member of more than 100 servers, 
                            so you will need to leave one before you can join if you reach the limit
                        </li>
                        <li>
                            If you are having trouble joining the server, please reach out to our team for assistance! 
                        </li>
                    </ul>
                    <p>How to set your nickname on a Server:</p>
                    <StyledGIF src={SetNickNameGIF} />
                    <h2>What are text and video channels?</h2>
                    <p>Each server is made up of voice channels and text channels.</p>
                    <ul>
                        <li>
                            <p>Text Channels</p>
                            <ul>
                                <li>
                                    These are channels which are specifically made for talking over text
                                </li>
                                <li>
                                    This creates an organized space for people to discuss
                                </li>
                                <li>
                                    You can create channels for specific topics and add the necessary members for each of the channels. (i.e you can have one general channel, one front-end 
                                    channel, one back-end channel etc…)
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>Voice Channels</p>
                            <ul>
                                <li>
                                    These are where you can talk using your voice and video. You also have the ability to share your screen
                                </li>
                                <li>
                                    There is no join call button but rather you join the channel by clicking on it
                                </li>
                                <li>
                                    People on the server can see you are in a voice channel and can also join
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>How to send messages or attachments:</p>
                    <ul>
                        <li>
                            In text channels you will have a chat in the middle and you will be able to write text in there. The message 
                            is sent when you press enter
                        </li>
                        <li>
                            If you want to go to a new line in the same message, you have to press “ctrl + enter” (windows) or “cmd + enter” (mac)
                        </li>
                        <li>
                            <p>Attachments</p>
                            <ul>
                                <li>
                                    On the chat bar on the left, there is a + button. You can click on this and you will be able to send files that are on your computer to the chat. 
                                    Discord accepts file formats
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h2>How do I voice chat?</h2>
                    <ul>
                        <li>
                            First you need to join a voice channel. Voice channels have the following logo “🔉”
                        </li>
                        <li>
                            <p>After this you will be able to start talking.</p>
                            <ul>
                                <li>
                                    You might need to check your computer and audio settings to make sure that you are not muted. You can verify this by checking your voice settings in the settings 
                                    part of discord
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>Sharing video:</p>
                            <ul>
                                <li>
                                    Once you join a voice channel, you will in the bottom left corner a “Video”  option. If you click on it, it will activate your video
                                </li>
                                <li>
                                    You might need to check your video settings
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>Sharing screen:</p>
                            <ul>
                                <li>
                                    Just next to the video options, you will see a “screen” button. If you click on it, it will share your screen
                                </li>
                            </ul>
                            <StyledGIF src={ScreenshareGIF} />
                            <br></br>
                        </li>
                        <li>
                            <p>Marking messages as read:</p>
                            <StyledGIF src={MarkAsReadGIF} />
                            <br></br>
                        </li>
                        <li>
                            <p>Change notifications from all to mentions only: </p>
                            <StyledGIF src={NotifsToMentionGIF} />
                            <br></br>
                        </li>
                    </ul>
                    <h2>Helpful Online Resources</h2>
                    <ul>
                        <li>
                            <a
                                href="https://support.discord.com/hc/en-us/sections/360008206871-Discord-Basics"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://support.discord.com/hc/en-us/sections/360008206871-Discord-Basics
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.tomsguide.com/us/what-is-discord,review-5203.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.tomsguide.com/us/what-is-discord,review-5203.html
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.techradar.com/how-to/how-to-use-discord"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.techradar.com/how-to/how-to-use-discord
                            </a>
                        </li>
                    </ul>
                </Text>
            </Content>
        </Container>
    </>
);

export default DiscordOnboarding;
