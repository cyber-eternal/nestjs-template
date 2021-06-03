import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DraftDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly path: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly docSyncId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly provider: string;
}
