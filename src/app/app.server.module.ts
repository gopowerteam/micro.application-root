import {
  APP_INITIALIZER,
  InjectionToken,
  NgModule,
  Optional,
} from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
const MY_SERVICE = new InjectionToken('MY_SERVICE');

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
