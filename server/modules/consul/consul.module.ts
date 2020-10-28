import { Module, Inject, DynamicModule, Global } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/services/config.service'
import { APP_CONSUL_PROVIDER, APP_CONFIG_PROVIDER } from 'server/core/constants'
// import { TerminusModule } from '@nestjs/terminus'
import { ConsulService } from './services/consul.service'
import { HealthController } from './controllers/health.controller'
@Global()
@Module({
  imports: []
  // controllers: [HealthController]
})
export class ConsulModule {
  public static forRoot(): DynamicModule {
    const consulProvider = {
      provide: APP_CONSUL_PROVIDER,
      useFactory: async (config: ConfigService): Promise<ConsulService> => {
        // 创建consulService
        const consulService = new ConsulService(config)
        await consulService.register()
        return consulService
      },
      inject: [APP_CONFIG_PROVIDER]
    }
    return {
      module: ConsulModule,
      controllers: [],
      providers: [consulProvider],
      exports: [consulProvider]
    }
  }
}
