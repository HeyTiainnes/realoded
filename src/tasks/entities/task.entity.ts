import { UsersEntity } from "src/user/entites/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

//

@Entity('Tasks')

export class TasksEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    designation?: string;

    @Column({ nullable: true })
    importance?: string;

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

    utilisateur: UsersEntity;

    @ManyToOne(type => UsersEntity, (users) => users.Tasks, { eager: false })
    user: UsersEntity;
}
