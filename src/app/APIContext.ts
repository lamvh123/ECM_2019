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


export class APIAccount {
  userInfo = 'api/Account/UserInfo';
  logout = 'api/Account/Logout';
  manageInfo = 'api/Account/ManageInfo';
  changePassword = 'api/Account/ChangePassword';
  setPassword = 'api/Account/SetPassword';
  addExternalLogin = 'api/Account/AddExternalLogin';
  removeLogin = 'api/Account/RemoveLogin';
  externalLogins = 'api/Account/ExternalLogins';
  register = 'api/Account/Register';
  registerExternal = 'api/Account/RegisterExternal';
}

export class APIStudent {
  getCenter = 'api/Student/GetCenter';
  profile = 'api/Student/profile';
  updateProfile = 'api/Student/UpdateProfile';
  getCourseOfStudent = 'api/Student/GetCourseOfStudent';
  getTimeTableOfStudent = 'api/Student/GetTimeTableOfParticularClass';
  getClassList = 'api/Student/GetClassListOfStudent';
}

export class APIAccounting {
  getCenter = 'api/AccoungtingDept/GetCenter';
  profile = 'api/AccoungtingDept/profile';
  updateProfile = 'api/AccoungtingDept/UpdateProfile';
  getAllCourse = 'api/AccoungtingDept/GetAllCourse';
  getAllCourseByPid = 'api/AccoungtingDept/GetAllCourse';
  getAllAdmissionForm = 'api/AccoungtingDept/GetAllAdmissionForm';
  getAllAdmissionFormByCid = 'api/AccoungtingDept/GetAllAdmissionForm';
  getAllProgram = 'api/AccoungtingDept/GetAllProgram';
  getTotalRegisteredStudent = 'api/AccoungtingDept/GetTotalRegisteredStudent';
  searchRegisteredStudent = 'api/AccoungtingDept/SearchRegisteredStudent';
  setPaymentForOneStudent = 'api/AccoungtingDept/SetPaymentForOneStudent';
  setPaymentForManyStudent = 'api/AccoungtingDept/SetPaymentForManyStudent';
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
  getClassById = 'api/TrainingDept/GetStudentByClassId';
  getDetailClassById = 'api/TrainingDept/GetDetailClassById';

  updateStudentInClass = 'api/TrainingDept/UpdateStudentInClass';

  assignTeacherToClass = 'api/TrainingDept/AssignTeacherToClass';
  addRoomToClass = 'api/TrainingDept/AddRoomToClass';
  getAllRoomAvailbleForClass = 'api/TrainingDept/GetAllRoomAvailableForClass';

  searchTeacher = 'api/TrainingDept/SearchTeacher';
  generateTimeTable = 'api/TrainingDept/GenerateTimeTable';
  officialTimeTableOfClass = 'api/TrainingDept/OfficialTimeTableOfClass';
  getAllTimeTable = 'api/TrainingDept/GetAllTimeTable';

  getStatisticByProgram = 'api/TrainingDept/statistic/GetStatisticByProgram';
  getNumberOfProgram = 'api/TrainingDept/statistic/GetNumberOfProgram';
  getNumberOfCourse = 'api/TrainingDept/statistic/GetNumberOfCourse';
  getNumberOfClass = 'api/TrainingDept/statistic/GetNumberOfClass';

  getTeacherBySubject = 'api/TrainingDept/GetTeacherBySubject';
}

export class APITeacher {
  getCenter = 'api/teacher/GetCenter';
  profile = 'api/teacher/profile';
  updateProfile = 'api/teacher/UpdateProfile';
  getListOfClassOfTeacher = 'api/teacher/GetListOfClassOfTeacher';
  classDetail = 'GetDetailOfParticularClass';
  getTimeTableOfParticularClass = 'api/teacher/GetTimeTableOfParticularClass';
  getAttendanceStudentOfParticularClass = 'api/teacher/GetAttendanceStudentOfParticularClass';
  updateAttendanceStudentOfParticularClass = 'api/teacher/UpdateAttendanceStudentOfParticularClass';
}

