import { Injectable, Injector, Inject, PLATFORM_ID, Optional } from '@angular/core'
import { Store } from '@ngxs/store'
// import { UpdateDictAction } from 'app/store/action/dict.action'
import localeZh from '@angular/common/locales/zh-Hans'
import { isPlatformServer, registerLocaleData } from '@angular/common'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'
import zh from '@angular/common/locales/zh'
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser'

// 注册语言
registerLocaleData(zh)

// /**
//  * 应用启动逻辑
//  * @param transferState
//  * @param platformId
//  * @param SERVICES
//  */
// const ApplicationStartUp = (
//   transferState: TransferState,
//   platformId: string,
//   applicationConfig: () => Promise<string>
// ) => async () => {
//   const transferKey: StateKey<string> = makeStateKey<string>('APPLICATION_CONFIG')
//   if (isPlatformServer(platformId)) {
//     transferState.set(transferKey, await applicationConfig())
//   } else {
//     // 获取配置信息
//     const config = transferState.get<string>(transferKey, '')
//     // 初始化为微服务服务
//     const { setup } = await import('../micro-setup')
//     setup(config)
//   }

//   return Promise.resolve()
// }

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class LaunchService {
  constructor(
    private store: Store,
    @Inject(TransferState) private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string,
    @Optional() @Inject('APPLICATION_CONFIG') private config: () => Promise<string>
  ) {}

  public async start() {
    this.getApplicationConfig(this.config)
      .then(this.generateApplicationList)
      .then(this.setupMicroService)
      .catch(() => {})
  }

  /**
   * 生成应用列表
   * @param config
   */
  private async generateApplicationList(config) {
    this.store.selectSnapshot((state) => state.config)
  }

  /**
   * 获取应用配置
   */
  private async getApplicationConfig(config: () => Promise<string>) {
    const transferKey: StateKey<string> = makeStateKey<string>('APPLICATION_CONFIG')

    if (isPlatformServer(this.platformId)) {
      this.transferState.set(transferKey, await config())
    } else {
      // 获取配置信息
      return this.transferState.get<string>(transferKey, '')
    }
  }

  /**
   * 安装微服务相关
   * @param configs
   */
  private async setupMicroService(configs) {
    if (!configs) {
      return
    }

    this.registerMicroApplication(configs)
  }

  /**
   * 注册微服务应用
   * @param configs
   */
  private async registerMicroApplication(configs) {
    // 生成应用配置
    const generateMicroConfig = (app) => {
      const appPath = app.path && `${app.path}/`
      return {
        name: app.name,
        entry: `http://${app.host}:${app.port}/${appPath}`,
        container: '#application-container',
        activeRule: `/${app.name}`
      }
    }

    // 微服务应用列表
    const applications = configs.map(generateMicroConfig)

    // 注册应用生命周期
    const lifeCycle = {
      beforeLoad: [
        (app) => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
          return Promise.resolve()
        }
      ],
      beforeMount: [
        (app) => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
          return Promise.resolve()
        }
      ],
      afterUnmount: [
        (app) => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
          return Promise.resolve()
        }
      ]
    }

    const { registerMicroApps } = await import('qiankun')

    // 注册应用
    registerMicroApps(applications, lifeCycle)
  }
}
