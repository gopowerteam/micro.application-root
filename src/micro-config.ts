/**
 * Step1 初始化应用
 */

import {
  initGlobalState,
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from 'qiankun';

import { navigateToUrl } from 'single-spa';

function genActiveRule(urlList: Array<string>) {
  return (location) => {
    for (let url of urlList) {
      if (location.hash === url) {
        return true;
      }
    }
    return false;
  };
}

// System.import('http://localhost:4400/mian.js').then((...a) => {
//   console.log(a);
// });

export const launch = () => {
  /**
   * Step2 注册子应用
   */

  registerMicroApps(
    [
      {
        name: 'app01',
        entry: '//localhost:4400',
        container: '#application-container',
        activeRule: ['/app01'],
      },
      {
        name: 'app02',
        entry: '//localhost:4300',
        container: '#application-container',
        activeRule: ['/app02'],
      },
    ],
    {
      beforeLoad: [
        (app) => {
          console.log(
            '[LifeCycle] before load %c%s',
            'color: green;',
            app.name
          );
          return Promise.resolve();
        },
      ],
      beforeMount: [
        (app) => {
          console.log(
            '[LifeCycle] before mount %c%s',
            'color: green;',
            app.name
          );
          return Promise.resolve();
        },
      ],
      afterUnmount: [
        (app) => {
          console.log(
            '[LifeCycle] after unmount %c%s',
            'color: green;',
            app.name
          );
          return Promise.resolve();
        },
      ],
    }
  );

  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun',
  });

  onGlobalStateChange((value, prev) =>
    console.log('[onGlobalStateChange - master]:', value, prev)
  );

  setGlobalState({
    ignore: 'master',
    user: {
      name: 'master',
    },
  });

  /**
   * Step3 设置默认进入的子应用
   */
  // setDefaultMountApp('/app01');

  /**
   * Step4 启动应用
   */
  start();

  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });
};
