import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contact } from '../models/Contacts.models';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet,HttpClientModule,AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contactlyweb';
  http = inject(HttpClient);

  contactForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(''),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  });
  contacts$ = this.getContatc();

  onFormSubmit(){
    const addContactRequest ={
      name:this.contactForm.value.name,
      email:this.contactForm.value.email,
      phone:this.contactForm.value.phone,
      favorite:this.contactForm.value.favorite
    };
    this.http.post('https://localhost:7157/api/Context',addContactRequest)
    .subscribe({
      next:(value) =>{
        console.log(value);
        this.contacts$ = this.getContatc();
        this.contactForm.reset();
      }
    })
  };

  onDelete(id:string){
    this.http.delete(`https://localhost:7157/api/Context/${id}`)
    .subscribe({
      next:(value)=>{
        alert('Contact Deleted');
        this.contacts$ = this.getContatc();
      }
    });
  }

  private getContatc(): Observable<Contact[]> {
   return this.http.get<Contact[]>('https://localhost:7157/api/Context');

  }
}


