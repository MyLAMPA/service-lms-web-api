
import { Checkbox } from '../checkbox'

export interface ActivitiesState {
    activities: any[]
}

export class Activities {
    private state: ActivitiesState = {
        activities: [],
    }

    constructor(activities: any[] = []) {
        this.state.activities = activities
    }

    public renderHtml = (): string => {
        return `
            <h4 style="padding: 0; margin: 0 0 6mm 0;">Activities</h4>
            ${this.state.activities.map(activity => `
                <div style="display: flex; margin-top: 4mm;">
                    <div style="width: auto; padding: 0 4mm;">
                        ${Checkbox({ checked: activity.isDone })}
                    </div>
                    <div style="flex: 1;">${activity.title}</div>
                </div>
            `)}
        `
    }
}
