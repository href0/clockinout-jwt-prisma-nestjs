import { Sort } from "src/core/filters/sort"

export interface FilterUser {
  page     : number
  perPage  : number
  sort     : Sort
  sortBy   : string 
  name?    : string
  email?   : string
}

export enum OrderBy {
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
  name = 'name',
  email = 'email',
  id = 'id',
}