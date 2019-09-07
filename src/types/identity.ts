
export interface User {
    id: number
    username: string   
    primaryEmailAddress?: string
    birthDate?: Date
    sex?: 'male'|'female'
    firstName: string
    lastName: string
    profileImage: string
}
