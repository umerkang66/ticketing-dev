import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onFinish = () => {
    doRequest();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '50px' }}>
        Sign Up
      </Title>
      <Form onFinish={onFinish}>
        <Form.Item label="Email">
          <Input value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>
        {errors}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
