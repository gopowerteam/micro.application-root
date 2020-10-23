import {
  BrowserModule,
  BrowserTransferStateModule,
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import {
  APP_INITIALIZER,
  Inject,
  InjectionToken,
  NgModule,
  Optional,
  PLATFORM_ID,
} from '@angular/core';

const SERVICEKEY = new InjectionToken('MY_SERVICE');
import { AppComponent } from './app.component';
import { isPlatformServer, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { LayoutModule } from './layout/layout.module';

registerLocaleData(zh);

const DashboardStartUp = (
  transferState: TransferState,
  platformId: string,
  MY_SERVICE: string
) => async () => {
  const transferKey: StateKey<string> = makeStateKey<string>('MY_SERVICE');
  if (isPlatformServer(platformId)) {
    transferState.set(transferKey, MY_SERVICE);
  } else {
    MY_SERVICE = transferState.get<string>(transferKey, '');
    // 初始化服务列表
  }

  return Promise.resolve();
};
@NgModule({
  imports: [
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    LayoutModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: DashboardStartUp,
      deps: [
        TransferState,
        PLATFORM_ID,
        [new Optional(), new Inject('MY_SERVICE')],
      ],
      multi: true,
    },
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
