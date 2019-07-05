
export interface SubscriptionsServiceConfig {
    baseUrl: string
    accessKeyId: string
    secretAccessKey: string
}

export interface Plan {
    id: string
    active: boolean
    amount: number
    billing_scheme: string
    created: number
    currency: string
    interval: string
    interval_count: number
    nickname: string
    product: string
    usage_type: string
}

export interface PricingPlan {
    id: number
    skuId: string
    stripePlanId: string
    title: string
    description: string
    stripePlan?: Plan
}

export interface Product {
    id: number
    skuId: string
    stripeProductId: string
    name: string
    title: string
    description: string
    isUserEligible: boolean
    isSchoolEligible: boolean
}

export interface Subscription {
    id: number
    skuId: string
    stripeSubscriptionId: string
    stripePricingPlanId: string
    status: SubscriptionStatus
    userId: number
    lmsContextId: string
    stripeSubscription?: {
        id: string
        status: string
        billing_cycle_anchor: number
        created: number
        current_period_end: number
        current_period_start: number
        customer: string
        plan: Plan
    }
}

export enum SubscriptionStatus {
    pending = 'pending',
    active = 'active',
    suspended = 'suspended',
    canceled = 'canceled',
}
