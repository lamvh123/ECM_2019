import {Slot} from '../slot';
import {Class} from './class';
import {Room} from '../room';
import {Teacher} from '../teacher';

export class LearningSession {
  ClassName: string;
  ClassId: number;
  Id: number;
  LearningDay: string;
  RoomId: number;
  SessionNumber: string;
  slot: Slot;
  Class: Class;
  Room: Room = new Room();
  teacher: Teacher;
  IsOfficial: number;
  AttendanceState: number;
  displayDate: string;
}

export class TotalTimetable {
  LearntTimetableList: LearningSession[];
  NextTimetable: LearningSession;
  PendingTimetableList: LearningSession[];
}
