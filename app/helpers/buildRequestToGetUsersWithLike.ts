const buildRequestToGetUsersWithLike = (page: number, limit: number) => {
  if (page < 0) {
    page = 0;
  }

  if (limit < 1) {
    limit = 10;
  }

  const url = `api/viewed-users?limit=${ limit }&page=${ page }&isFullInfo=yes`;

  return new Request(url, {
    method: 'GET',
  });
};

export default buildRequestToGetUsersWithLike;
