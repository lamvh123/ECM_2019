import {Building} from './building';
import {Course} from './course';
import {Program} from './program';
import {Center} from './center';
import {Slot} from './slot';

export class APIContext {
  host = 'https://educationcentermanagementapi-dev-as.azurewebsites.net/';
  centerId = 1;

  // constructor() {
  //   this.Building = new Building();
  //   this.Course = new Course();
  //   this.program = new Program();
  //   this.Center = new Center();
  //   this.Slot = new Slot();
  // }
}

export class APITraining {
  getCenter = 'api/TrainingDept/GetCenter';

  getProfile = 'api/TrainingDept/Profile';
  updateProfile = 'api/TrainingDept/UpdateProfile';

  addProgram = 'api/TrainingDept/AddProgram';
  getProgramByProgramId = 'api/TrainingDept/GetProgramById';
  updateProgram = 'api/TrainingDept/UpdateProgram';
  deleteProgram = 'api/TrainingDept/DeleteProgram';
  searchProgram = 'api/TrainingDept/SearchProgram';

  addCourse = 'api/TrainingDept/AddCourse';
  getCourseByCourseId = 'api/TrainingDept/GetCourseById';
  searchCourseByProgramId = 'api/TrainingDept/SearchCourseByProgram';
  searchCourse = 'api/TrainingDept/SearchCourse';
  viewAllCourse = 'api/TrainingDept/ViewAllCourse';
  updateCourse = 'api/TrainingDept/UpdateCourse';
  deleteCourse = 'api/TrainingDept/DeleteCourse';

  getAllSlot = 'api/TrainingDept/GetAllSlot';
  addSlot = 'api/TrainingDept/AddSlot';
  addOneSlot = 'api/TrainingDept/AddOneSlot';
  getSlotBySlotId = 'api/TrainingDept/GetSlotById';
  updateSlot = 'api/TrainingDept/UpdateSlot';
  updateOneSlot = 'api/TrainingDept/UpdateOneSlot';

  addBuilding = 'api/TrainingDept/AddBuilding';
  updateBuilding = 'api/TrainingDept/UpdateBuilding';
  searchBuilding = 'api/TrainingDept/SearchBuilding';
  getBuildingById = 'api/TrainingDept/GetBuildingById';

  addRoom = 'api/TrainingDept/AddRoom';
  updateRoom = 'api/TrainingDept/UpdateRoom';
  searchRoom = 'api/TrainingDept/SearchRoom';

  getSubjectById = 'api/TrainingDept/GetSubjectById';
  addSubject = 'api/TrainingDept/AddSubject';
  updateSubject = 'api/TrainingDept/UpdateSubject';
  searchSubject = 'api/TrainingDept/SearchSubject';

  gettAdmissionFormById = 'api/TrainingDept/GetAdmissionFormById';
  searchAdmissionForm = 'api/TrainingDept/SearchAdmissionForm';
  getTotalAdmissionForm = 'api/TrainingDept/GetTotalAdmissionForm';

  getTotalRegisteredStudent = 'api/TrainingDept/GetTotalRegisteredStudent';
  searchRegisteredStudent = 'api/TrainingDept/SearchRegisteredStudent';

  generateClass = 'api/TrainingDept/GenerateClass';
  createClass = 'api/TrainingDept/CreateClass';
  searchClass = 'api/TrainingDept/SearchClass';
  getClassById = 'api/TrainingDept/GetClassById';

  updateStudentInClass = 'api/TrainingDept/UpdateStudentInClass';

  assignTeacherToClass = 'api/TrainingDept/AssignTeacherToClass';
  addRoomToClass = 'api/TrainingDept/AddRoomToClass';
  getAllRoomAvailbleForClass = 'api/TrainingDept/GetAllRoomAvailableForClass';

  searchTeacher = 'api/TrainingDept/SearchTeacher';
  generateTimeTable = 'api/TrainingDept/GenerateTimeTable';
  officialTimeTableOfClass = 'api/TrainingDept/OfficialTimeTableOfClass';
  getAllTimeTable = 'api/TrainingDept/GetAllTimeTable';
}
