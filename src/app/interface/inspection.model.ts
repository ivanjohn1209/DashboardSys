export interface Inspection {
    id: number|any;
    status: string;
    comments: string;
    inspectionTypeId: number;
}


export interface InspectionType {
    id: number;
    inspectionName: string;
}


export interface StatusType {
    id: number;
    statusOption: string;
}
