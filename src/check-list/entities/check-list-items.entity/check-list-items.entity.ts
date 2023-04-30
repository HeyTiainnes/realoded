import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('checkListItems')
export class CheckListItemsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Nom: string;

    @Column()
    Item: string;

    @Column()
    Notes: string;

    @Column()
    Etat: Boolean;


}
