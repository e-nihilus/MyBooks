import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent { 

  constructor(private booksService: BooksService,
              private router:Router,
              private toastr: ToastrService) {}

  public modBook(title: string, type: string, author: string, price: number, photo: string, code: number): void {

    const bookMod = new Book(title, type, author, price, photo, code);
            
    const ext = this.booksService.edit(bookMod);
            
    if (ext) {
      this.toastr.success('Libro modificado', 'Exito',{
        positionClass: 'toast-top-center'
      })

      this.router.navigate(['/books']);
  } 
  else {
    this.toastr.error('No se ha encontrado el Id del libro', 'Error',{
      positionClass: 'toast-top-center'
    });
  }
  }
            
}
