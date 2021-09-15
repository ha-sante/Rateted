import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Image from 'next/image'

import ReactStars from "react-rating-stars-component";

import styles from '../styles/Home.module.css'


let Company = {
  name: "Rateted.com",
  hostname: "Rateted.com",
  description: "Add a review to your product easily",
}

let config = {
  Product: Company
}

export default function Home() {

  const [getRatedReviews, setRatedReviews] = useState([]);

  const [getRatedReview, setRatedReview] = useState({ rate: 0, review: '' });
  const [getShowSubmitRatedReview, setShowSubmitRatedReview] = useState(false);

  let Product = {
    title: "The Product UX Design Toolkit",
    author: {
      image: "https://public-files.gumroad.com/variants/cf2fjffg2xhxajwt8w2fag2kgzj4/4ec519eb32080d4ff1ef08cba157dc2ac7dab092fa26aeca54e8e2b8f31f9a63",
      name: "Michael Filipiuk"
    }
  }

  function UpdateRating(rate) {
    console.log(rate);

    setRatedReview({ ...getRatedReview, rate })
  };

  function AddRating() {
    setRatedReviews([...getRatedReviews, getRatedReview]);

    setShowSubmitRatedReview(false);
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

        <div className="container mx-auto mt-5">
          <div className="row mx-auto mt-5 w-40">

            <div className="col-lg-4 col-md-12 col-sm-12">

              <img src="https://public-files.gumroad.com/variants/j7cab2rusi2ku7ktfmhjpsay5bek/e62e4bcd3d858e4839b5c2b465bae257f22dc2666e91f438860b8031380a9984"
                height="auto" width="100%"
                className="rounded" />

            </div>

            <div className="col-lg-8 col-md-12 col-sm-12 p-3">

              <div className="w-100 text-left border-bottom mx-auto">

                <h3 className="">
                  {Product.title}
                </h3>

                <div className="d-flex justify-content-between align-items-center mt-3 mb-3 mx-auto">

                  <div className="d-flex justify-content-between align-items-center">

                    <h4 className="mt-2 mr-5">
                      {getRatedReviews.length}
                    </h4>

                    <ReactStars
                      count={5}
                      edit={false}
                      value={getRatedReviews.length}
                      size={25}
                      activeColor="#ffd700"
                      className="ml-5"
                    />

                  </div>

                  <button className="btn border border-muted" onClick={() => setShowSubmitRatedReview(!getShowSubmitRatedReview)}>
                    {getShowSubmitRatedReview ? "Cancel" : "Add Review"}
                  </button>

                </div>

              </div>


              {getShowSubmitRatedReview &&
                <div className="mx-auto w-100 mt-3 p-3 rounded add-review-box" >

                  <h5 className="text-white"> What is your Rating? </h5>

                  <div className="d-flex justify-content-between mt-3 mb-3 mx-auto">

                    <div className="col-lg-4 col-md-12 col-sm-12 p-2">

                      <h6> Rate </h6>

                      <ReactStars
                        count={5}
                        onChange={UpdateRating}
                        size={25}
                        activeColor="#ffd700"
                      />

                    </div>

                    <div className="col-lg-8 col-md-12 col-sm-12">

                      <h6> Review </h6>

                      <textarea type="text" placeholder="Review" className="p-2 w-100"
                        onChange={(e) => {
                          setRatedReview({
                            ...getRatedReview,
                            review: e.target.value
                          })
                        }} />

                    </div>

                  </div>

                  <div className="w-100 text-left">

                    <button className="btn border bg-white border-muted " onClick={() => AddRating()}>
                      Submit Review
                    </button>

                  </div>

                </div>
              }

              <div className="mx-auto w-100 mt-3" >

                <h4> Reviews </h4>

                {getRatedReviews.map((block, index) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center" key={index}>

                      <ReactStars count={5} value={block.rate} edit={false} size={20} activeColor="#ffd700" />

                      <p className="ml-5 mt-2"> <bold> {block.rate} </bold> {block.review} </p>

                    </div>
                  )
                })}

              </div>

            </div>

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
