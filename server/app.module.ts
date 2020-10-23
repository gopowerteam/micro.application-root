import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { ApiController } from './controllers/api.controller';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/root-config/browser'),
      extraProviders: [
        {
          provide: 'MY_SERVICE',
          useValue: 'MY_SERVICE11',
        },
      ],
    }),
  ],
  controllers: [ApiController],
})
export class AppModule {}
