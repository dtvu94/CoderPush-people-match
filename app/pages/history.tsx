import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'underscore';

import Users from '../components/Users';
import UserWithLiked from '../definitions/UserWithLiked';
import ListResponse from '../definitions/ListResponse';
import buildRequestToGetUsersWithLike from '../helpers/buildRequestToGetUsersWithLike';

function History() {
  const router = useRouter();
  const { back } = router.query;

  useEffect(() => {
    const user = window && window.localStorage.getItem('user');

    if (!user) {
      router.push('/register?back=history');
    }
  });

  const [users, setUsers] = useState<UserWithLiked[]>([]);
  const [page, setPage] = useState<number>(0);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

  const updateUserList = (newPage: number) => {
    fetch(buildRequestToGetUsersWithLike(newPage, 10))
      .then((result) => result.json())
      .then((data: ListResponse<UserWithLiked>) => {
        setUsers(_.uniq(users.concat(data.data), function (object) {
          return object.id;
        }));
        setNumberOfUsers(data.total);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    updateUserList(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleBackClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof back === 'string') {
      router.back();
    } else {
      router.push('/')
    }
  };

  const getMore = () => {
    if (numberOfUsers < (page + 1) * 10) {
      setPage(page);
    } else {
      setPage(page + 1);
    }
  }

  return <div className='main'>
    <section className='container'>
      <button className='list-btn' onClick={handleBackClick}>
        Back
      </button>
      <Users users={users} getMore={getMore} />
    </section>
  </div>;
}

export default History;
