import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public books: Book[] = [];  
  public filteredBooks: Book[] = []; 
  public searchId: number; 

  constructor(private booksService: BooksService,
              private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks(); 
  }

  loadBooks(): void {
    this.books = this.booksService.getAll(); 
    this.filteredBooks = this.books; 
  }

  busc(): void {
    const id = Number(this.searchId); 
    if (this.searchId) {
      const foundBooks = this.books.filter(book => book.id_book === id);
      if (foundBooks.length === 0) {
        this.toastr.error('Este Id no existe', 'Error',{
          positionClass: 'toast-top-center',
        });
      }
      this.filteredBooks = foundBooks;
    } else {
      this.filteredBooks = this.books; 
    }
  }

  elim(book: Book): void {
    this.booksService.delete(book.id_book); 
    this.loadBooks(); 
  }
}
