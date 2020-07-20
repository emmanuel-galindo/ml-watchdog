import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ML Watchdog</title>
      </Head>
    {/* <section><div><img src="//lorempixel.com/150/150/abstract"/></div><div><img src="//lorempixel.com/150/150/animals"/></div><div><img src="//lorempixel.com/150/150/business"/></div><div><img src="//lorempixel.com/150/150/cats"/></div><div><img src="//lorempixel.com/150/150/city"/></div><div><img src="//lorempixel.com/150/150/food"/></div><div><img src="//lorempixel.com/150/150/nightlife"/></div><div><img src="//lorempixel.com/150/150/people"/></div><div><img src="//lorempixel.com/150/150/nature"/></div><div><img src="//lorempixel.com/150/150/sports"/></div><div><img src="//lorempixel.com/150/150/technics"/></div><div><img src="//lorempixel.com/150/150/transport"/></div></section> */}
      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/new">
            <a>Add Search</a>
          </Link>
        </div>

        <img
          id="title"
          src="https://www.wikimedia.org/static/images/project-logos/wikisource.png" 
          alt="search care logo"
        ></img>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
