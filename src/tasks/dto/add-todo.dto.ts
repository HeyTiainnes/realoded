import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class AddTodoDto {
    @IsString()
    name: string;

    @IsString()
    designation: string;

    @IsNumber()
    importance: number;

    @IsDate()
    dead_line: Date;

    @IsDate()
    duree_prevue: Date;

    @IsDate()
    date_debut_prevue: Date;

    @IsBoolean()
    etat: boolean;

    @IsString()
    notes: string;
}