import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe} from '@angular/common';

import { ClipService } from './_services/clip.service';
import { NgbdSortableHeader } from './_helpers/sortable.directive';
// import ngx-smart-modal
import { NgxSmartModalModule } from 'ngx-smart-modal';
// import for mat-video
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiveComponent } from './live/live.component';
import { RecordingComponent } from './recording/recording.component';
import { ManagementComponent } from './management/management.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveComponent,
    RecordingComponent,
    ManagementComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    MatVideoModule
  ],
  providers: [ClipService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
