import { useEffect } from 'react';
import { useRouter } from 'next/router';

function History() {
  const router = useRouter();

  useEffect(() => {
    const user = window && window.localStorage.getItem('user');

    if (!user) {
      router.push('/register?back=history');
    }
  });

  return <div className='main'>
    <section className='container'>History</section>
  </div>;
}

export default History;
