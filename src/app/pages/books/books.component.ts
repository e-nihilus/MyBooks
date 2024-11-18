import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
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
  public searchId: number | null = null; 

  constructor(private booksService: BooksService,
              private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks(); 
  }

  loadBooks(): void {
    this.booksService.getAll().subscribe(
      (response: any) => {
        this.books = response.data || [];
        this.filteredBooks = this.books; 

        if (this.books.length === 0) {
          this.filteredBooks = []; 
        }
      },
      error => {
        this.toastr.error("Error en la conexión", "Error", {
          timeOut: 2000, positionClass: 'toast-top-center'
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
          timeOut: 2000,  positionClass: 'toast-top-center',
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
      response => {
        this.toastr.success("Libro eliminado correctamente", "Éxito", {
          timeOut: 2000, positionClass: 'toast-top-center',
        });
        this.loadBooks(); 
      },
      error => {
        this.toastr.error("Error en la conexión", "Error", {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
      }
    );
  }
}