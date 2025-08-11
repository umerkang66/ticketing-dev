import { useEffect, useState } from 'react';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import { Card, Typography, Alert, Button } from 'antd';

const { Title, Text } = Typography;

const OrderShow = ({ order, currentUser }) => {
  if (!order) {
    return <Alert message="Order not found" type="error" />;
  }

  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: { orderId: order.id },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [order]);

  if (timeLeft < 0) {
    return <Alert message="Order Expired" type="error" />;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '100px auto' }}>
      <Card title="Order Summary">
        <Title level={4}>Ticket: {order.ticket.title}</Title>
        <Text>Price: ${order.ticket.price}</Text>
        <div style={{ margin: '20px 0' }}>
          <Text>Time left to pay: {timeLeft} seconds</Text>
        </div>
        {errors}
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51LIZXQKwal9gUIqn1AYzVhFnEtQLurAOdy6KEzSYsnFopKaiHbfhsuD7E97OvEAT2MZ569XNQCFmlwRtWL070h6I00zkKfTIUO"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </Card>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client
    .get(`/api/orders/${orderId}`)
    .catch(err => console.log(err));

  return { order: data };
};

export default OrderShow;
