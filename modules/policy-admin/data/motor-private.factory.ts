import type { MotorPrivateData } from '../../../shared/models/motor-private.js';
import { generateUniqueId } from '../../../shared/utils/id-generator.js';

export function createMotorPrivateData(): MotorPrivateData {
    return {
        vehicle: {
            vehicleNo: 'BND1234',
            registrationYear: 2020,
            make: 'Audi',
            model: 'Audi A3 1.2',
            manufactureYear: '2020',
            engineCapacity: '1197',
            batteryCapacity: '0',
            chassisNo: generateUniqueId('JTDBR'),
            engineNo: generateUniqueId('2NRFEX'),
            bodyType: 'Sedan',
            usage: 'Taxi',
        },
        cover: {
            planName: 'Motor Private (3P Basic)',
            noClaimBonus: '0%',
        },
        driver: {
            relationship: 'Self',
        },
    };
}
