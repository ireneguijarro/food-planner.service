import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateTimeEntity {
  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
