const buildRequestToGetUser = (id: string): Request => {
  if (!id) {
    throw new Error(`Invalid id: ${ id }`);
  }

  const url = `api/users/${ id }`;

  return new Request(url, {
    method: 'GET',
  });
};

export default buildRequestToGetUser;
