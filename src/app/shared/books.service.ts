import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public book:Book;

  private url = 'http://localhost:3000/books';


  constructor(private http: HttpClient) {}

  public getAll(){
    return this.http.get(this.url);
  }

  public getOne(id_book: number){
    return this.http.get(`${this.url}?id_book=${id_book}`);
  }

  public add(book: Book){
    return this.http.post(this.url, book);
  }

  public edit(book: Book){
    return this.http.put(this.url, book);
  }

  public delete(id_book: number){
    const httpOptions = { headers: null, body: { id_book } };
    return this.http.delete(this.url, httpOptions);
  }
}