import { Table, Typography } from 'antd';

const { Title } = Typography;

const OrderIndex = ({ orders }) => {
  const columns = [
    {
      title: 'Ticket',
      dataIndex: ['ticket', 'title'],
      key: 'ticket',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '100px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '50px' }}>
        My Orders
      </Title>
      <Table columns={columns} dataSource={orders} rowKey="id" />
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
