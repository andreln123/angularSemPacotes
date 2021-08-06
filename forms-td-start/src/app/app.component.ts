import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signForm: NgForm;
  defaultQuestion = "pet";
  answer: string;
  genders = ['male', 'female'];
  submitted = false;
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    /* this.signForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    }); */

    this.signForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  /* onSubmit(form: ElementRef) { */
  /* onSubmit(form: NgForm) {
    console.log(form.value.username);
  } */

  onSubmit() {
    /* console.log(this.signForm); */
    this.submitted = true;
    this.user.username = this.signForm.value.userData.username;
    this.user.email = this.signForm.value.userData.email;
    this.user.secretQuestion = this.signForm.value.secret;
    this.user.answer = this.signForm.value.questionAnswer;
    this.user.gender = this.signForm.value.gender;

    this.signForm.reset();
  }
}
