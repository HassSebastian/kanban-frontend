import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

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
}
