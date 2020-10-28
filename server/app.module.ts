import { Module } from '@nestjs/common'
// import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path'
import { AppServerModule } from '../src/main.server'
import { ApiController } from './controllers/api.controller'
import { ConfigModule } from './modules/config/config.module'
import { ConsulModule } from './modules/consul/consul.module'
import { AngularUniversalModule } from './modules/universal/universal.module'

@Module({
  imports: [
    ConfigModule.forRoot(join(__dirname, '..', '..', 'config.yml')),
    ConsulModule.forRoot(),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/browser')
    })
  ],
  controllers: [ApiController]
})
export class AppModule {}
