import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import _ from 'underscore';

import UserPreview from '../definitions/UserPreview';
import ListResponse from '../definitions/ListResponse';
import UserFull from '../definitions/User';
import User from '../components/User';
import buildRequestToGetUsers from '../helpers/buildRequestToGetUsers';
import buildRequestToGetUser from '../helpers/buildRequestToGetUser';
import buildRequestToCreateViewedUser from '../helpers/buildRequestToCreateViewedUser';
import buildRequestToGetViewedUser from '../helpers/buildRequestToGetViewedUser';
import getNullUser from '../helpers/getNullUser';
import ViewedUser from '../definitions/ViewedUser';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = window && window.localStorage.getItem('user');

    if (!user) {
      router.push('/register?back=index');
    }
  });

  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState<UserPreview[]>([]);
  const [viewedUsers, setViewedUsers] = useState<ViewedUser[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [viewedUserIndex, setViewedUserIndex] = useState<number>(-1);
  const [viewedUser, setViewedUser] = useState<UserFull>();
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasBack, setHasBack] = useState<boolean>(false);
  const [body, setBody] = useState<JSX.Element>(<></>);
  const [isLiked, setIsLiked] = useState<boolean>();

  const updateUserList = (id: string, newPage: number) => {
    fetch(buildRequestToGetUsers(newPage, 10, id))
      .then((result) => result.json())
      .then((data: ListResponse<UserPreview>) => {
        setUsers(_.uniq(users.concat(data.data), function (object) {
          return object.id;
        }));
        setNumberOfUsers(data.total);

        if (viewedUserIndex === -1) {
          setViewedUserIndex(0);
        }

        setLoading(false);
      })
      .catch((error) => {
        setViewedUser(getNullUser());

        if (viewedUserIndex === -1) {
          setViewedUserIndex(0);
        }
        setLoading(false);

        console.error(error);
      });
  };

  const updateNumberOfUsers = () => {
    fetch(buildRequestToGetUsers(0, 10))
      .then((result) => result.json())
      .then((data: ListResponse<UserPreview>) => {
        setNumberOfUsers(data.total);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const updateViewedUser = (id: string) => {
    fetch(buildRequestToGetUser(id))
      .then((result) => result.json())
      .then((data) => {
        const clonedUsers: UserPreview[] = JSON.parse(JSON.stringify(users));
        clonedUsers[viewedUserIndex].title = data.title;
        clonedUsers[viewedUserIndex].firstName = data.firstName;
        clonedUsers[viewedUserIndex].lastName = data.lastName;
        clonedUsers[viewedUserIndex].picture = data.picture;
        setUsers(clonedUsers);
        setViewedUser({
          ...data,
          registerDate: new Date(data.registerDate),
          dateOfBirth: new Date(data.dateOfBirth),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const updateViewedUsers = (userId: string, viewedUserId: string) => {
    fetch(buildRequestToGetViewedUser(userId, viewedUserId))
      .then((result) => result.json())
      .then((data) => {
        setViewedUsers(_.uniq(viewedUsers.concat(data.data), function (object) {
          return object.id;
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateViewedUserStatus = (viewedUserId: string, userId: string, isLike: boolean) => {
    const viewedUser = {
      id: '',
      userId,
      viewedUserId,
      isLike,
    };

    fetch(buildRequestToCreateViewedUser(viewedUser))
      .then((result) => result.json())
      .then((data) => {
        const oldViewedUsers = JSON.parse(JSON.stringify(viewedUsers));
        setViewedUsers(oldViewedUsers.concat(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true);

    const user = window && window.localStorage.getItem('user');
    updateUserList(user && JSON.parse(user).id, page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (isLoading || viewedUserIndex < 0) {
      return;
    }

    if (viewedUserIndex >= users.length) {
      return;
    }

    if (viewedUser?.id === users[viewedUserIndex].id) {
      return;
    }

    setLoading(true);
    updateViewedUser(users[viewedUserIndex].id);
    const user = window && window.localStorage.getItem('user');
    updateViewedUsers(user && JSON.parse(user).id, users[viewedUserIndex].id);

    if (viewedUserIndex === 0) {
      setHasBack(false);
    } else if (hasBack === false) {
      setHasBack(true);
    }

    if (viewedUserIndex >= numberOfUsers) {
      setHasNext(false);
    } else if (hasNext === false) {
      setHasNext(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewedUserIndex]);

  useEffect(() => {
    if (viewedUser) {
      const existedViewedUser = viewedUsers.find((x) => x.viewedUserId === viewedUser.id);

      if (existedViewedUser) {
        setIsLiked(existedViewedUser.isLike);
      } else {
        setIsLiked(undefined);
      }
    }
  }, [viewedUsers, viewedUser]);

  const handleNextClick = () => {
    console.log('handleNextClick viewedUserIndex: ', viewedUserIndex);
    console.log('handleNextClick users.length: ', users.length);
    if (viewedUserIndex + 3 >= users.length) {
      if (users.length < numberOfUsers) {
        setPage(page + 1);
      } else {
        updateNumberOfUsers();
      }
      setViewedUserIndex(viewedUserIndex + 1);
    } else if (viewedUserIndex + 1 === users.length) {
      setViewedUserIndex(0);
    } else {
      setViewedUserIndex(viewedUserIndex + 1);
    }
  };

  const handlePassClick = () => {
    const user = window && window.localStorage.getItem('user');
    if (viewedUser && user) {
      updateViewedUserStatus(viewedUser?.id, JSON.parse(user).id, false);
      handleNextClick();
    }
  };

  const handleBackClick = () => {
    if (viewedUserIndex === 1) {
      if (users.length < numberOfUsers) {
        setPage(page + 1);
      } else {
        updateNumberOfUsers();
      }
      setViewedUserIndex(0);
    } else if (viewedUserIndex <= 0) {
      setViewedUserIndex(users.length - 2);
    } else {
      setViewedUserIndex(viewedUserIndex - 1);
    }
  };

  const handleLikeClick = () => {
    const user = window && window.localStorage.getItem('user');
    if (viewedUser && user) {
      updateViewedUserStatus(viewedUser?.id, JSON.parse(user).id, true);
      handleNextClick();
    }
  };

  const handleListClick = () => {
    router.push('/history?back=index');
  };

  useEffect(() => {
    if (isLoading || viewedUser === undefined) {
      setBody(<>Loading ...</>);
    } else if (isLoading === false && typeof viewedUser === 'object' && viewedUser.id === 'NULL') {
      setBody(<>No user left.</>);
    } else {
      setBody(<User
        userInfo={viewedUser}
        isLiked={isLiked}
        handleNextClick={handlePassClick}
        handleBackClick={handleBackClick}
        handleLikeClick={handleLikeClick}
        handleListClick={handleListClick}
      />);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, viewedUser, isLiked]);

  return (
    <div className='main'>
      <section className='container'>{body}</section>
    </div>
  )
}

export default Home;
