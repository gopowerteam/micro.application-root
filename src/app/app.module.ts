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
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'
import zh from '@angular/common/locales/zh'
import { LayoutModule } from './layout/layout.module'
import { DevToolsComponent } from './components/dev-tools/dev-tools.component'
import { SharedModule } from './shared/shared.module'
// import { setup } from '../micro-setup'

// 注册语言
registerLocaleData(zh)

/**
 * 应用启动逻辑
 * @param transferState
 * @param platformId
 * @param SERVICES
 */
const ApplicationStartUp = (
  transferState: TransferState,
  platformId: string,
  applicationConfig: () => Promise<string>
) => async () => {
  const transferKey: StateKey<string> = makeStateKey<string>('APPLICATION_CONFIG')
  if (isPlatformServer(platformId)) {
    transferState.set(transferKey, await applicationConfig())
  } else {
    // 获取配置信息
    const config = transferState.get<string>(transferKey, '')
    // 初始化为微服务服务
    const { setup } = await import('../micro-setup')
    setup(config)
  }

  return Promise.resolve()
}
@NgModule({
  imports: [
    SharedModule,
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    LayoutModule
  ],
  declarations: [AppComponent, DevToolsComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationStartUp,
      deps: [TransferState, PLATFORM_ID, [new Optional(), new Inject('APPLICATION_CONFIG')]],
      multi: true
    },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
