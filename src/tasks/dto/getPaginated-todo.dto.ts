import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetPaginatedDto {

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    item: number;
}

function IsPtionnal(): (target: GetPaginatedDto, propertyKey: "page") => void {
    throw new Error("Function not implemented.");
}
