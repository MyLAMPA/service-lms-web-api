
// Library context

export {
    subjectsRepository,
    lessonPlansRepository,
} from './library'


// MySQL repositories

import * as usersRepository from './mysql/users'

export { usersRepository }

// DynamoDb repositories

import * as emailAddressesRepository from './dynamo/emailAddresses'

export { emailAddressesRepository }

// MongoDb repositories

import * as lmsContextsRepository from './mongo/lmsContexts'
import * as lmsContextMembershipsRepository from './mongo/lmsContextMemberships'
import * as coursesRepository from './mongo/courses'
import * as groupsRepository from './mongo/groups'
import * as homeworksRepository from './mongo/homeworks'
import * as lessonsRepository from './mongo/lessons'
import * as schoolYearsRepository from './mongo/schoolYears'
import * as locationEquipmentsRepository from './mongo/locationEquipments'
import * as locationsRepository from './mongo/locations'
import * as studentsRepository from './mongo/students'
import * as teachersRepository from './mongo/teachers'

export { lmsContextsRepository }
export { lmsContextMembershipsRepository }
export { coursesRepository }
export { groupsRepository }
export { homeworksRepository }
export { lessonsRepository }
export { schoolYearsRepository }
export { locationEquipmentsRepository }
export { locationsRepository }
export { studentsRepository }
export { teachersRepository }


import * as libraryRepositories from './library'

export { libraryRepositories }
