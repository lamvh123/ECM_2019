import { Building } from './building';
import { Course } from './course';

export class AdmissionForm {
    $id:number;
    Building:Building;
    Course:Course;
    Id:number;
    IsClosed:boolean;
    Name:string;
    StartDate:string;
}
