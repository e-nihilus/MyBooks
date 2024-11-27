import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { Respuesta } from 'src/app/models/respuesta'; 
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  id_user = this.userService.id_user;
  public book: Book = new Book('', '', '', 0, '', 0, this.id_user); 
  constructor(private booksService: BooksService, private router:Router, private toastr: ToastrService, private userService: UserService) {}

  public addBook(form: NgForm) {

    this.booksService.add(this.book).subscribe(
      (resp: Respuesta) => { 
        if (!resp.error) { 
          this.toastr.success("Libro añadido satisfactoriamente", "Exito", {
            timeOut: 2000, positionClass: 'toast-top-center'});
            this.router.navigate(['/books']);
          this.book = new Book('', '', '', 0, ''); 
        } 
      },
      error => {
        this.toastr.error("Error en la conexión", "Error", {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
      }
    );
  }
}