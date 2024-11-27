import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/models/book';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private url = 'http://localhost:3000/books';

  public searchId:number;

  constructor(private http: HttpClient, private userService: UserService) {}

  public getAll(){
    const id_user = this.userService.id_user; 
    return this.http.get(`${this.url}?id_user=${id_user}`);
  }

  public getOne() {
  const id_user = this.userService.id_user;
  const searchId = this.searchId;
  return this.http.get(`${this.url}?id_user=${id_user}&id_book=${searchId}`);
}

  public add(book: Book) {
    return this.http.post(this.url, book);
  }

  public edit(book: Book) {
    return this.http.put(this.url, book);
  }

  public delete(id_book: number) {
    const httpOptions = { headers: null, body: { id_book } };
    return this.http.delete(this.url, httpOptions);
  }
}
