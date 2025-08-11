import Link from 'next/link';
import { Card, Col, Row, Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket => {
    return (
      <Col xs={24} sm={12} md={8} key={ticket.id}>
        <Card
          title={ticket.title}
          extra={
            <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              View
            </Link>
          }
        >
          <p>Price: ${ticket.price}</p>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <div
        style={{
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        <Title>Welcome to GitTickets</Title>
        <Paragraph>The best place to buy and sell tickets online.</Paragraph>
      </div>
      <div style={{ padding: '20px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '50px' }}>
          Available Tickets
        </Title>
        <Row gutter={[16, 16]}>{ticketList}</Row>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client
    .get('/api/tickets')
    .catch(err => console.log(err));

  return { tickets: data || [] };
};

export default LandingPage;
