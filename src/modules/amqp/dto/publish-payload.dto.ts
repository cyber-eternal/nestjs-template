import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PublishDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly path: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly provider: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly clientCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly docSyncId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly fileCreatedAt: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly fileUpdatedAt: string;
}
