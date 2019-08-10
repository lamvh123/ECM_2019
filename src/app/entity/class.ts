import {Teacher} from '../teacher';

export class Class {
  ClassId: number;
  ClassName: string;
  CourseName: string;
  ProgramName: string;
  SubjectId: string;
  IsCreatedTimeTable: boolean;
  selected: boolean = false;
  NumberOfStudent: number;
  Id: number;
  Name: string;
  TeacherList: Teacher[];
  Teachers: Teacher[];
}
