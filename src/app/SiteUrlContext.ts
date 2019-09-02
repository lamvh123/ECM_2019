export class UrlStudent {
  profile = '/Student/profile';
  viewTimetable = '/Student/ViewTimetable';
}

export class UrlAccounting {
  profile = '/Account-staff/profile';
  student = '/Account-staff/student';
}

export class UrlTraining {
  viewReport = '/Training-staff/Report';
  viewTeacher = '/Training-staff/view-teacher';
  addTeacher = '/Training-staff/add-teacher';
  viewProgram = '/Training-staff/view-program';
  addProgram = '/Training-staff/add-program';
  generateClass = '/Training-staff/GenerateClass';
  listClass = '/Training-staff/ListClasses';
  generateTimetable = '/Training-staff/GenerateTimetable';
  viewBuilding = '/Training-staff/view-building';
  addBuilding = '/Training-staff/add-building';
  viewRoom = '/Training-staff/view-room';
  addRoom = '/Training-staff/add-room';
  viewSlot = '/Training-staff/view-slot';
  addSlot = '/Training-staff/add-slot';
  viewSubject = '/Training-staff/view-subject';
  addSubject = '/Training-staff/add-subject';
  profile = '/Training-staff/profile';
  viewWeeklyReport = '/Training-staff/WeeklyReport';
  viewCourse = '/Training-staff/view-course';
  programDetail = '/Training-staff/program-detail';
  listStudentOfClass = '/Training-staff/ListStudentOfClass';
  addCourse = '/Training-staff/add-course';
  courseDetail = '/Training-staff/course-detail';
  viewStudent = '/Training-staff/Student';
}

export class UrlTeacher {
  profile = '/Teacher/profile';
  viewTimetable = '/Teacher/ViewTimetable';
  takeAttendance = '/Teacher/take-attendance';
}

export class UrlSystem {
  profile = '/SystemAdmin/profile';
  allCenter = '/SystemAdmin/AllCenter';
  addCenter = '/SystemAdmin/AddCenter';
}

export class UrlCenter {
  profile = '/CenterAdmin/profile';
  grantAccount = '/CenterAdmin/GrantAccount';
  viewStaff = '/CenterAdmin/view-staff';
}

export class UrlAdmission {
  profile = '/Admission-staff/profile';
  admissionForm = '/Admission-staff/admissionform';
  addForm = '/Admission-staff/addForm';
  formDetail = '/Admission-staff/form-detail';
}

export class UrlNotLogin {
  login = '/login';
  logout = '/logout';
  forgotPassword = '/forgot-password';
  resetPassword = '/forgot-password/reset-password';
}
