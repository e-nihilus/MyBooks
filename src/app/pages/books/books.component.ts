import { Component } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  public books: Book[] = [];

  constructor() {
    this.books = [
      new Book("El Señor de los Anillos", "blanda", "J.R.R. Tolkien", 45.99, "https://th.bing.com/th/id/OIP.09ewS42LCUHAmk8zt-ETUQHaK5?w=193&h=284&c=7&r=0&o=5&pid=1.7"),
      //new Book("Viaje al Centro de la Tierra", "blanda", "Julio Verne", 19.99, "https://th.bing.com/th/id/OIP.hfKiqqxjHlLn09SByMiMBwHaKN?w=195&h=270&c=7&r=0&o=5&pid=1.7"),
      new Book("Dune", "blanda", "Frank Herbert", 29.99, "https://th.bing.com/th/id/OIP.cvoSdGRO8TtT-zw5N0qAAQHaLL?w=195&h=295&c=7&r=0&o=5&pid=1.7"),
      new Book("En las Montañas de la Locura", "dura", "H.P. Lovecraft", 17.99, "https://th.bing.com/th/id/OIP._pQnuIhVJPq4C-GN7eqghAHaLL?w=195&h=295&c=7&r=0&o=5&pid=1.7"),
    ];
  }

  public addBook(title:string, type:string, author:string, price:string, photo:string){
    const newBook = new Book(title, type, author, parseFloat(price.toString()), photo);
    this.books.push(newBook);

    (document.getElementById("title") as HTMLInputElement).value = '';
    (document.getElementById("type") as HTMLInputElement).value = '';
    (document.getElementById("author") as HTMLInputElement).value = '';
    (document.getElementById("price") as HTMLInputElement).value = '';
    (document.getElementById("photo") as HTMLInputElement).value = '';
  }

}