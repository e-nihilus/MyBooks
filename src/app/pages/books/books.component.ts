import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public books: Book[] = [];  
  public filteredBooks: Book[] = []; 
  public searchId: number = this.booksService.searchId; 

  constructor(
    private booksService: BooksService, 
    private userService: UserService, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks(); 
  }

  loadBooks(): void {
    const id_user = this.userService.id_user; 
    if (!id_user) {
      this.toastr.error("No se encontró el ID del usuario", "Error", {
        timeOut: 2000,
        positionClass: 'toast-top-center'
      });
      return;
    }

    this.booksService.getAll().subscribe(
      (response: Respuesta) => {
        if (!response.error) {
          this.books = response.data || [];
          this.filteredBooks = this.books;
        } else {
          this.toastr.error(response.mensaje, "Error", {
            timeOut: 2000,
            positionClass: 'toast-top-center'
          });
        }
      },
      error => {
        this.toastr.error("Error en la conexión con el servidor", "Error", {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }

  busc(): void {
    const id = Number(this.searchId); 
    if (this.searchId) {
      const foundBooks = this.books.filter(book => book.id_book === id);
      if (foundBooks.length === 0) {
        this.toastr.error("Este Ref no existe", "Error", {
          timeOut: 2000,  
          positionClass: 'toast-top-center',
        });
        this.filteredBooks = []; 
      } else {
        this.filteredBooks = foundBooks; 
      }
    } else {
      this.filteredBooks = this.books; 
    }
  }
  

  elim(book: Book): void {
    this.booksService.delete(book.id_book).subscribe(
      (response: Respuesta) => {
        if (!response.error) {
          this.toastr.success("Libro eliminado", "Éxito", {
            timeOut: 2000,
            positionClass: 'toast-top-center'
          });
          this.loadBooks(); 
        } else {
          this.toastr.error("Fallo al eliminar", "Error", {
            timeOut: 2000,
            positionClass: 'toast-top-center'
          });
        }
      },
      error => {
        this.toastr.error("Error en la conexión con el servidor", "Error", {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }
}
