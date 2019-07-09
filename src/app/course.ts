import {Center} from './center';
import {Subject} from './subject';

export class Course {
  $id: string;
  Center: string;
  Classes: string;
  CreatedAt: string;
  Description: string;
  Fee: number;
  Id: number;
  Image: string;
  Name: string;
  Program: string;
  TotalSession: string;
  SubjectId: string;
  Subject: Subject;
  Syllabuses: any;
  UpdatedAt: string;
}
