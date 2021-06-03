import { Controller, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PingDto } from '@app/modules/ping/api-response/ping.dto';

@ApiTags('ping')
@Controller('ping')
export class PingController {
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ping' })
  @ApiOkResponse({ status: HttpStatus.OK, type: PingDto })
  public ping(): PingDto {
    return new PingDto();
  }
}
