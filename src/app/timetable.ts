import {Center} from './center';
import {Class} from './entity/class';
import {Room} from './room';
import {Slot} from './slot';
import {Teacher} from './teacher';

export class Timetable {
  Center: Center;
  Class: Class;
  Id: number;
  IsOfficial: boolean;
  LearningDay: string;
  Room: Room;
  SessionNumber: string;
  slot: Slot;
  teacher: Teacher;
  AttendBy: Teacher;
  status: number;
  displayDay: string;
}
