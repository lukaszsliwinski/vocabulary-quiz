import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { ResultComponent } from './components/result/result.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryComponent } from './components/category/category.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ResultComponent,
    CategoryComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
