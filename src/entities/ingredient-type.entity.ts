import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity('ingredient_type', { orderBy: { id: 'ASC' } })
export class IngredientType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    type => Ingredient,
    ingredient => ingredient.id
  )
  ingredients: Ingredient[];
}
