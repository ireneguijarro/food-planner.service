import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food', { orderBy: {  id: 'ASC' } })
export class Food {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;
}
