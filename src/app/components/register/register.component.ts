import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  last_name: string = '';
  first_name: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  /**
   * Asynchronous method to handle user registration.
   *
   * - Calls the `registrWithUsernameEmailAndPassword` method of the `AuthService`
   *   to register a new user with the provided information.
   * - Navigates the user to the 'login' route after successful registration.
   * - Opens an error dialog and logs the error if registration fails.
   */
  async registerUser() {
    try {
      let resp = await this.authService.registrWithUsernameEmailAndPassword(
        this.first_name,
        this.last_name,
        this.email,
        this.username,
        this.password
      );
      this.router.navigateByUrl('login');
    } catch (error) {
      this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Registrierung',
          message: 'registrierung fehlgeschlagen',
        },
      });
      console.error(error);
    }
  }
}
