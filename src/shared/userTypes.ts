export interface IAccount {
    firstName: string,
    lastName: string,
    email: string,
    dietaryRestrictions: string[],
    shirtSize: string,
    password: string,
    id: string
}

export enum UserType {
    HACKER = 'Hacker',
    VOLUNTEER = 'Volunteer',
    STAFF = 'Staff',
    GOD_STAFF = 'GodStaff',
    SPONSOR = 'Sponsor'
}
export default UserType;