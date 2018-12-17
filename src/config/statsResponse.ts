import { DietaryRestriction, HackerStatus, JobInterest, ShirtSize } from '.';

export interface IStatsResponse {
  stats: {
    total: number;
    status: { [key in HackerStatus]: number };
    school: { [key: string]: number };
    degree: { [key: string]: number };
    gender: { [key: string]: number };
    needsBus: { true: number; false: number };
    ethnicity: { [key: string]: number };
    jobInterest: { [key in JobInterest]: number };
    major: { [key: string]: number };
    graduationYear: { [key: string]: number };
    dietaryRestriction: { [key in DietaryRestriction & string]: number };
    ShirtSize: { [key in ShirtSize]: number };
    age: { [key: string]: number };
  };
}
