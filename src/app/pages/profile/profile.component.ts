import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public miUser:User;
  public isHidden1:boolean;
  public isHidden2: boolean;

  constructor() {
    this.miUser = new User("12345", "Juan",  "Perez Garcia", "juanperezgarcia@gmail.com","https://th.bing.com/th/id/OIP.RctxUOwRywWZ8AKf6Nec7QHaIQ?w=181&h=203&c=7&r=0&o=5&pid=1.7", "passwd");
    this.isHidden1= true;
    this.isHidden2= true;
  }

  public newName(nuevoName: HTMLInputElement){
    if (nuevoName.value) {
    this.miUser.name = nuevoName.value;
    console.log(this.miUser.name);
    nuevoName.value = '';
    return true;
    }
    return false;
  }

  public newLast(nuevoLast: HTMLInputElement){
    if (nuevoLast.value) {
    this.miUser.last_name = nuevoLast.value;
    nuevoLast.value = '';
    return true;
    }
    return false;
  }

  public newEmail(nuevoEmail: HTMLInputElement){
    if (nuevoEmail.value) {
    this.miUser.email = nuevoEmail.value;
    nuevoEmail.value = '';
    return true;
    }
    return false;
  }

  public newUrl(nuevoUrl: HTMLInputElement){
    if (nuevoUrl.value) {
    this.miUser.photo = nuevoUrl.value;
    nuevoUrl.value = '';
    return true;
    }
    return false;
  }

  public modDatos(name: HTMLInputElement, last_name: HTMLInputElement, email: HTMLInputElement, url: HTMLInputElement) {
    let nameUpdated = this.newName(name);
    let lastUpdated = this.newLast(last_name);
    let emailUpdated = this.newEmail(email);
    let urlUpdated = this.newUrl(url);

    this.isHidden1= true;
    this.isHidden2= true;

    if (nameUpdated || lastUpdated || emailUpdated || urlUpdated) {
        this.isHidden1 = false;
    } else {
        this.isHidden2 = false;
    }

    setTimeout(() => {
      this.isHidden1 = true;
      this.isHidden2 = true;
  }, 3000);
}

}
