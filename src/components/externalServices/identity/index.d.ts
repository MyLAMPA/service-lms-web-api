
export interface IdentityServiceConfig {
    baseUrl: string
    accessKeyId: string
    secretAccessKey: string
}

export interface User {
    id: number
    username: string
    email: string
    isEmailVerified: boolean
    firstName: string
    lastName: string
    image: string
}
