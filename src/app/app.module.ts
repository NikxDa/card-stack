import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CardStackComponent } from './components/card-stack/card-stack.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardStackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
