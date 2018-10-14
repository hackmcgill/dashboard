export interface IAccount {
    // The first name of the user
    firstName: string,
    // The last name of the user
    lastName: string,
    // The email of the user
    email: string,
    // The dietary restrictions for the user
    dietaryRestrictions: string[],
    // The shirt size
    shirtSize: string,
    // The password
    password: string,
    // The database id (if new, leave blank / make '')
    id: string
}

export interface ISponsor {
    // The Sponsor's account id.
    accountId: string,
    // What tier the sponsor is.
    tier: number,
    // The sponsor's company
    company: string,
    // The URL that of the contract that was signed with this sponsor
    contractURL: string,
    // The list of IDs of Hackers that this sponsor nominates.
    nominees: string[]
}

export enum UserType {
    HACKER = 'Hacker',
    VOLUNTEER = 'Volunteer',
    STAFF = 'Staff',
    GOD_STAFF = 'GodStaff',
    SPONSOR = 'Sponsor'
}
export default UserType;