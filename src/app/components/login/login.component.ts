import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * Asynchronous method to handle user login.
   *
   * This method uses the `AuthService` to authenticate the user with a username and password.
   * If the login is successful, the authentication token and user ID are stored in the local storage,
   * and the user is navigated to the 'board' route.
   *
   * @throws {any} If there is an error during the login process, the `loginError` method is called.
   */
  async login() {
    try {
      let resp: any = await this.authService.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      localStorage.setItem('token', resp['token']);
      localStorage.setItem('user', resp['user_id']);
      this.router.navigateByUrl('board');
    } catch (error: any) {
      this.loginError(error);
    }
  }

  /**
   * Handles and displays appropriate error messages for login failures.
   *
   * @param error The error object received during the login process.
   * - If the error status is 0, opens an error dialog indicating that the server is currently unreachable.
   * - For other error statuses, opens an error dialog indicating a login failure.
   * - Logs the error to the console for further analysis.
   */
  loginError(error: any) {
    if (error.status === 0) {
      this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Server',
          message: 'Der Server ist gerade nicht erreichbar',
        },
      });
    } else {
      this.dialog.open(ErrorDialogComponent, {
        data: { title: 'Login', message: 'login fehlgeschlagen' },
      });
      console.error('Fehler =', error);
    }
  }
}
