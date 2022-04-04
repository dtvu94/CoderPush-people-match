import ViewedUser from "../definitions/ViewedUser";

const buildRequestToCreateViewedUser = (viewedUser: ViewedUser): Request => {
  const url = 'api/viewed-users';

  const headers = new Headers();

  headers.set('content-type', 'application/json');

  return new Request(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(viewedUser),
  });
};

export default buildRequestToCreateViewedUser;
