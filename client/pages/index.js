import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// this runs both on server and browser
LandingPage.getInitialProps = async ({ req }) => {
  // next server is running in container, so inside the container localhost:80 or k8sLoadBalancerIp:80 is nothing
  // instead of this, we have to route this request to ingress nginx

  const { data } = await buildClient({ req })
    .get('/api/users/currentuser')
    .catch(err => {
      console.log(err.message);
    });

  return data;
};

export default LandingPage;
