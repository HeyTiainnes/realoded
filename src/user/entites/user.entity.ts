import { UserRoleEnum } from "src/enums/user-role.enum";
import { TasksEntity } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: true,
        type: 'varchar',
        length: 50,
    })
    username: string;

    @Column({
        unique: true,
        nullable: true,
        type: 'varchar',
        length: 50,
    })
    email: string;

    @Column({
        unique: true,
        nullable: false,
    })
    password: string;

    @Column()
    salt: string;

    @Column({
        nullable: true,
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })

    role: string;

    @OneToMany(
        type => TasksEntity,
        (Task) => Task.user,
        {
            nullable: true,
            cascade: true
        }
    )
    Tasks: TasksEntity[];
    // @OneToMany(() => TasksEntity, task => task.user)
    // tasks: TasksEntity[];
    // userame: any;


    //tasks:TasksEntity[]
}

    // @Column({ type: 'enum', enum: RoleEnumType, default: RoleEnumType.USER })
    // role: RoleEnumType;

    // // @OneToOne(type => TasksEntity, (task) => task.user, { eager: true })
    // // tasks: TasksEntity[];
    // @OneToMany(() => TasksEntity, (task) => task.user, { onDelete: 'CASCADE' })
    //      tasks: TasksEntity[];
    // tasks: TasksEntity[];


