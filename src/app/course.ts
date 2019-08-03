import {Center} from './center';
import {Subject} from './subject';
import {Program} from './program';

export class Course {
  // $id: string;
  Center: string;
  Classes: string;
  CreatedAt: string;
  Description: string;
  Fee: string;
  Id: number;
  Image: string;
  Name: string;
  Program: Program;
  TotalSession: string;
  SubjectId: string;
  Subject: Subject;
  Syllabuses: any;
  UpdatedAt: string;
  // $ref: string;
}
