import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Card, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: { ticketId: ticket.id },
    onSuccess: order => Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div style={{ maxWidth: '600px', margin: '100px auto' }}>
      <Card title={ticket.title}>
        <Title level={4}>Price: ${ticket.price}</Title>
        {errors}
        <Button type="primary" onClick={() => doRequest()}>
          Purchase
        </Button>
      </Card>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client
    .get(`/api/tickets/${ticketId}`)
    .catch(err => console.log(err));

  return { ticket: data };
};

export default TicketShow;
