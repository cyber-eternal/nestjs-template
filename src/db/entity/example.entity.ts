import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Example {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'example', description: 'Title' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: 'example.pdf', description: 'Title' })
  @Column({ nullable: false })
  name: string;


  @ApiProperty({
    example: '2021-04-28 08:32:32.257207',
    description: 'Auto-Generated timestamp on creating a row',
  })
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-04-28 08:32:32.257207',
    description: 'Auto-Generated timestamp on updating a row',
  })
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}
