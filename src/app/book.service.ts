import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Book } from "./Book";
import "rxjs/add/operator/map";
import { Observable, Subject } from "rxjs";

@Injectable()
export class BookService {
  serverUrl = "http://localhost:8080/books";
  searchSubject = new Subject();

  constructor(private http: Http) {}

  getBooks(): Observable<Book[]> {
    return this.http.get(this.serverUrl).map(res => {
      console.log(res);
      return res.json().map((book: Book) => new Book().deserialize(book));
    });
  }
  updateBackendServer(id: string, status: string) {
    let serverUrl = this.serverUrl + "/" + id;
    let currentInfo = this.http.get(serverUrl).map(res => {
      return res.json();
    });
    currentInfo.subscribe(data => {
      data.status = status;
      let bookUrl = this.serverUrl + "/" + id;
      let response = this.http.put(bookUrl, data).map(success => {
        return success.status;
      });
      response.subscribe(res => {
        console.log(res);
        console.log("record updated");
      });
    });
  }
}
