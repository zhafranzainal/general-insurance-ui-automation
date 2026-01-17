import type { BasePolicyData } from '../../../shared/models/base-policy.js';
import { generateUniqueId } from '../../../shared/utils/id-generator.js';

export function createBasePolicyData(): BasePolicyData {
    return {
        manualCoverNoteUsed: 'No',
        participant: {
            customerSubType: 'N/A',
            idType: 'Citizen ID Card (Yellow)',
            idNo: generateUniqueId(),
            title: 'Awang',
            name: 'Hazim Hensem',
            dob: '2000-01-01',
            gender: 'Male',
            contactNo: '6731234567',
        },
        contactPerson: {
            name: 'Dayang Hajah Siti Aminah binti Ahmad',
            contactNo: '6731234560',
            idType: 'Citizen ID Card (Yellow)',
            idNo: '6108305678',
            email: 'aminah@example.com',
            relationship: 'Mother',
        },
    };
}
