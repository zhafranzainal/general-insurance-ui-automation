export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Van' | 'Pickup';
export type VehicleUsage = 'Taxi' | 'Private' | 'Commercial' | 'Rental';
export type NoClaimBonus = '0%' | '25%' | '30%' | '38.33%' | '45%' | '55%';
export type DriverRelationship = 'Self' | 'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Employee';

export interface Vehicle {
    vehicleNo: string;
    registrationYear: number;
    make: string;
    model: string;
    manufactureYear: string;
    engineCapacity: string;
    batteryCapacity: string;
    chassisNo: string;
    engineNo: string;
    bodyType: BodyType;
    usage: VehicleUsage;
}

export interface Cover {
    planName: string;
    noClaimBonus: NoClaimBonus;
}

export interface Driver {
    relationship: DriverRelationship;
}

export interface MotorPrivateData {
    vehicle: Vehicle;
    cover: Cover;
    driver: Driver;
}
