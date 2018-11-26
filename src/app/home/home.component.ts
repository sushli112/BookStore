import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Observable, Observer, Subscription } from "rxjs";
import "rxjs/Rx";
import { Book } from "../Book";
import { BookService } from "../book.service";
import { element } from "protractor";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentReadList: Book[] = [];
  wantToReadList: Book[] = [];
  readList: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => {
      console.log(data);
      data.forEach(book => {
        if (book.status === "currentlyReading") {
          this.currentReadList.push(book);
        } else if (book.status === "wantToRead") {
          this.wantToReadList.push(book);
        } else if (book.status === "read") {
          this.readList.push(book);
        }
      });
    });

    this.bookService.searchSubject.subscribe((book: Book) => {
      if (book.status === "currentlyReading") {
        this.currentReadList.push(book);
      } else if (book.status === "wantToRead") {
        this.wantToReadList.push(book);
      } else if (book.status === "read") {
        this.readList.push(book);
      }
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
      let found = this.wantToReadList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.wantToReadList = this.currentReadList.filter(
          element => element.id != +id
        );
        found.status = "currentlyReading";
        this.currentReadList.push(found);
      }

      found = this.readList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.readList = this.readList.filter(element => element.id != +id);
        found.status = "currentlyReading";
        this.currentReadList.push(found);
      }
    } else if (event.target.value === "wantToRead") {
      let found = this.currentReadList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.currentReadList = this.currentReadList.filter(
          element => element.id != +id
        );
        found.status = "wantToRead";
        this.wantToReadList.push(found);
      }

      found = this.readList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.readList = this.readList.filter(element => element.id != +id);
        found.status = "wantToRead";
        this.wantToReadList.push(found);
      }
    } else if (event.target.value === "read") {
      let found = this.currentReadList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.currentReadList = this.currentReadList.filter(
          element => element.id != +id
        );
        found.status = "read";
        this.readList.push(found);
      }

      found = this.wantToReadList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.wantToReadList = this.wantToReadList.filter(
          element => element.id != +id
        );
        found.status = "read";
        this.readList.push(found);
      }
    } else if (event.target.value === "none") {
      let found = this.currentReadList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.currentReadList = this.currentReadList.filter(
          element => element.id != +id
        );
      }

      found = this.wantToReadList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.wantToReadList = this.wantToReadList.filter(
          element => element.id != +id
        );
      }

      found = this.readList.find(function(element) {
        return element.id === +id;
      });
      if (found !== undefined) {
        this.readList = this.readList.filter(element => element.id != +id);
      }
    }

    this.bookService.updateBackendServer(id, event.target.value);
  }
}
