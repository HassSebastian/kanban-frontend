import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAddTaskComponent } from './dialog/dialog-add-task/dialog-add-task.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { DialogTaskDetailComponent } from './dialog/dialog-task-detail/dialog-task-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CloseButtonComponent } from './html-templates/close-button/close-button.component';
import { GreenPlusComponent } from './html-templates/green-plus/green-plus.component';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskInTableComponent } from './components/task-in-table/task-in-table.component';
import { LoginComponent } from './components/login/login.component';
import { BoardComponent } from './components/board/board.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MembersComponent } from './html-templates/members/members.component';
import { CollaboratorsComponent } from './html-templates/collaborators/collaborators.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddTaskComponent,
    DialogTaskDetailComponent,
    CloseButtonComponent,
    GreenPlusComponent,
    TaskInTableComponent,
    LoginComponent,
    BoardComponent,
    RegisterComponent,
    MembersComponent,
    CollaboratorsComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
