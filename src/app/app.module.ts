import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FormRegisterComponent } from './component/form-register/form-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BooksComponent } from './pages/books/books.component';
import { PipeBookCodePipe } from './pipes/pipe-book-code.pipe';
import { CardComponent } from './component/card/card.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { LoginComponent } from './pages/login/login.component';
import { FormLoginComponent } from './component/form-login/form-login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'books', component: BooksComponent },
  { path: 'addBook', component: AddBookComponent },
  { path: 'updateBook', component: UpdateBookComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FormRegisterComponent,
    RegisterComponent,
    ProfileComponent,
    BooksComponent,
    PipeBookCodePipe,
    CardComponent,
    AddBookComponent,
    UpdateBookComponent,
    LoginComponent,
    FormLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
