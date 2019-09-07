
export interface Post {
    createdAt: Date
    createdBy: number
    type: PostType
}

export enum PostType {
    publishedActivity = 'publishedactivity',
    publishedLessonPlan = 'publishedlessonplan',
}
