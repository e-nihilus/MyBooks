import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: Book[] = [];
  

  constructor() {
    this.books = [
      new Book("El Señor de los Anillos", "blanda", "J.R.R. Tolkien", 45.99, "https://th.bing.com/th/id/OIP.09ewS42LCUHAmk8zt-ETUQHaK5?w=193&h=284&c=7&r=0&o=5&pid=1.7"),
      new Book("Dune", "blanda", "Frank Herbert", 29.99, "https://th.bing.com/th/id/OIP.cvoSdGRO8TtT-zw5N0qAAQHaLL?w=195&h=295&c=7&r=0&o=5&pid=1.7"),
      new Book("En las Montañas de la Locura", "dura", "H.P. Lovecraft", 17.99, "https://th.bing.com/th/id/OIP._pQnuIhVJPq4C-GN7eqghAHaLL?w=195&h=295&c=7&r=0&o=5&pid=1.7"),
    ];
  }

  public getAll(): Book[]{
    return this.books;
  }

  public getOne(id_book: number):Book{
    return this.books.find(book => book.id_book === id_book);
  }

  public add(book:Book):void{
    this.books.push(book);

  }

  public edit(book: Book): boolean {
    const bookId = Number(book.id_book);
    const index = this.books.findIndex(b => b.id_book === bookId);

    if (index !== -1) {
        const modB = this.books[index];

        if (book.title) modB.title = book.title;
        if (book.type) modB.type = book.type;
        if (book.author) modB.author = book.author;
        if (book.price !== undefined && book.price !== null) modB.price = book.price;
        if (book.photo) modB.photo = book.photo;
        if (book.id_user !== undefined && book.id_user !== null) modB.id_user = book.id_user;
        
        return true; 
    }
    return false;
}


  public delete(id_book:number):boolean{
    const index = this.books.findIndex(book => book.id_book === id_book);
    if(index !== -1){
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }

}
