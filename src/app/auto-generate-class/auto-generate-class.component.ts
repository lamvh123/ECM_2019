import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course';
import {AdmissionForm} from '../admission-form';
import {APIContext, APITraining} from '../APIContext';
import {ToastrService} from 'ngx-toastr';
import {Student} from '../entity/student';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Class} from '../entity/class';

@Component({
  selector: 'app-auto-generate-class',
  templateUrl: './auto-generate-class.component.html',
  styleUrls: ['./auto-generate-class.component.css', '../../assets/css/main.css',
    '../../assets/css/themes/all-themes.css']
})
export class AutoGenerateClassComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private modalService: NgbModal) {
  }

  apiContext = new APIContext();
  apiTraining = new APITraining();
  centerId: number;

  ListOfCourse: Course[];
  ListOfForm: AdmissionForm[];
  selectedCourseId = -1;
  listSelectedFormId: any[];
  isLoading = true;
  empty = false;

  notJoinStudentList: Student[];
  availableClassList: Class[];

  ngOnInit() {
    const urlGetCenterId = this.apiContext.host + this.apiTraining.getCenter;
    this.http.get(urlGetCenterId).toPromise().then(data => {
      this.centerId = data['Id'];
      this.loadInitData();
    });
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  loadInitData() {
    this.getAllCourse();
    this.loadForm();
  }

  getAllCourse() {

    const body = new HttpParams()
      .set('centerId', this.centerId + '');
    const configUrl = this.apiContext.host + this.apiTraining.viewAllCourse;
    this.http.get<Course[]>(configUrl, {params: body}).toPromise().then(res => {
        this.ListOfCourse = res;
        console.log(this.ListOfCourse);
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  clearCourseAndLoadForm() {
    this.selectedCourseId = -1;
    this.loadForm();
  }

  loadForm() {
    const param = new HttpParams()
      .set('courseId', this.selectedCourseId + '')
      .set('centerId', this.centerId + '')
      .set('IsClosed', '1')
      .set('isCreatedClass', '0')
      .set('pageSize', '1000')
      .set('currentPage', '1');
    const url = this.apiContext.host + this.apiTraining.searchAdmissionForm;
    this.http.get<AdmissionForm[]>(url, {params: param}).toPromise().then(data => {
        this.ListOfForm = data;
        if (this.ListOfForm.length == null || this.ListOfForm.length <= 0) {
          this.empty = true;
        }
        console.log(this.ListOfForm);
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  GenerateClass() {
    const url = this.apiContext.host + this.apiTraining.generateClass;
    const param = new Array();
    this.listSelectedFormId.forEach(item => {
      param.push({AdmissionFormId: item, CenterId: this.centerId});
    });
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.loadForm();
        this.listSelectedFormId = [];
        this.toastr.success(this.listSelectedFormId.length + ' class(es) was generated successfully.', 'Success!');
      },
      error => {
        console.log(error);
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  generateClass(Id: number, Name: string) {
    const url = this.apiContext.host + this.apiTraining.generateClass;
    const param = new Array();
    param.push({AdmissionFormId: Id, CenterId: this.centerId});
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.loadForm();
        this.toastr.success('1 class was generated from ' + Name + ' successfully.', 'Success!');
        this.getNotJoinClassStudentListByFormId(Id);
        this.getAvailbleClasses(Id);
      },
      error => {
        console.log(error);
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  getNotJoinClassStudentListByFormId(fId: number) {
    const param = new HttpParams()
      .set('admissionFormId', fId + '')
      .set('centerId', this.centerId + '');
    const url = this.apiContext.host + this.apiTraining.getNotJoinClassStudentList;
    this.http.get<Student[]>(url, {params: param}).toPromise().then(data => {
        this.notJoinStudentList = data;
        if (this.notJoinStudentList.length != null && this.notJoinStudentList.length > 0) {
          const btnModal: HTMLElement = document.getElementById('btnModal') as HTMLElement;
          btnModal.click();
        }
        console.log(this.notJoinStudentList);
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }

  openAttendanceForm(longContent) {
    console.log(this.modalService);
    this.modalService.open(longContent, {size: 'lg'});
  }

  addToClass(value: any, studentId: string, Name: string) {
    this.isLoading = true;
    const url = this.apiContext.host + this.apiTraining.updateStudentInClass;
    const param = new HttpParams()
      .set('ClassID', value == undefined ? '-1' : value + '')
      .set('StudentId', studentId + '')
      .set('RemoveOrAdd', true + '')
      .set('CenterId', this.centerId + '');
    this.http.post(url, param).toPromise().then(data => {
        console.log(data);
        this.isLoading = false;
        this.toastr.success('Add student ' + Name + ' to class successfully.', 'Success!');
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Something goes wrong. Please try again.', 'Oops!');
      });
  }

  private getAvailbleClasses(Id: number) {
    const param = new HttpParams()
      .set('admissionFormId', Id + '')
      .set('centerId', this.centerId + '');
    const url = this.apiContext.host + this.apiTraining.getClassListByAdmissionForm;
    this.http.get<Class[]>(url, {params: param}).toPromise().then(data => {
        this.availableClassList = data;
        console.log(this.availableClassList);
      },
      error => {
        console.log(error);
        this.toastr.info('Something is not working right. Please try again soon.');
      });
  }
}
