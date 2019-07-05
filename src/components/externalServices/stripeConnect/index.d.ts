
export interface StripeConnectServiceConfig {
    baseUrl: string
    accessKeyId: string
    secretAccessKey: string
}

export type Card = {
    id: string
    address_city?: string
    address_country?: string
    address_line1?: string
    address_line1_check?: string
    address_line2?: string
    address_state?: string
    address_zip?: string
    address_zip_check?: string
    brand: string
    country: string
    customer?: string
    exp_month: number
    exp_year: number
    last4: string
    metadata?: object
    name: string
}
