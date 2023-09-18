import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RatingComponent from "../../common/rating";
export default function PatientReview(props) {
  const data = [
    {
      rating: "5",
      text: "- The best telemedicine service available. The doctor I selected was super responsive and took care of my needs immediately.",
      author: "Yolanda L",
    },
    {
      rating: "5",
      text: "- I have been experiencing a lot of allergies and was scared to walk into a clinic so I decided to try Cloud Doc...I definitely will never go back to in-person appointments.",
      author: "Julius M. ",
    },
    {
      rating: "5",
      text: "I was having some issues setting up my account but customer support was very fast and helped me set everything up within a minute. Managed to also see my doctor while being in another state. Very convenient!",
      author: " K.K ",
    },
    {
      rating: "5",
      text: "Signing up and seeing a doctor was pretty quick and easy. Would recommend it if you’re trying to avoid visiting a doctor in person.",
      author: "Althea B",
    },
    {
      rating: "5",
      text: "This was my first time using a telemedicine platform but it was a good experience overall. I was even prescribed my medication on the call with my doctor and sent to my local pharmacy to pick it up. Try it out guys, it’s free!",
      author: "Jim Gregory",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="patientReviewBg">
      <div className="basicLandingRow patientReview">
        <div className="patientReviewFlex">
          <div className="titleSec mb-5 mb-xl-0">
            <div>
              <div className="basicLandingTitle">
                Our patients love using My Cloud Doc
              </div>
              <div className="text">
                Check out what they’re saying about us!
              </div>
            </div>
          </div>
          <div className="sliderSec">
            <Carousel
              // swipeable={false}
              // draggable={false}
              // showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              // autoPlaySpeed={1000}
              // keyBoardControl={true}
              // customTransition="all .5"
              draggable={false}
              transitionDuration={300}
              //   containerClass="carouselContainerProvider"
              // customLeftArrow={<CustomLeftArrow />}
              // customRightArrow={<CustomRightArrow />}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              deviceType={props.deviceType}
              // dotListClass="custom-dot-list-style"
              itemClass="centerFlex"
            >
              {data &&
                data.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      rating={item.rating}
                      text={item.text}
                      author={item.author}
                    />
                  );
                })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ rating, text, author }) => {
  return (
    <div className="patientReviewCard">
      <div>
        <RatingComponent readOnly defaultValue={rating} />
      </div>
      <div className="message">{text}</div>
      <div className="flexCenter">
        <div className="divider"></div>
        <div className="authorText">{author}</div>
      </div>
    </div>
  );
};
