import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';  
import { Router } from '@angular/router';  
import { ToastrService } from 'ngx-toastr';
import { RespuestaUsuario } from 'src/app/models/respuesta-usuario';   


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {

  public regisForm: FormGroup;
  public user: User;

  constructor(private formBuilder: FormBuilder,  private userService: UserService, private router: Router, private toastr: ToastrService){
    this.buildForm()
  }

  public register() {
    this.user = this.regisForm.value;
    this.userService.register(this.user).subscribe(
      (response: RespuestaUsuario) => {
        if (response.error) {
          this.toastr.error("Ha ocurrido un error", "Error",{
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        } 
        else {
          this.toastr.success("Usuario registrado", "Éxito",{
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.toastr.error("No se ha podido registrar el usuario", "Error",{
          timeOut: 2000, positionClass: 'toast-top-center'
        });
      }
    );
  }

  private buildForm(){
    const minPassLength = 8;

    this.regisForm = this.formBuilder.group({
      name: [, Validators.required],
      last_name: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      photo: [, Validators.required],
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
