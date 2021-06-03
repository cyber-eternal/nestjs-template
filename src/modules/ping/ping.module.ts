import { Module } from '@nestjs/common';
import { PingController } from '@app/modules/ping/ping.controller';

@Module({
  controllers: [PingController],
})
export class PingModule {}
