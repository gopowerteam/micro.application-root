import {
  BrowserModule,
  BrowserTransferStateModule,
  makeStateKey,
  StateKey,
  TransferState
} from '@angular/platform-browser'
import { APP_INITIALIZER, Inject, NgModule, Optional, PLATFORM_ID } from '@angular/core'
import { AppComponent } from './app.component'
import { isPlatformServer, registerLocaleData } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { states } from './store'
import { LayoutModule } from './layout/layout.module'
import { DevToolsComponent } from './components/dev-tools/dev-tools.component'
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { NgxsModule } from '@ngxs/store'

@NgModule({
  imports: [
    SharedModule,
    CoreModule.forRoot(),
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    LayoutModule
  ],
  declarations: [AppComponent, DevToolsComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
