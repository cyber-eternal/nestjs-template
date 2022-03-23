import { Controller, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PingDto } from '@app/modules/ping/api-response/ping.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('ping')
@Controller('ping')
export class PingController {
  constructor(private readonly configService: ConfigService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ping' })
  @ApiOkResponse({ status: HttpStatus.OK, type: PingDto })
  public ping(): PingDto {
    const dto = new PingDto(this.configService.get<string>('app.version'));
    console.log('PingDto: ', dto);
    return dto;
  }
}
