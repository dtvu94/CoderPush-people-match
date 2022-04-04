import React, { useState } from 'react';

import Title from '../definitions/Title';
import Gender from '../definitions/Gender';
import User from '../definitions/User';

type RegisterFormPropsType = {
  handleSubmit: Function;
};

const RegisterForm = ({ handleSubmit }: RegisterFormPropsType) => {
  const [title, setTitle] = useState<string>(Title.NONE);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>(Gender.NONE);
  const [email, setEmail] = useState<string>('');
  const [dob, setDOB] = useState<Date>();
  const registerDate = new Date();
  const [phone, setPhone] = useState<string>('');
  const picture = '';
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('0:00');
  const fileInput = React.createRef<HTMLInputElement>();

  const onTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value);
  };

  const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const onGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onDoBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDOB(new Date(event.target.value));
  };

  const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const onStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };

  const onCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const onStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const onCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const onTimezoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimezone(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fileInput.current) {
      return;
    }

    // fileInput is not used yet
    console.log(fileInput.current.files);

    // create a user
    const user = {
      id: '',
      title: title || Title.NONE,
      firstName,
      lastName,
      gender: gender || Gender.NONE,
      email,
      dateOfBirth: dob,
      registerDate,
      phone: phone || '',
      picture: picture || '',
      location: {
        street: street || '',
        city: city || '',
        state: state || '',
        country: country || '',
        timezone,
      }
    };

    handleSubmit(user);
  };

  return <form className='register-form' onSubmit={onSubmit}>
    <section className='register-form__section'>
      <label htmlFor='title'>Title:</label>
      <select name='title' defaultValue={Title.NONE} onChange={onTitleChange}>
        <option value={Title.DR}>{Title.DR}</option>
        <option value={Title.MISS}>{Title.MISS}</option>
        <option value={Title.MR}>{Title.MR}</option>
        <option value={Title.MRS}>{Title.MRS}</option>
        <option value={Title.MS}>{Title.MS}</option>
        <option value={Title.NONE}>{Title.NONE}</option>
      </select>
    </section>
    <section className='register-form__section'>
      <label htmlFor='fname'>First name:</label>
      <input required type='text' name='fname' onChange={onFirstNameChange} />
    </section>

    <section className='register-form__section'>
      <label htmlFor='lname'>Last name:</label>
      <input required type='text' name='lname' onChange={onLastNameChange} />
    </section>

    <section className='register-form__section'>
      <label htmlFor='gender'>Gender:</label>
      <select name='gender' defaultValue={Gender.NONE} onChange={onGenderChange}>
        <option value={Gender.MALE}>{Gender.MALE}</option>
        <option value={Gender.FEMALE}>{Gender.FEMALE}</option>
        <option value={Gender.OTHER}>{Gender.OTHER}</option>
        <option value={Gender.NONE}>{Gender.NONE}</option>
      </select>
    </section>

    <section className='register-form__section'>
      <label htmlFor='email'>Email:</label>
      <input required type='email' name='email' onChange={onEmailChange} />
    </section>

    <section className='register-form__section'>
      <label htmlFor='dob'>Date of Birth:</label>
      <input type='datetime-local' name='dob' onChange={onDoBChange} />
    </section>

    <section className='register-form__section'>
      <label htmlFor='phone'>Phone:</label>
      <input type='tel' name='phone' onChange={onPhoneChange} />
    </section>

    <section className='register-form__section'>
      <label htmlFor='picture'>Avatar:</label>
      <input type='file' name='picture' ref={fileInput} />
    </section>


    <div style={{ width: '100%', display: 'block', position: 'relative', marginBottom: '5px' }}>
      <b>Address</b>
    </div>

    <section className='register-form__section register-form__section-location'>
      <label htmlFor='street'>Street:</label>
      <input type='text' name='street' onChange={onStreetChange} />
    </section>

    <section className='register-form__section register-form__section-location'>
      <label htmlFor='city'>City:</label>
      <input type='text' name='city' onChange={onCityChange} />
    </section>

    <section className='register-form__section register-form__section-location'>
      <label htmlFor='state'>State:</label>
      <input type='text' name='state' onChange={onStateChange} />
    </section>

    <section className='register-form__section register-form__section-location'>
      <label htmlFor='country'>Country:</label>
      <input type='text' name='country' onChange={onCountryChange} />
    </section>

    <section className='register-form__section register-form__section-location'>
      <label htmlFor='timezone'>Timezone:</label>
      <input type='text' name='timezone' onChange={onTimezoneChange} />
    </section>

    <section className='register-form__section'>
      <input className='register-form__section-button' type='reset' value='Reset'/>
      <input className='register-form__section-button' type='submit' value='Submit' />
    </section>
  </form>;
};

export default RegisterForm;
