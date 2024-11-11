import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  public book: Book = new Book("","","",0,"");
  
  constructor(private booksService: BooksService,
              private router: Router,
              private toastr: ToastrService) {}

  public addBook(form: NgForm) {
    const { title, type, author, price, photo } = form.value;

    const newBook = new Book(title, type, author, price, photo);
    this.booksService.add(newBook);

    form.reset();

    this.toastr.success(title, 'Libro añadido!', {
      positionClass: 'toast-top-center'
    }); 
    this.router.navigate(["/books"]);
  }
}