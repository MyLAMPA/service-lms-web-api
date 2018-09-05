
import {
    Lesson,
    Group,
    Teacher,
    Student,
    Course,
    Location,
    BaseLessonAttendance,
    LessonAttendance,
    AttendanceStatus,
    LessonStatus,
} from '..'

export type ViewableEntity = {
    name: string;
    abbr: string;
    color: string;
};

export type LessonBrowsable = {
    previousLesson: string|LessonDetail;
    nextLesson: string|LessonDetail;
};

export type LessonDetail = {
    lessonId: string;
    status: LessonStatus
    start: Date;
    end: Date;
    duration: number;
    course: LessonCourseDetail;
    group: LessonGroupDetail;
    teachers: LessonTeacherDetail[];
    students: LessonStudentDetail[];
    location: LessonLocationDetail;
};

export type LessonCourseDetail = ViewableEntity & {
    courseId: string;
};

export type LessonGroupDetail = ViewableEntity & LessonBrowsable & {
    groupId: string;
    description: string;
};

export type LessonTeacherDetail = ViewableEntity & LessonBrowsable & {
    teacherId: string;
};

export type LessonStudentDetail = {
    studentId: string;
    name: string;
};

export type LessonLocationDetail = ViewableEntity & LessonBrowsable & {
    locationId: string;
};

export type AggregatedLessonAttendance = {
    student: AggregatedLessonAttendanceStudent
    status: AttendanceStatus
    absentTime: number
    note: string
}

export type AggregatedLessonAttendanceStudent = {
    studentId: string
    name: string
}
