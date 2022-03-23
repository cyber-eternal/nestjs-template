import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PingDto {
  @ApiProperty()
  @IsBoolean()
  readonly api: boolean;

  @ApiProperty()
  @IsString()
  readonly version: string;

  constructor(version: string) {
    this.api = true;
    this.version = version;
  }
}
