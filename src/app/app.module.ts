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
import { isPlatformServer } from '@angular/common';

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
  declarations: [AppComponent],
  imports: [
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
  ],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
