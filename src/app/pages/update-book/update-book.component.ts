import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  public book: Book = new Book('', '', '', null, '', null);

  constructor(
    private booksService: BooksService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public modBook(): void {

    this.booksService.edit(this.book).subscribe(
      (response: Respuesta) => {
        console.log('Respuesta del backend:', response);
        if (!response.error) {
          this.toastr.success('Libro editado satisfactoriamente', 'Éxito', {
            timeOut: 2000,
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/books']);
          this.book = new Book('', '', '', null, '', null); 
        } else {
          this.toastr.error('No se pudo editar el libro', 'Error');
        }
      },
      (error) => {
        console.error('Error en la conexión:', error);
        this.toastr.error('Error en la conexión', 'Error');
      }
    );
  }
}
