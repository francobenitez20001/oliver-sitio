import '../styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Layout from '../src/components/Layout';
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";  
import store from '../store/index';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </Provider>
  )
}

const makeStore = ()=>store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
