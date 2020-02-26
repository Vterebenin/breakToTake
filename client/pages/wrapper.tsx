import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import {useEffect} from "react";

const Page = props => {
  const foo = useSelector((state: RootState) => state.foo);
  useEffect(() => {
    console.log(process.env.CLIENT_ID)
  })

  return (
    <div>
      <div>Prop from Redux {}</div>
      <div>Prop from getInitialProps {props.custom}</div>
    </div>
  );
};

Page.getInitialProps = ({ store, isServer }) => {
  if (isServer) {
    // Do some staff
  }

  store.dispatch({ type: 'FOO', payload: 'foo' }); // The component can read from the store's state when rendered

  return { custom: 'custom' }; // You can pass some custom props to the component from here
};

export default Page;