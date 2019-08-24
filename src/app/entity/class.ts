import {Teacher} from '../teacher';
import {Room} from '../room';

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
  RoomList: Room[];
  Teachers: Teacher[];
  RoomId: number;
  IsFinished: boolean = false;
  IsClosed: boolean = false;
}
