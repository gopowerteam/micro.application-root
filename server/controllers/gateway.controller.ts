import { All, Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { GatewayService } from 'server/services/gateway.service'

@Controller('gateway')
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Get('consul-clean')
  async cleanConsulNode() {
    return await this.gatewayService.clearServiceList().then(() => 'Clean Success')
  }
}
