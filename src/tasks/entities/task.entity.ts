import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//

@Entity('Tasks')

export class TasksEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation?: string;

    @Column({ nullable: true })
    importance?: number;

    @Column({ nullable: true })
    dead_line?: Date;

    @Column({ nullable: true })
    duree_prevue?: Date;

    @Column({ nullable: true })
    date_debut_prevue?: Date;

    @Column({ nullable: true })
    etat?: boolean;

    @Column({ nullable: true })
    notes?: string;
}
