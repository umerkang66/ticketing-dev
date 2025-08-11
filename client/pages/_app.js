import '../styles/globals.css';
import Head from 'next/head';
import buildClient from '../api/build-client';
import Header from '../components/header';
import { ConfigProvider } from 'antd';
import theme from '../styles/theme';

const AppComponent = ({
  Component,
  pageProps,
  initialPageProps,
  currentUser,
}) => {
  return (
    <ConfigProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GitTickets</title>
      </Head>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component
          {...pageProps}
          {...initialPageProps}
          currentUser={currentUser}
        />
      </div>
    </ConfigProvider>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser').catch(err => {
    console.log(err.message);
  });

  let initialPageProps = {};
  if (appContext.Component.getInitialProps) {
    initialPageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    initialPageProps,
    ...data,
  };
};

export default AppComponent;