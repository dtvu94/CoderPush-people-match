import UserFull from '../definitions/User';
import Title from '../definitions/Title';
import Gender from '../definitions/Gender';

const getNullUser = (): UserFull => {
  return {
    id: 'NULL',
    title: Title.NONE,
    firstName: '',
    lastName: '',
    gender: Gender.NONE,
    email: '',
    dateOfBirth: new Date(),
    registerDate: new Date(),
    phone: '',
    picture: '',
    location: {
      street: '',
      city: '',
      state: '',
      country: '',
      timezone: '0:00',
    },
  };
};

export default getNullUser;
