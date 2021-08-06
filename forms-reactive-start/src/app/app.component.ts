import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private genders = ['male', 'female'];
  private signupForm: FormGroup;
  private forbiddenUsernames = ['Chris', 'Anna'];

  public ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      /* 'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]), */
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    /* this.signupForm.valueChanges.subscribe(
      (value) => {
          console.log(value);
      }
    ); */

    this.signupForm.statusChanges.subscribe(
      (status) => {
          console.log(status);
      }
    );

    this.signupForm.setValue({
      'userData': {
        'username': 'André Luis Hirschmann',
        'email': 'andrelh@ciasc.sc.gov.br'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    });
  }

  public onSubmit(): void {
    /* console.log(this.signupForm); */
    this.signupForm.reset();
  }

  public onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  public forbiddenNames(control: FormControl): {[s: string]: boolean} {
    return (this.forbiddenUsernames.indexOf(control.value) !== -1 ? {'nameIsForbidden': true} : null);
  }

  public forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com')
            resolve({'emailIsForbidden': true});
          else
            resolve(null);
        }, 1500);
      });

      return promise;
  }
}
