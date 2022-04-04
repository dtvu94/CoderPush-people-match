import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import RegisterForm from '../components/RegisterForm';
import User from '../definitions/User';
import UserWithToken from '../definitions/UserWithToken';
import buildRequestToCreateUser from '../helpers/buildRequestToCreateUser';

const Register: NextPage = () => {
  const router = useRouter();
  const { back } = router.query;

  const handleSubmit = (user: User) => {
    fetch(buildRequestToCreateUser(user))
    .then((result) => result.json())
    .then((data: UserWithToken) => {
      // save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('user', JSON.stringify(data));

        if (typeof back === 'string') {
          router.back();
        } else {
          router.push('/')
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return <div className='main'>
    <section className='register-container'>
      <RegisterForm handleSubmit={handleSubmit} />
    </section>
  </div>;
}

export default Register;
