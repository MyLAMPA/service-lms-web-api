
import { Activities } from './components/lessonPlan/activities'

export interface LessonPlanDocumentProps {}
export interface LessonPlanDocumentState {}

export class LessonPlanDocument {
    private state: LessonPlanDocumentState = {}

    constructor(props: LessonPlanDocumentProps = {}) {}

    public renderHtml = (): string => {
        return `
            
        `
    }
}
