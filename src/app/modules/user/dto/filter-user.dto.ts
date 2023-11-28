import { Sort } from "src/core/filters/sort"
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class FilterUserDto {
  page    : number
  perPage : number
  name?   : string
  email?  : string
  sort?   : Sort
  sortBy? : string

}
export enum OrderBy {
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
  name      = 'name',
  email     = 'email',
  id        = 'id',
}