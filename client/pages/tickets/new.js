import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import { Form, Input, Button, Typography, InputNumber } from 'antd';

const { Title } = Typography;

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: { title, price },
    onSuccess: () => Router.push('/'),
  });

  const onFinish = () => {
    doRequest();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '100px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '50px' }}>
        Create a Ticket
      </Title>
      <Form onFinish={onFinish}>
        <Form.Item label="Title">
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber
            value={price}
            onChange={value => setPrice(value)}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        {errors}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewTicket;
