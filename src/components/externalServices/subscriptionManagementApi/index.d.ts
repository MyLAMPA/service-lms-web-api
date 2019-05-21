
export interface SubscriptionManagementServiceConfig {
    baseUrl: string
    accessKeyId: string
    secretAccessKey: string
}

export interface Subscription {
    id: number
    status: SubscriptionStatus
    originalPurchaseDate: Date
    purchaseDate: Date
    expirationDate: Date
    userId: number
    lmsContextId: string
}

export enum SubscriptionStatus {
    issued = 'issued',
    active = 'active',
    canceled = 'canceled',
}
