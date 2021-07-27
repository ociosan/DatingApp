import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /*Input() usersFromHomeComponent: any;  Parent to child */
  @Output() cancelRegister = new EventEmitter;/* Child to Parent*/
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(
      private accountService: AccountService, 
      private toastr: ToastrService, 
      private fb: FormBuilder,
      private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  /* Create a reactive form */
  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateofBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matcValues('password')]] /**match the confirm password with the password value */
    })

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  /* this is a custom function for matching words, in this case:  confirm password === password  */
  matcValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : { isMatching: true }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
        this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
        this.toastr.error(error.error);
      })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