export class APIRegistrationStudent {
  registerCourse = 'api/RegistrationStudent/RegisterCourse';
}

export class APICustomer {
  getAllProgram = 'api/Customer/GetAllProgram';
  getAllCourseFollowProgram = 'api/Customer/GetAllCourseFollowProgram';
  getAllCourse = 'api/Customer/GetAllCourse';
  getAllAdmissionForm = 'api/Customer/GetAllAdmissionForm';
  getCourseById = 'api/Customer/GetCourseById';
  getAdmissionFormById = 'api/Customer/GetAdmissionFormById';
  getProgramById = 'api/Customer/GetProgramById';
}

export class APISystem {
  grantAccountForCenter = 'api/Systemmanagement/GrantAccountForCenter';
  profile = 'api/Systemmanagement/Profile';
  updateProfile = 'api/Systemmanagement/updateProfile';
  getAllCenter = 'api/Systemmanagement/GetAllCenter';
  addCenter = 'api/Systemmanagement/AddNewCenter';
}

export class APICenter {
  getCenter = 'api/CenterManagement/GetCenter';
  profile = 'api/CenterManagement/profile';
  updateProfile = 'api/CenterManagement/UpdateProfile';
  viewAllStaffAccount = 'api/CenterManagement/ViewAllStaffAccount';
  viewAllStudentAccount = 'api/CenterManagement/ViewAllStudentAccount';
  viewAllRole = 'api/CenterManagement/ViewAllRole';
  grantAccountForStaff = 'api/CenterManagement/GrantAccountForStaff';
  grantAccountForStudent = 'api/CenterManagement/GrantAccountForStudent';
  grantAccountForManyStaff = 'api/CenterManagement/GrantAccountForManyStaff';
  getTotalRegisteredStudent = 'api/CenterManagement/GetTotalRegisteredStudent';
  searchRegisteredStudent = 'api/CenterManagement/SearchRegisteredStudent';
  getAllCourse = 'api/CenterManagement/GetAllCourse';
  getAllCourseByPid = 'api/CenterManagement/GetAllCourse';
  getAllAdmissionForm = 'api/CenterManagement/GetAllAdmissionForm';
  getAllAdmissionFormByCid = 'api/CenterManagement/GetAllAdmissionForm';
  getAllProgram = 'api/CenterManagement/GetAllProgram';
}

export class APIAdmission {
  getCenter = 'api/AdmissionManagement/GetCenter';
  profile = 'api/AdmissionManagement/profile';
  updateProfile = 'api/AdmissionManagement/UpdateProfile';
  createAdmissionForm = 'api/AdmissionManagement/CreateAdmissionForm';
  getAdmissionFormById = 'api/AdmissionManagement/GetAdmissionFormById';
  searchAdmissionForm = 'api/AdmissionManagement/SearchAdmissionForm';
  updateAdmissionForm = 'api/AdmissionManagement/UpdateAdmissionForm';
  closeAdmissionForm = 'api/AdmissionManagement/CloseAdmissionForm';
  getAllBuilding = 'api/AdmissionManagement/GetAllBuilding';
  getBuildingById = 'api/AdmissionManagement/GetBuildingById';
  getAllCourse = 'api/AdmissionManagement/GetAllCourse';
  getAllProgram = 'api/AdmissionManagement/GetAllProgram';
  getAllSlot = 'api/AdmissionManagement/GetAllSlot';
  getTotalRegisteredStudent = 'api/AdmissionManagement/GetTotalRegisteredStudent';
  searchRegisteredStudent = 'api/AdmissionManagement/SearchRegisteredStudent';
}

export class APIRole {
  create = 'api/Role/Create';
  detail = 'api/Role/Detail';
  edit = 'api/Role/Edit';
  delete = 'api/Role/Delete';
}
