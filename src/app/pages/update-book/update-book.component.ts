import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta'; 

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent { 
  

  public book: Book = new Book('', '', '', null, '', null); 

  constructor(private booksService: BooksService, private router: Router, private toastr: ToastrService) {}

  public modBook(title: string, type: string, author: string, price: number, photo: string, id_book: number): void {
    this.book = new Book(title, type, author, price, photo, id_book);

    this.booksService.edit(this.book).subscribe(
      (response: Respuesta) => { 
        if (!response.error) { 
          this.toastr.success("Libro editado satisfactoriamente", "Exito", {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/books']);
          this.book = new Book('', '', '', 0, '', 0); 
        } else {
          this.toastr.error("El Ref no existe", "Error", {
            timeOut: 2000, positionClass: 'toast-top-center'
          });
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