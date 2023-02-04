import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PingDto {
  @ApiProperty()
  @IsBoolean()
  readonly api: boolean;

  @ApiProperty()
  @IsString()
  readonly version: string;

  @ApiProperty()
  @IsString()
  readonly env: string;

  @ApiProperty()
  @IsString()
  readonly dateTime: Date;

  constructor(version: string) {
    this.api = true;
    this.version = version;
    this.env = process.env.NODE_ENV;
    this.dateTime = new Date();
  }
}
