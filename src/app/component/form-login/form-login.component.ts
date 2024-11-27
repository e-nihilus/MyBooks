import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { RespuestaUsuario } from 'src/app/models/respuesta-usuario';  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  public user: User;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.user = new User(0, "", "", "", "", "");
  }


  onSubmit(form: NgForm) {
    this.userService.login(this.user).subscribe(
      (response: RespuestaUsuario) => {
        if (!response.error) {
          this.toastr.success("Inicio de sesion correcto", "Éxito",{
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          const user = response.data[0];

          this.userService.logueado = true;
          this.userService.user = response.data[0]; 
          this.userService.id_user = this.userService.user.id_user;
     
          this.router.navigate(['/books']);

        } 
        else {
          this.toastr.error("Datos incorrectos", "Érror",{
            timeOut: 2000, positionClass: 'toast-top-center'
          });
        }
      },
      (error) => {
        this.toastr.error("No se puede iniciar sesion", "Error",{
          timeOut: 2000, positionClass: 'toast-top-center'
        });;
      }
    );
  }

  ngOnInit(): void {}
}

