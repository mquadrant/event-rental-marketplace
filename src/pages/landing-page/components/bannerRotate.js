import React, { useEffect, useState } from "react";
import { ImageA, ImageB, ImageC } from "../../../images/banner_image";
import "./banner.css";

const images = [ImageA, ImageB, ImageC];

const eachBannerStyle = {
  bannerItem: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backkgroundRepeat: "no-repeat"
  }
};

const intervalTime = 5000;
const auto = true;
// };

export default function BannerRotate() {
  const classStyle = eachBannerStyle;
  const [slideCount, setSlideCount] = useState(0);
  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        if (slideCount === images.length - 1) setSlideCount(0);
        else setSlideCount((slideCount) => slideCount + 1);
      }, intervalTime);
      return () => clearInterval(interval);
    } else return;
  }, [slideCount]);

  return (
    <div className="banner">
      <div className="slider" id="main-banner">
        {images.map((image, index) => {
          return (
            <div
              className={`slide ${index === slideCount ? "current" : ""}`}
              style={{
                ...classStyle.bannerItem,
                backgroundImage: `url(${image})`
              }}
            >
              <div className="content">
                <h1>Find Event Rental Items</h1>
                <p>
                  Who knows your next neighbor might have what you are looking
                  for. Get the best rental service ever!{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
