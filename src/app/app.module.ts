import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAddTaskComponent } from './dialog/dialog-add-task/dialog-add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TaskInTableComponent } from './task-in-table/task-in-table.component';
import { DialogTaskDetailComponent } from './dialog/dialog-task-detail/dialog-task-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CloseButtonComponent } from './html-templates/close-button/close-button.component';
import { GreenPlusComponent } from './html-templates/green-plus/green-plus.component';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddTaskComponent,
    TaskInTableComponent,
    DialogTaskDetailComponent,
    CloseButtonComponent,
    GreenPlusComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
