import { APP_BASE_HREF } from '@angular/common'
import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { existsSync } from 'fs'
import { join } from 'path'
import 'reflect-metadata'

import { ANGULAR_UNIVERSAL_OPTIONS } from '@nestjs/ng-universal/dist/angular-universal.constants'
import { angularUniversalProviders } from '@nestjs/ng-universal/dist/angular-universal.providers'
import { AngularUniversalOptions } from '@nestjs/ng-universal/dist/interfaces/angular-universal-options.interface'
import { ConfigService } from '../config/services/config.service'
import { ConsulService } from '../consul/services/consul.service'
import { APP_CONFIG_PROVIDER, APP_CONSUL_PROVIDER } from 'server/core/constants'

@Module({
  providers: [...angularUniversalProviders]
})
export class AngularUniversalModule implements OnModuleInit {
  constructor(
    @Inject(ANGULAR_UNIVERSAL_OPTIONS)
    private readonly ngOptions: AngularUniversalOptions,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  static forRoot(options: AngularUniversalOptions): DynamicModule {
    const indexHtml = existsSync(join(options.viewsPath, 'index.original.html')) ? 'index.original.html' : 'index'

    options = {
      templatePath: indexHtml,
      rootStaticPath: '*.*',
      renderPath: '*',
      ...options
    }

    return {
      module: AngularUniversalModule,
      providers: [
        {
          provide: ANGULAR_UNIVERSAL_OPTIONS,
          useFactory: async (consulService: ConsulService): Promise<AngularUniversalOptions> => {
            const getApplicationsConfig = () => {
              return new Promise((resolve) => {
                consulService.consul.kv.keys('web-config/applications/', (err, applications: string[]) => {
                  if (err) throw err
                  resolve(
                    Promise.all(
                      applications.map(
                        (application) =>
                          new Promise<string>((r) =>
                            consulService.consul.kv.get(application, (err, config) => {
                              r(JSON.parse(config.Value))
                            })
                          )
                      )
                    )
                  )
                })
              })
            }

            return {
              ...options,
              extraProviders: [
                {
                  provide: 'APPLICATION_CONFIG',
                  useValue: getApplicationsConfig
                }
              ]
            }
          },
          inject: [APP_CONSUL_PROVIDER]
        }
      ]
    }
  }

  async onModuleInit() {
    if (!this.httpAdapterHost) {
      return
    }
    const httpAdapter = this.httpAdapterHost.httpAdapter
    if (!httpAdapter) {
      return
    }
    const app = httpAdapter.getInstance()
    app.get(this.ngOptions.renderPath, (req, res) => {
      return res.render(this.ngOptions.templatePath, {
        req,
        res,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
      })
    })
  }
}
