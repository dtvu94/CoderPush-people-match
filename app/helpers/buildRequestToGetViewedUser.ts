const buildRequestToGetViewedUser = (userId: string, viewedUserId: string): Request => {
  if (!userId || !viewedUserId) {
    throw new Error(`Invalid userId: ${ userId } or viewedUserId: ${ viewedUserId }`);
  }

  const url = `api/viewed-users?userid=${ userId }&vieweduserid=${ viewedUserId }`;

  return new Request(url, {
    method: 'GET',
  });
};

export default buildRequestToGetViewedUser;
