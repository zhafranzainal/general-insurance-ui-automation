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
    bodyType: string;
    usage: string;
}

export interface Cover {
    planName: string;
    noClaimBonus: string;
}

export interface Driver {
    relationship: string;
}

export interface MotorPrivateData {
    vehicle: Vehicle;
    cover: Cover;
    driver: Driver;
}
