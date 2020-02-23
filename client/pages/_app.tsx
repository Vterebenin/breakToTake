// pages/_app.tsx
import withRedux, { MakeStore } from 'next-redux-wrapper';
import App, { AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

import { reducer, RootState } from '../store';

/**
 * @param initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 */
const makeStore: MakeStore = (initialState: RootState) => {
  return createStore(reducer, initialState);
};

class MyApp extends App<{ store: Store<RootState> }> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp);
