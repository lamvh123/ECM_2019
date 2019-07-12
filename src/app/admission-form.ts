import { Building } from './building';
import { Course } from './course';
import { Program } from './program';

export class AdmissionForm {
    $id:number;
    Building:Building;
    Course:Course;
    Id:number;
    IsClosed:boolean;
    Name:string;
    StartDate:string;
    program:Program;
    constructor(){
        this.Building = new Building();
        this.Course = new Course();
        this.program = new Program();
    }
}
