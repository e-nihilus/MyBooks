import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent { 

  constructor(private booksService: BooksService,
              private router:Router) {}

  public modBook(title: string, type: string, author: string, price: number, photo: string, code: number): void {

    const bookMod = new Book(title, type, author, price, photo, code);
            
    const ext = this.booksService.edit(bookMod);
            
    if (ext) {
      alert("Libro actualizado con exito");
      this.router.navigate(["/books"]);
    } 
    else {
      alert("Error: No se encontró el libro para actualizar.");
      }
  }
            
}
