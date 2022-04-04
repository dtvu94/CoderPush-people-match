import { CloseOutlined, StarOutlined, ReloadOutlined, MenuOutlined } from '@ant-design/icons';
import React from 'react';

import UserType from '../definitions/User';
import styles from '../styles/User.module.css';

type UserPropsType = {
  userInfo: UserType;
  isLiked?: boolean;
  handleNextClick: Function,
  handleBackClick: Function,
  handleLikeClick: Function,
  handleListClick: Function,
};

const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const User = ({
  userInfo,
  isLiked,
  handleNextClick,
  handleBackClick,
  handleLikeClick,
  handleListClick,
}: UserPropsType) => {
  const handleList = (_event: React.MouseEvent<HTMLDivElement>) => {
    handleListClick();
  };

  const handleBack = (_event: React.MouseEvent<HTMLDivElement>) => {
    handleBackClick();
  };

  const handleNext = (_event: React.MouseEvent<HTMLDivElement>) => {
    handleNextClick();
  };

  const handleLike = (_event: React.MouseEvent<HTMLDivElement>) => {
    handleLikeClick();
  };

  return <>
    <section
      className={styles['info-container']}
      style={{
        backgroundImage: `url(${ userInfo.picture })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
    >
      <table className={styles['info-table']}>
        <tbody style={{ width: '100%', display: 'inline-table' }}>
          <tr>
            <td style={{ width: '50%', textAlign: 'center' }}>
              {userInfo.firstName} {userInfo.lastName}
            </td>
            <td style={{ width: '50%', textAlign: 'center' }}>
              {userInfo.dateOfBirth ? calculateAge(userInfo.dateOfBirth) : ''}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section className={styles['tool-container']}>
      <div className={styles.tool} onClick={handleList}>
        <MenuOutlined />
      </div>
      <div className={styles.tool} onClick={handleBack}>
        <ReloadOutlined />
      </div>
      <div className={styles.tool} onClick={handleNext} style={isLiked === false ? { backgroundColor: 'lightgrey' } : {} }>
        <CloseOutlined />
      </div>
      <div className={styles.tool} onClick={handleLike} style={isLiked === true ? { backgroundColor: 'lightpink' } : {} }>
        <StarOutlined />
      </div>
    </section>
  </>;
};

export default User;
