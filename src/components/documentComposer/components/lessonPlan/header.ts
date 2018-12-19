
import * as moment from 'moment'

import {
    Lesson,
} from '../../../../types/lms'
import { LampaLogo } from '../lampaLogo'

export interface LessonPlanHeaderProps {}

export interface LessonPlanHeaderState {
    lesson: Lesson
    duration: number
}

export class LessonPlanHeader {
    private state: LessonPlanHeaderState = {
        lesson: null,
        duration: null,
    }

    constructor(props: LessonPlanHeaderProps = {}) {}

    public renderHtml = (): string => {
        return `
            <div style="display: flex; align-items: flex-end; width: 100%;">
                <div style="flex: 4;">
                    ${LampaLogo({ width: '50%', color: 'rgba(51,51,51,.5)' })}
                </div>
                <div style="flex: 5;">
                    <div style="display: table;">
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Date</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">${moment(this.state.lesson.start).format('DD MMM YYYY')}</div>
                        </div>
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Time</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">${moment(this.state.lesson.start).format('HH:mm')} - ${moment(this.state.lesson.end).format('HH:mm')}</div>
                        </div>
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Duration</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">${this.state.duration} minutes</div>
                        </div>
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right;">&nbsp;</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;"></div>
                        </div>
                    </div>
                </div>
                <div style="flex: 6;">
                    <div style="display: table;">
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Course</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">ENG - General English</div>
                        </div>
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Location</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">Bloc - Block Zašovská</div>
                        </div>
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Group</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">BLOC - BLOCK Potěšil Tomáš</div>
                        </div>
                        <div style="display: table-row; width: auto;">
                            <div style="display: table-cell; width: auto; text-align: right; color: rgba(51,51,51,.5);">Teacher</div>
                            <div style="display: table-cell; width: 100%; padding-left: 8px;">JaLa - Jana LaSalle</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
