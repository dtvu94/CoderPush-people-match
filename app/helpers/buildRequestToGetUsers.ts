const buildRequestToGetUsers = (page: number, limit: number, id?: string): Request => {
  if (page < 0) {
    page = 0;
  }

  if (limit < 1) {
    limit = 10;
  }

  const url = `api/users?limit=${ limit }&page=${ page }&notview=yes${id ? '&id=' + id : ''}`;

  return new Request(url, {
    method: 'GET',
  });
};

export default buildRequestToGetUsers;
