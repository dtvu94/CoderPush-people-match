import { v4 } from 'uuid';

import User from '../definitions/User';
import Title from '../definitions/Title';
import Gender from '../definitions/Gender';
import Location from '../definitions/Location';

const parseUserFromRequest = (body: any): User => {
  const {
    id,
    title,
    firstName,
    lastName,
    gender,
    email,
    dateOfBirth,
    registerDate,
    phone,
    picture,
    location,
  } = body;

  const idRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  const parsedLocation: Location = {
    street: '',
    city: '',
    state: '',
    country: '',
    timezone: '0:00',
  };

  if (typeof location === 'object') {
    if (location.street && typeof location.street === 'string') {
      parsedLocation.street = location.street;
    }
    if (location.city && typeof location.city === 'string') {
      parsedLocation.city = location.city;
    }
    if (location.state && typeof location.state === 'string') {
      parsedLocation.state = location.state;
    }
    if (location.country && typeof location.country === 'string') {
      parsedLocation.country = location.country;
    }
    if (location.timezone && typeof location.timezone === 'string') {
      parsedLocation.timezone = location.timezone;
    }
  }

  return {
    id: idRegex.test(id) ? id : v4(),
    title: title || Title.NONE,
    firstName: firstName || '',
    lastName: lastName || '',
    gender: gender || Gender.NONE,
    email: email || '',
    dateOfBirth: dateOfBirth && typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : undefined,
    registerDate: registerDate && typeof registerDate === 'string' ? new Date(registerDate) : new Date(),
    phone: phone || '',
    picture: picture || '',
    location: parsedLocation,
  };
};

export default parseUserFromRequest;
