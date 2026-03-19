import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConsultationRequest {
    id: bigint;
    name: string;
    email: string;
    company: string;
    serviceInterest: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    deleteRequest(id: bigint): Promise<void>;
    getAllRequests(): Promise<Array<ConsultationRequest>>;
    getRequest(id: bigint): Promise<ConsultationRequest>;
    getRequestsByServiceInterest(serviceInterest: string): Promise<Array<ConsultationRequest>>;
    submitRequest(name: string, email: string, company: string, message: string, serviceInterest: string): Promise<bigint>;
}
