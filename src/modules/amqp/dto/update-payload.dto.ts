import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly path: string;

  @ApiProperty()
  @IsString()
  readonly provider: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly docSyncId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly fileUpdatedAt: string;
}
