import React from "react";
import styled, { keyframes } from "styled-components";

const fadeInLeftAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInRightAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
const fadeUpAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const fadeDownAnimation = keyframes`
  0% {
    transform: translateY(-1000%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const StyleAboutUs = styled.div`
  margin: 1rem 3rem;
  text-align: justify;
  max-width: 1280px;
  padding: 15px;
  margin: 1rem auto;
`;
const StyleMission = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1.5rem 3rem;
  gap: 2rem;

  & h2 {
    margin: 2rem 0;
    color: #00229b;
    font-size: 2rem;
  }
  .mission-content {
    line-height: 1.8rem;
    text-align: center;
    animation: ${fadeInLeftAnimation} 0.1s ease-out;
  }

  .mission-img {
    animation: ${fadeInRightAnimation} 0.1s ease-out;
  }
`;
const StyleStory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10rem;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${fadeUpAnimation} 3s ease-out;
  & h2 {
    margin: 0 auto;
    margin-bottom: 1rem;
    color: #7092ff;
    font-size: 2rem;
  }
  img {
    margin: 0 auto;
    border-radius: 40%;
    width: 80%;
    height: 80%;
    object-fit: cover;
    padding: 2rem 0;
  }
`;

const StyleFounder = styled.div`
  @keyframes bounce {
    0% {
      transform: translateY(150%);
    }
    15% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(50%);
    }
    45% {
      transform: translateY(0);
    }
    60% {
      transform: translateY(25%);
    }
    75% {
      transform: translateY(0);
    }
    88% {
      transform: translateY(15%);
    }
    100% {
      transform: translateY(0);
    }
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 2rem;
  text-align: center;
  animation: bounce 0.1s ease-in-out;
  img {
    margin: 0 auto;
    /* border-radius: 50%; */
    width: 80%;
    height: 65%;
    object-fit: cover;
  }
  .underline {
    width: 50%;
    height: 0.5rem;
    border-radius: 0;
    box-shadow: 0 5px 0 #dfb3ff;
  }
  p {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    /* color: #4767d7; */
    color: #7751ff;
  }
`;
const StyleFounderTitle = styled.div`
  margin: 2rem auto;
  font-size: 2rem;
  font-weight: bold;
  /* color: #4767d7; */
  color: #1942d6;
  text-align: center;
  animation: ${fadeDownAnimation} 0.1s ease-out;
`;

export default function AboutUs() {
  return (
    <StyleAboutUs>
      <StyleMission>
        <div className="mission-content">
          <h2>Our Mission</h2>
          Arts is a charming stationery shop committed to providing exceptional quality and
          personalized customer service. The knowledgeable team ensures each visitor leaves with the
          perfect item to suit their unique style and occasion. By curating a diverse collection of
          handcrafted products, Arts aspires to inspire creativity, ignite the imagination, and
          foster a sense of community.
        </div>
        <div className="mission-img">
          <img src="src/features/aboutUs-FAQ/assets/Mission.png" alt="mission-img" />
        </div>
      </StyleMission>
      <div>
        <StyleFounderTitle>Founder Team</StyleFounderTitle>
        <StyleFounder>
          <div>
            <img src="src/features/aboutUs-FAQ/assets/nhan.jpg" alt="Nhan" />
            <p>Nhan Nguyen</p>
            <img className="underline" src="src/features/aboutUs-FAQ/assets/underline.jpg" />
          </div>
          <div>
            <img src="src/features/aboutUs-FAQ/assets/Mai.jpg" alt="Mai" />
            <p>Khloe Nguyen</p>
            <img className="underline" src="src/features/aboutUs-FAQ/assets/underline.jpg" />
          </div>
          <div>
            <img src="src/features/aboutUs-FAQ/assets/Giu.jpg" alt="Giu" />
            <p>Giu Phan</p>
            <img className="underline" src="src/features/aboutUs-FAQ/assets/underline.jpg" />
          </div>
          <div>
            <img src="src/features/aboutUs-FAQ/assets/Tan.jpg" alt="Tan" />
            <p>Tan Ngo</p>
            <img className="underline" src="src/features/aboutUs-FAQ/assets/underline.jpg" />
          </div>
        </StyleFounder>
      </div>

      <StyleStory>
        <h2>Our Story</h2>
        <div>
          The story of Arts began with the dream of its founding team - four creative visionaries
          who recognized the growing demand for stylish, affordable stationery and gifts in an
          increasingly digital world. Determined to build a space that would delight and inspire,
          the team poured their hearts and souls into curating a collection that celebrates the
          timeless art of self-expression.
        </div>
        <br />
        <div>
          <img src="src/features/aboutUs-FAQ/assets/story.jpg" alt="" />
        </div>
        <div>
          The true essence of Arts lies in its ability to connect people through creativity. The
          vibrant displays and carefully curated collections invite visitors to explore their
          artistic side, sparking ideas and igniting the imagination. Each item at Arts tells a
          story, inviting customers to share their own stories and create lasting memories.
        </div>
        <br />
        <div>
          As the city continues to evolve, Arts remains a steadfast sanctuary, where the art of
          handcrafted stationery and gifts endures, fostering a sense of community that transcends
          the boundaries of time and technology.
        </div>
      </StyleStory>
    </StyleAboutUs>
  );
}
