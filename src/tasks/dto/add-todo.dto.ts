import { IsString } from "class-validator";

export class AddTodoDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

}