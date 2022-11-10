import { MessageContextProvider } from "../context/message";
import Layout from "../components/Layout.jsx";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MessageContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MessageContextProvider>
  );
}

export default MyApp;
