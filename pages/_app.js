import Layout from "../components/Layout"
import GlobalStyle from "../globalStyles"
import Head from 'next/head'



export default function MyApp({ Component, pageProps }) {
console.log(pageProps)

  return (
    <>
     <Head>
        <title>Content Immersion</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
    <GlobalStyle/>
 <Layout>
  <Component {...pageProps}/>
 </Layout>
    </>
  )
}



