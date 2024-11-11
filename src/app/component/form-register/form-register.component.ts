import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {

  public regisForm: FormGroup;
  public user: User;

  constructor(private formBuilder: FormBuilder){
    this.buildForm()
  }

  public register() {
    this.user = this.regisForm.value;
  }

  private buildForm(){
    const minPassLength = 8;

    this.regisForm = this.formBuilder.group({
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      url: [, Validators.required],
      password: [, [Validators.required, Validators.minLength(minPassLength), this.checkPasswdComplex]],
      password2:[,[Validators.required, this.checkPasswords]]
    })
  }

  private checkPasswdComplex(control: AbstractControl) {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasNumber || !hasSpecialChar) {
      return { passwdComplex: true };
    }
    
    return null;
  }

  private checkPasswords(control: AbstractControl)
  {
    let resultado = {matchPassword: true};

    if (control.parent?.value.password == control.value)
      resultado = null;

    return resultado;
  }

  ngOnInit(): void {
  }

}
