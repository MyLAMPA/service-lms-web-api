
import { Request } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    LessonPlanTemplate,
    SharedItemSource,
} from '../models'
import * as lessonPlanTemplatesServices from '../services/lessonPlanTemplates'

export async function getLessonPlanTemplates(req: Request) {
    let lessonPlanTemplates: LessonPlanTemplate[] = []
    let query: any = {}

    if (req.query.level) {
        query.level = { $in: String(req.query.level).split(',') }
    }

    if (req.query.recomendedAge) {
        query.recomendedAge = { $in: String(req.query.recomendedAge).split(',') }
    }

    const sources: SharedItemSource[] = <SharedItemSource[]>(String(req.query.source).split(','))

    if (sources.indexOf(SharedItemSource.own) >= 0) {
        const ownLessonPlanTemplates = await lessonPlanTemplatesServices.getLessonPlanTemplates(_.merge({}, query, { createdBy: String(req.state.user._id) }), req.state)
        lessonPlanTemplates = _.concat([], lessonPlanTemplates, ownLessonPlanTemplates)
    }

    if (sources.indexOf(SharedItemSource.school) >= 0) {
        const schoolLessonPlanTemplates = await lessonPlanTemplatesServices.getLessonPlanTemplates(_.merge({}, query, { school: String(req.state.school._id), isSchoolVisible: true }), req.state)
        lessonPlanTemplates = _.concat([], lessonPlanTemplates, schoolLessonPlanTemplates)
    }

    if (sources.indexOf(SharedItemSource.community) >= 0) {
        const communityLessonPlanTemplates = await lessonPlanTemplatesServices.getLessonPlanTemplates(_.merge({}, query, { isCommunityVisible: true }), req.state)
        lessonPlanTemplates = _.concat([], lessonPlanTemplates, communityLessonPlanTemplates)
    }

    return _.unionBy(lessonPlanTemplates, lessonPlanTemplate => lessonPlanTemplate._id)
}

export async function postLessonPlanTemplates(req: Request) {
    const lessonPlanTemplate = await lessonPlanTemplatesServices.createLessonPlanTemplate(req.body, req.state)
    return lessonPlanTemplate
}

export async function getLessonPlanTemplate(req: Request) {
    const lessonPlanTemplate = await lessonPlanTemplatesServices.getLessonPlanTemplateById(req.params.lessonPlanTemplateId, req.state)
    return lessonPlanTemplate
}

export async function putLessonPlanTemplate(req: Request) {
    const lessonPlanTemplateId = req.params.lessonPlanTemplateId
    const lessonPlanTemplate = await lessonPlanTemplatesServices.getLessonPlanTemplateById(lessonPlanTemplateId, req.state)

    if (String((<any>lessonPlanTemplate.createdBy)._id) === String(req.state.user._id)) {
        const change = { $set: _.pick(req.body, ['level', 'recomendedAge', 'title', 'topic', 'focus', 'materials', 'outcome', 'isSchoolVisible', 'isCommunityVisible']) }
        return await lessonPlanTemplatesServices.updateLessonPlanTemplateById(lessonPlanTemplateId, change, req.state)
    }

    throw errors.forbidden('Forbidden LessonPlanTemplate')
}
