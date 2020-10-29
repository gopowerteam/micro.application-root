import { NgModule, Optional, SkipSelf, ModuleWithProviders, APP_INITIALIZER } from '@angular/core'
import { CommonModule, APP_BASE_HREF } from '@angular/common'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsModule } from '@ngxs/store'
import { environment } from 'src/environments/environment'
import { states } from '../store'
import { throwIfAlreadyLoaded } from './module-import-guard'
import { LaunchService } from './services/launch.service'
import { BrowserTransferStateModule } from '@angular/platform-browser'

const GLOBAL_THIRD_MODULES = [
  NgxsModule.forRoot(states, { developmentMode: !environment.production }),
  NgxsStoragePluginModule.forRoot()
]

const launchFactory = (launchService: LaunchService) => () => launchService.start()

const appBaseHrefFactory = () => '/'

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserTransferStateModule, ...GLOBAL_THIRD_MODULES],
  exports: [NgxsModule, NgxsStoragePluginModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }

  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LaunchService,
        {
          provide: APP_INITIALIZER,
          useFactory: launchFactory,
          deps: [LaunchService],
          // deps: [TransferState, PLATFORM_ID, [new Optional(), new Inject('APPLICATION_CONFIG')]],
          multi: true
        },
        {
          provide: APP_BASE_HREF,
          useFactory: appBaseHrefFactory
        }
        // {
        //   provide: APP_INITIALIZER,
        //   useFactory: ApplicationStartUp,
        //   deps: [TransferState, PLATFORM_ID, [new Optional(), new Inject('APPLICATION_CONFIG')]],
        //   multi: true
        // },
        // { provide: NZ_I18N, useValue: zh_CN }
      ]
    }
  }
}
