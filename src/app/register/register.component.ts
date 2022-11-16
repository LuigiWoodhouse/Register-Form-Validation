import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

interface Gender {
  value: string;
  genderValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fieldTextType!: boolean;

  constructor(private modalService: BsModalService,
    private toastr: ToastrService) { }

  registerFormControl!: FormGroup;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  hide = true;


  //MODAL SPECIFICATIONS
  modalRef!: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md test'

  };

  // ERROR DISPLAY 
  get f() {
    return this.registerFormControl.controls;
  }

  // GENDER
  genders: Gender[] = [
    { value: 'Male', genderValue: 'Male' },
    { value: 'Female', genderValue: 'Female' }

  ];

  //MODAL TO CONFIRM ACCOUNT DETAILS
  openRegister(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);

  }

  //NOTIFICATION MESSAGE INDICATING SUCCESSFUL ACCOUNT CREATION
  showToaster() {
    this.toastr.success('Your account has been succesfully registered','check your browser conole by right click and inspect element');
  }


  //SAVE ACCOUNT DATA TO DATABASE AND REDIRECT USER TO HOMEPAGE
  register() {
    console.log(this.registerFormControl.value)
    this.showToaster();
    this.registerFormControl.reset();
  }


  //PHONE NUMBER FORMATTING
  numberMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,];


  // VALIDATORS FOR FORMFIELDS
  ngOnInit(): void {
    this.registerFormControl = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'phoneNumber': new FormControl(null, Validators.minLength(10)),
      'userName': new FormControl(null, Validators.minLength(3)),
      'passWord': new FormControl(null, Validators.minLength(6)),
      'securityQuestion': new FormControl(null, Validators.required),
      'securityQuestionAnswer': new FormControl(null, Validators.required),
    })
  }
}
