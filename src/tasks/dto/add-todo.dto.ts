// import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';

export class AddTodoDto {


    @IsString()
    designation: string;

    @IsString()
    importance: number;

    @IsDate()
    @Type(() => Date)
    dead_line: Date;

    @IsDate()
    @Type(() => Date)
    duree_prevue: Date;

    @IsDate()
    @Type(() => Date)
    date_debut_prevue: Date;

    @IsString()
    etat: string;

    @IsString()
    notes: string;

}
