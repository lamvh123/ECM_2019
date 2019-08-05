import { Slot } from '../slot';
import { Class } from './class';
import { Room } from '../room';

export class LearningSession {
    ClassName:string;
    ClassId:number;
    Id:number;
    LearningDay:string;
    RoomId:number;
    SessionNumber:string;
    slot: Slot;
    class:Class;
    Room:Room = new Room();
}
