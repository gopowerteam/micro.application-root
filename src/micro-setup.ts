/**
 * Step1 初始化应用
 */

import { initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'

import { navigateToUrl } from 'single-spa'

function generateApplicationConfig(app) {
  return {
    name: app.name,
    entry: `http://${app.host}:${app.port}/${app.name}/`,
    container: '#application-container',
    activeRule: `/${app.path}`
  }
}

function getAppcationsJSON(services): any[] {
  try {
    return JSON.parse(services) || []
  } catch (ex) {
    return []
  }
}

async function registerMicroApplication(services) {
  // 生成应用配置
  const applications = services.map(generateApplicationConfig)
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

  // 注册应用
  registerMicroApps(applications, lifeCycle)
}

function registerGlobalState(applications) {
  const { onGlobalStateChange, setGlobalState } = initGlobalState({})

  onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

  setGlobalState({
    user: {
      name: ''
    },
    applications
  })

  localStorage.setItem('applications', JSON.stringify(applications))
}

export const setup = (SERVICES) => {
  // 注册应用
  registerMicroApplication(SERVICES)
  // 注册数据中心
  registerGlobalState(SERVICES)
  // 首次挂载事件
  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted')
  })
  // 启动应用
  start()
}
