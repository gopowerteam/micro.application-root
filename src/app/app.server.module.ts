import { APP_INITIALIZER, InjectionToken, NgModule, Optional } from '@angular/core'
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppModule } from './app.module'
import { AppComponent } from './app.component'
import { zh_CN, NzI18nModule, NZ_I18N } from 'ng-zorro-antd/i18n'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule, HttpClientModule, NoopAnimationsModule, NzI18nModule],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class AppServerModule {}
