export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Minivan' | 'Pickup Truck';
export type VehicleUsage = 'Taxi' | 'Driving School' | 'Hire and Reward' | 'NA';
export type NoClaimBonus = '0%' | '20%' | '25%' | '30%';
export type DriverRelationship = 'Self' | 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Cousin';

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
