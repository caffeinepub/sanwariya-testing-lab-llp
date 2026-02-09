import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TestRequest {
    id: string;
    customerName: string;
    testItemType: string;
    standards?: string;
    submittedAt: bigint;
    email?: string;
    company?: string;
    message?: string;
    preferredDate?: bigint;
    phone: string;
}
export interface ContactSubmission {
    id: string;
    name: string;
    submittedAt: bigint;
    email?: string;
    message: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContactSubmission(id: string): Promise<void>;
    deleteTestRequest(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissionById(id: string): Promise<ContactSubmission | null>;
    getContactSubmissions(limit: bigint, offset: bigint): Promise<Array<ContactSubmission>>;
    getTestRequestById(id: string): Promise<TestRequest | null>;
    getTestRequests(limit: bigint, offset: bigint): Promise<Array<TestRequest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, phone: string, email: string | null, message: string): Promise<string>;
    submitTestRequest(customerName: string, company: string | null, phone: string, email: string | null, testItemType: string, standards: string | null, message: string | null, preferredDate: bigint | null): Promise<string>;
}
