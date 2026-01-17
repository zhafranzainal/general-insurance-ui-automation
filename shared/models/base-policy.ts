export type CustomerSubType = 'N/A' | 'Individual' | 'Corporate';
export type IdType = 'Citizen ID Card (Yellow)' | 'Passport' | 'Birth Certificate';
export type Gender = 'Male' | 'Female';
export type ManualCoverNoteUsed = 'Yes' | 'No';
export type Title = 'Awang' | 'Dayang' | 'Haji' | 'Hajah';
export type Relationship = 'Mother' | 'Father' | 'Spouse' | 'Sibling' | 'Child' | 'Guardian';

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
