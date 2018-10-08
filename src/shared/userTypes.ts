import HackerStatus from './hackerStatus';
import JobInterest from './jobInterests';
export interface IAccount {
    firstName: string,
    lastName: string,
    email: string,
    dietaryRestrictions: string[],
    shirtSize: string,
    password: string,
    id: string
}

export interface IHacker {
    accountId: string,
    status: HackerStatus,
    school: string,
    // no enum for this
    gender?: string,
    needsBus: boolean,
    application: {
        portfolioURL: {
            // gcloud bucket link
            resume: string,
            github?: string,
            dropler?: string,
            personal?: string,
            linkedIn?: string,
            other?: string
        },
        jobInterest: JobInterest,
        // array of mongoose ids referencing different skills
        skills: string[],
        // any miscelaneous comments that the user has
        comments?: string,
        // "Why do you want to come to our hackathon?"
        essay?: string,
        // mongoose id referencing which team they are a part of
        team?: string
    }
}

export enum UserType {
    HACKER = 'Hacker',
    VOLUNTEER = 'Volunteer',
    STAFF = 'Staff',
    GOD_STAFF = 'GodStaff',
    SPONSOR = 'Sponsor'
}
