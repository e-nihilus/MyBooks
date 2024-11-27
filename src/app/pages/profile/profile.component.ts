import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaUsuario } from 'src/app/models/respuesta-usuario'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userId:number = this.userService.user.id_user
  public user: User = new User(this.userId, '', '', '', '', '');
  public isHidden1: boolean = true; 
  public isHidden2: boolean = true; 

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.user = { ...this.userService.user };
  }

  public modDatos(name: string, last_name: string, email: string, photo: string): void {
    if (!this.user) return;
  
    const updatedUser = { ...this.user };
  
    let hasChanges = false;
    if (name && name !== this.user.name) {
      updatedUser.name = name;
      hasChanges = true;
    }
    if (last_name && last_name !== this.user.last_name) {
      updatedUser.last_name = last_name;
      hasChanges = true;
    }
    if (email && email !== this.user.email) {
      updatedUser.email = email;
      hasChanges = true;
    }
    if (photo && photo !== this.user.photo) {
      updatedUser.photo = photo;
      hasChanges = true;
    }
  
    if (!hasChanges) {
      this.isHidden2 = false; 
      setTimeout(() => (this.isHidden2 = true), 3000);
      return;
    }
  
    this.userService.modUser(updatedUser).subscribe(
      (response: RespuestaUsuario) => {
        if (!response.error) {
          this.toastr.success("Datos actualizados correctamente", "Éxito", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
          });
          this.user = { ...updatedUser }; 
          this.isHidden1 = false; 
          setTimeout(() => (this.isHidden1 = true), 3000);
          name = "";
          last_name = "";
          email = "";
          photo = "";
        } else {
          this.toastr.error("No se pudo actualizar el usuario", "Error", {
            timeOut: 2000,
            positionClass: 'toast-top-center',
          });
        }
      },
      (error) => {
        this.toastr.error("Error en la conexión", "Error", {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
  

  public logOut(): void {
    this.userService.logueado = false;
    this.userService.user = null; 
    this.toastr.success('Cierre de sesión correcto', 'Éxito', {
      timeOut: 2000,
      positionClass: 'toast-top-center',
    });
    this.router.navigate(['/login']);
  }
}
