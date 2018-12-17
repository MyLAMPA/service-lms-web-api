
class LMSCore {
    public createProcedure<T extends Function>(func: T): T {
        return func
    }
}

const lmsCore = new LMSCore()

const getSchoolById =
    lmsCore.createProcedure((schoolId: string, state: object): Promise<{
        id: string
        name: string
        abbr: string
    }> => {
        return null
    })

async () => {
    (await getSchoolById('', {})).id
}

class Procedure {

}
