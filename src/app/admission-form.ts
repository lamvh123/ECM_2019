import {Building} from './building';
import {Course} from './course';
import {Program} from './program';
import {Center} from './center';
import {Slot} from './slot';

export class AdmissionForm {
  $id: number;
  Building: Building;
  Center: Center;
  Course: Course;
  Id: number;
  IsClosed: boolean;
  Name: string;
  Slot: Slot;
  StartDate: string;
  program: Program;
  GoogleFormLink: string;

  constructor() {
    this.Building = new Building();
    this.Course = new Course();
    this.program = new Program();
    this.Center = new Center();
    this.Slot = new Slot();
  }
}
