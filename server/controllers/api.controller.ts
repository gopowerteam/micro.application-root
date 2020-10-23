import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api')
export class ApiController {
  @All()
  apiProxy(): string {
    return 'TODO';
  }
}
