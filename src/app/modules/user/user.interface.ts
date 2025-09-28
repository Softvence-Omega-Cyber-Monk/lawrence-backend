export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    EMPLOYEE = "EMPLOYEE"

}

export interface IAuthProvider {
    provider : string,
    providerId: string
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    name: string,
    email: string,
    password ?: string,
    phone ?: string,
    picture ?: string,
    address ?: string,
    isDeleted ?: boolean,
    isActive ?: boolean,
    isVerified ?: boolean
    auths : IAuthProvider[],
    role : Role,
}