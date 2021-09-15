import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Welcome() {

  let Product = {
    name: "Roninlabs",
    hostname: "Roninlabs.co",
    description: "Laboratory showcase of everything built",
  }

  let config = {
    Product
  }

  return (
    <div className={styles.container}>

      <Head>

        <title> {config.Product.name} </title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content={config.Product.description} />
        <link rel="icon" href="/people.svg" />

      </Head>

      <main className={styles.main}>
        <div className="container mx-auto">

          <div className="col-lg-7 col-md-12 col-sm-12 mx-auto text-center">

            <p className={styles.description}>
              {config.Product.name}
            </p>

            <h1 className={styles.title}>
              Welcome to Roninlabs! & thanks for signing up!
            </h1>

            <div className="mx-auto text-center mt-1 col-lg-7 cols-sm-12 col-sm-12 mb-3" >

              <form name="signups" method="POST" data-netlify="true">

                <input type="hidden" name="form-name" value="signups" />

                <input type="email" name="email" placeholder="hello@myemail.com" className="m-1 box-shadow-muted" />

                <button type="submit" className="m-1 p-2 box-shadow-muted" > Stay Updated </button>

              </form>

            </div>

            <img src="https://fresh-folk.com/assets/images/image01.gif?v=414f4bf2" height="300px" width="auto" />
            {/* <img src="/people.gif" height="auto" width="80%" className="mx-auto" /> */}

            <p className={styles.sub}>
                Showcase coming soon!
              </p>

          </div>


        </div>
      </main>

      <footer className={styles.footer}>
        <span className="text-decoration-none">
          © {new Date().getFullYear()} {config.Product.hostname}
        </span>
      </footer>
    </div>
  )
}
