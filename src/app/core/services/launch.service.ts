import { Injectable, Injector, Inject, PLATFORM_ID, Optional } from '@angular/core'
import { Store } from '@ngxs/store'
import localeZh from '@angular/common/locales/zh-Hans'
import { isPlatformBrowser, isPlatformServer, registerLocaleData } from '@angular/common'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'
import zh from '@angular/common/locales/zh'
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser'
import {
  UpdateCurrentApplicationAction,
  UpdateDefaultApplicationAction
} from 'src/app/store/actions/application.action'
import { UpdateLayoutAction } from 'src/app/store/actions/config.action'

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
    @Inject(Store) private store: Store,
    @Inject(TransferState) private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string,
    @Optional() @Inject('APPLICATION_CONFIG') private config: () => Promise<string>
  ) {}

  public async start() {
    const config = await this.getApplicationConfig(this.config)

    // 仅在客户端加载
    if (isPlatformBrowser(this.platformId)) {
      // 生成应用列表
      await this.generateApplicationList(config)
      // 注册微服务
      await this.setupMicroService()
    }
  }

  /**
   * 生成应用列表
   * @param config
   */
  private async generateApplicationList(defaultConfig) {
    // 更新默认应用
    this.store.dispatch(new UpdateDefaultApplicationAction(defaultConfig))
    // 获取自定义应用
    const customConfig = this.store.selectSnapshot((state) => state.application.custom)

    const currentConfig = Array.from(new Set([...defaultConfig, ...customConfig].map((x) => x.name)))
      .map((name) => customConfig.find((x) => x.name === name) || defaultConfig.find((x) => x.name === name))
      .filter((x) => x)
    // 更新系统应用
    this.store.dispatch(new UpdateCurrentApplicationAction(currentConfig))
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
  private async setupMicroService() {
    const { registerMicroApps, runAfterFirstMounted, initGlobalState, start, setDefaultMountApp } = await import(
      'qiankun'
    )
    // 注册微服务应用
    this.registerMicroApplication(registerMicroApps)
    // 注册数据中心
    this.registerGlobalState(initGlobalState)
    // 首次挂载事件
    runAfterFirstMounted(() => {
      console.log('[MainApp] first app mounted')
    })
    // 设置默认加载APP
    setDefaultMountApp('auth')
    // 启动应用
    start()
  }

  private registerGlobalState(initGlobalState) {
    const { onGlobalStateChange, setGlobalState } = initGlobalState({})

    onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

    setGlobalState({})
  }

  /**
   * 注册微服务应用
   * @param configs
   */
  private async registerMicroApplication(registerMicroApps) {
    // 获取应用配置信息
    const configs = this.store.selectSnapshot((state) => state.application.current)

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
          const config = configs.find((x) => x.name === app.name)
          this.store.dispatch(new UpdateLayoutAction(config.layout || 'default'))
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name, config.layout)
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

    // 注册应用
    registerMicroApps(applications, lifeCycle)
  }
}
