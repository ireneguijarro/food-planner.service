import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IngredientType } from "./ingredient-type.entity";

@Entity('ingredient', { orderBy: { id: 'ASC'}})
export class Ingredient {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => IngredientType, type => type.id)
    type: IngredientType;

    @Column()
    kcal: number;

}