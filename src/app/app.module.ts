import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import {GITService} from './Services/git.service';

@NgModule({
  imports: [ BrowserModule, HttpModule],
  declarations: [ AppComponent ],
    providers: [GITService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
