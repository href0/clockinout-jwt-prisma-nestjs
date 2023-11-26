export interface Links {
  first : string;
  next  : string;
  prev  : string;
  last  : string;
}
export class Pagination {
  total_items   : number;
  total_pages   : number;
  current_page  : number;
  per_page      : number;
  links        ?: Links;
}
