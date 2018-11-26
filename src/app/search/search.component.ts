import { Component, OnInit } from "@angular/core";
import { Book } from "../Book";
import { BookService } from "../book.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  searchList: Book[] = [];
  constructor(private bookService: BookService) {}

  ngOnInit() {}
  displaySearchedResult(event) {
    let searchInput = event.target.value;
    console.log(searchInput);
    this.bookService.getBooks().subscribe(data => {
      console.log(data);
      this.searchList = [];
      data.forEach(book => {
        let title = book.title.toLowerCase();
        let searchValue = searchInput.toLowerCase();
        if (book.status === "none" && title.indexOf(searchValue) >= 0) {
          this.searchList.push(book);
        }
      });
    });
  }
  isMatchingStatus(expected: string, actual: string): boolean {
    if (expected === actual) {
      return true;
    } else {
      return false;
    }
  }
  changeValue(event, id: string) {
    console.log(event.target.value);
    if (event.target.value === "currentlyReading") {
      let found = this.searchList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.searchList = this.searchList.filter(element => element.id != +id);
        found.status = "currentlyReading";
        this.bookService.searchSubject.next(found);
      }
    } else if (event.target.value === "wantToRead") {
      let found = this.searchList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.searchList = this.searchList.filter(element => element.id != +id);
        found.status = "wantToRead";
        this.bookService.searchSubject.next(found);
      }
    } else if (event.target.value === "read") {
      let found = this.searchList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.searchList = this.searchList.filter(element => element.id != +id);
        found.status = "read";
        this.bookService.searchSubject.next(found);
      }
    }

    this.bookService.updateBackendServer(id, event.target.value);
  }
}
