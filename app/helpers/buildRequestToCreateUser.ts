import User from '../definitions/User';

const buildRequestToCreateUser = (user: User): Request => {
  const url = 'api/users';

  const headers = new Headers();

  headers.set('content-type', 'application/json');

  return new Request(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(user),
  });
};

export default buildRequestToCreateUser;
