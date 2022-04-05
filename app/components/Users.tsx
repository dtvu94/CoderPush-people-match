import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import React from 'react';

import UserWithLiked from '../definitions/UserWithLiked';

type UsersPropsType = {
  users: UserWithLiked[];
  getMore: Function
};

const Users = ({ users, getMore }: UsersPropsType) => {
  const onScroll = (event: React.UIEvent<HTMLElement>) => {
    const element = event.currentTarget;

    if ((element.scrollTop + element.getBoundingClientRect().height + 5) >= element.scrollHeight) {
      getMore();
    }
  };

  return <section className='list-user' onScroll={onScroll}>
    <table className='list-user__table'>
      <tbody>
        {users.map((user) => {
          return <tr key={user.id}>
            <td>
              <div className='list-user__table-image' style={{
                backgroundImage: `url(${ user.picture })`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                height: '100px',
              }}></div>
            </td>
            <td>
              <div className='list-user__table-text'>
                {`${user.firstName} ${user.lastName}`}
              </div>
              <div className='list-user__table-text'>
                {user.isLiked ? <LikeOutlined /> : <DislikeOutlined />}
              </div>
            </td>
          </tr>;
        })}
      </tbody>
    </table>
  </section>
};

export default Users;
