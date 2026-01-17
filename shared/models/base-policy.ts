export type ManualCoverNoteUsed = 'Yes' | 'No';
export type CustomerSubType = 'N/A' | 'VVIP';
export type IdType = 'Citizen ID Card (Yellow)' | 'Permanent Resident ID Card (Purple)' | 'Foreign Worker ID Card (Green)' | 'Passport' | "Driver's License" | 'Birth Certificate' | 'Other';
export type Title = 'Awang' | 'Dayang' | 'Mr' | 'Miss';
export type Gender = 'Male' | 'Female' | 'Unknown';
export type Relationship = 'Mother' | 'Father' | 'Friend' | 'Brother' | 'Sister' | 'Cousin';

export interface Participant {
    customerSubType: CustomerSubType;
    idType: IdType;
    idNo: string;
    title: Title;
    name: string;
    dob: string;
    gender: Gender;
    contactNo: string;
}

export interface ContactPerson {
    name: string;
    contactNo: string;
    idType: IdType;
    idNo: string;
    email: string;
    relationship: Relationship;
}

export interface BasePolicyData {
    manualCoverNoteUsed: ManualCoverNoteUsed;
    participant: Participant;
    contactPerson: ContactPerson;
}
