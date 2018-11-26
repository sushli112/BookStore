import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { routes } from "../app/app.route";
import { AppComponent } from "./app.component";
import { Angular2FontawesomeModule } from "angular2-fontawesome/angular2-fontawesome";
import { SearchComponent } from "./search/search.component";
import { BookService } from "./book.service";

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, SearchComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule {}
