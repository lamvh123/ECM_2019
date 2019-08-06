import {Subject} from './subject';
import {UserModel} from './userModel';
import {Center} from './center';

export class Teacher {
  ClassRooms: [];
  Id: number;
  Identity_Number: string;
  Subjects: Subject[];
  User: UserModel;
  center: Center;
}
