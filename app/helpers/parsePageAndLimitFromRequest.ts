const parsePageAndLimitFromRequest = (page: string | string[], limit: string | string[]) => {
  let pageValue = 0;
  if (typeof page === 'string') {
    pageValue = parseInt(page);

    if (Number.isNaN(pageValue)) {
      pageValue = 0;
    }
  }

  let limitValue = 20;
  if (typeof limit === 'string') {
    limitValue = parseInt(limit);

    if (Number.isNaN(limitValue)) {
      limitValue = 20;
    }
  }

  return {
    page: pageValue,
    limit: limitValue,
  };
};

export default parsePageAndLimitFromRequest;
