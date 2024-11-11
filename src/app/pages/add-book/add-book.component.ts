import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  
  constructor(private booksService: BooksService,
              private router:Router) {}

  public addBook(title: string, type: string, author: string, price: number, photo: string) {

    const newBook = new Book(title, type, author, price, photo);

    this.booksService.add(newBook);

    (document.getElementById("title") as HTMLInputElement).value = '';
    (document.getElementById("type") as HTMLInputElement).value = '';
    (document.getElementById("author") as HTMLInputElement).value = '';
    (document.getElementById("price") as HTMLInputElement).value = ''; 
    (document.getElementById("photo") as HTMLInputElement).value = '';

    window.alert("Libro se ha añadido!"); 
    this.router.navigate(["/books"]);
  }
}


