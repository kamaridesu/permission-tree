import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAuth } from '../components/context/authContext';
import Family from '../components/family';

export default function Home({ data }) {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
      <Family data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const data = {
    name: 'users',
    fatherId: null,
    childs: [
      {
        name: 'users.create',
        fatherId: 'users',
        childs: [],
      },
      {
        name: 'users.read',
        fatherId: 'users',
        childs: [
          {
            name: 'users.read.username',
            fatherId: 'users.read',
          },
        ],
      },
    ],
  };

  return { props: { data } };
}
