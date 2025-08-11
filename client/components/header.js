import Link from 'next/link';
import { Layout, Menu } from 'antd';

const { Header: AntHeader } = Layout;

const Header = ({ currentUser }) => {
  const links = [
    { label: 'Git Tickets', href: '/' },
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return {
        key: href,
        label: <Link href={href}>{label}</Link>,
      };
    });

  return (
    <AntHeader>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={links}
      />
    </AntHeader>
  );
};

export default Header;
