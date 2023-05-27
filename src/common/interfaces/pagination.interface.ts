export interface IPaginationPage {
  currentPage: number
  totalPages: number
  count: number
}
export interface IPaginationResult<T> {
  page: IPaginationPage
  items: T[]
}
