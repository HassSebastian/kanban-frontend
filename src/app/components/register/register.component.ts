import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private crudService: CrudService
  ) {}

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
