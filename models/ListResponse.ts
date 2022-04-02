type ListResponse<T> = {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export default ListResponse;
