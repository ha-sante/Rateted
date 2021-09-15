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

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient("https://jicfsomuxptppxnyouus.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTcyNjIzNCwiZXhwIjoxOTQ3MzAyMjM0fQ.GM0dllL65Ibiqoulu0bv-_qFBfwnJHPbcCpnaHUEO3w")

export default function Home() {

  const [getRatedReviews, setRatedReviews] = useState([]);
  const [getProductRating, setProductRating] = useState(0);

  const [getRatedReview, setRatedReview] = useState({ rate: 0, review: '' });
  const [getShowSubmitRatedReview, setShowSubmitRatedReview] = useState(false);

  let Product = {
    image: "https://public-files.gumroad.com/variants/j7cab2rusi2ku7ktfmhjpsay5bek/e62e4bcd3d858e4839b5c2b465bae257f22dc2666e91f438860b8031380a9984",
    title: "The UI Design Principles Book",
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

    console.log("getRatedReview", getRatedReview);

    supabase.from('ratedreviews').insert([getRatedReview]).then(response => {
      console.log("data", response.data);
    }).catch(error => {
      console.log("error", error);
    })

    setRatedReviews([...getRatedReviews, getRatedReview]);
    setShowSubmitRatedReview(false);
  }

  useEffect(() => {

    supabase.from('ratedreviews').on('*', payload => {
      
      supabase.from('ratedreviews').select().then(response => {
        console.log("get all datas", response.data);
  
        setRatedReviews([...response.data]);
      }).catch(error => {
        console.log("error", error);
      })

    }).subscribe()

  }, []);

  useEffect(() => {

    supabase.from('ratedreviews').select().then(response => {
      console.log("get all datas", response.data);

      setRatedReviews([...response.data]);
    }).catch(error => {
      console.log("error", error);
    })

  }, []);

  useEffect(() => {

    if (getRatedReviews) {

      let rating_average = 0
      getRatedReviews.map((block, index) => rating_average += block.rate);

      let rated = rating_average > 0 ? Math.round(rating_average / getRatedReviews.length) : 0;

      console.log("rating_average", rating_average);
      console.log("rated", rated);

      setProductRating(rated)

      console.clear();
    }

  }, [getRatedReviews]);

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
          <div className="row mx-auto mt-5">

            <div className="col-lg-4 col-md-12 col-sm-12">

              <img src={Product.image} height="auto" width="100%" className="rounded mb-3" />

              <p> By  <img src={Product.author.image} height="30px" width="30px" className="rounded radius50" />  {Product.author.name}</p>

            </div>

            <div className="col-lg-8 col-md-12 col-sm-12 p-3">

              <div className="w-100 text-left border-bottom mx-auto">

                <h3 className="fw-bold">
                  {Product.title}
                </h3>

                <div className="d-flex justify-content-between align-items-center mt-3 mb-3 mx-auto">

                  <div className="d-flex justify-content-between align-items-center">

                    <h4 className="mt-2 mr-5 fw-bold">
                      {getProductRating}
                    </h4>

                    <ReactStars
                      count={5}
                      edit={false}
                      key={getProductRating}
                      value={getProductRating}
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
                <div className="mx-auto w-100 mt-3 pb-3 add-review- border-bottom" >

                  <h5 className="text-whit"> What is your Rating? </h5>

                  <div className="row justify-content-between align-items-start mt-3 mb-3 mx-auto">

                    <div className="col-lg-4 col-md-12 col-sm-12 p-1">

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

                      <textarea type="text" placeholder="Start typing..." className="p-2 w-100"
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
                    <div className="row align-items-start" key={index}>

                      <div className="col-lg-3 col-md-12 col-sm-12 text-left">
                        <ReactStars count={5} value={block.rate} edit={false} size={20} activeColor="#ffd700" />
                      </div>

                      <div className="col-lg-9 col-md-12 col-sm-12 text-right">
                        <p className=""> <span className="ml-2 mr-3 fw-bold"> {block.rate} </span>  {block.review} </p>
                      </div>

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
