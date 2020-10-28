import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Application } from './core/application'
import { APP_CONFIG_PROVIDER } from './core/constants'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // // app.setGlobalPrefix('api');
  // await app.listen(process.env.PORT || 4000);

  const app = await NestFactory.create(AppModule, {
    logger: console
  }).then(Application.initialize)

  // 获取配置服务
  const config = app.get(APP_CONFIG_PROVIDER)
  // 获取监听端口
  const port = config.get('service.port')
  // 建立服务监听
  await app.listen(process.env.PORT || port)
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire
const mainModule = __non_webpack_require__.main
const moduleFilename = (mainModule && mainModule.filename) || ''
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch((err) => console.error(err))
}
