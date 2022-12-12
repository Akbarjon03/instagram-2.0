import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectStories,
  selectStoryIndex,
  selectMobile,
} from "../features/appSlice";

function StoryBoard() {
  const storyIndex = useSelector(selectStoryIndex);
  const stories = useSelector(selectStories);
  const mobile = useSelector(selectMobile);
  const [currentStory, setCurrentStory] = useState();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [nextArrow, setNextArrow] = useState(false);
  const [prevArrow, setPrevArrow] = useState(false);

  useEffect(() => {
    const setStoryIndex = () => {
      setCurrentStoryIndex(storyIndex);
    };

    setStoryIndex();
  }, [storyIndex]);

  useEffect(() => {
    const getStory = () => {
      setCurrentStory(stories[currentStoryIndex]);
    };
    getStory();
  }, [currentStoryIndex, stories]);

  useEffect(() => {
    const setNext = () => {
      if (
        stories.length >= 2 &&
        currentStoryIndex >= 0 &&
        currentStoryIndex !== stories.length - 1
      ) {
        setNextArrow(true);
      } else {
        setNextArrow(false);
      }
    };
    setNext();
  }, [currentStoryIndex, stories.length]);

  useEffect(() => {
    const setPrev = () => {
      if (stories.length >= 2 && currentStoryIndex !== 0) {
        setPrevArrow(true);
      } else {
        setPrevArrow(false);
      }
    };
    setPrev();
  }, [currentStoryIndex, stories.length]);

  const toggleNext = () => {
    if (
      stories.length >= 2 &&
      currentStoryIndex >= 0 &&
      currentStoryIndex !== stories.length - 1
    ) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };
  const togglePrev = () => {
    if (stories.length >= 2 && currentStoryIndex !== 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <MainWrapper>
      {!mobile && (
        <StoriesList>
          {stories?.map((story, index) => (
            <StoryWrap key={index} onClick={() => setCurrentStoryIndex(index)}>
              <ImageWrap>
                <ImageBackground src={story?.data().image} alt="image" />
              </ImageWrap>
              <UserProfile src={story?.data().profileImg} alt="profile" />
            </StoryWrap>
          ))}
        </StoriesList>
      )}
      {currentStory && (
        <StoryModal
          style={{
            backgroundImage: `url(${currentStory?.data().image})`,
            backgroundSize: "contain, cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* MAIN STORY WRAP */}
          <StoryModalContent>
            <HeaderContent>
              <img src={currentStory?.data().profileImg} alt="" />
              <p>{currentStory?.data().username}</p>
              <span>
                {moment(currentStory?.data().timestamp?.toDate()).calendar()}
              </span>
            </HeaderContent>

            {/* Image switch arrows */}
            <ArrowsWrap>
              {prevArrow && (
                <ChevronLeftIcon
                  className="Story_Arrows"
                  onClick={togglePrev}
                  style={{ left: 0 }}
                />
              )}
              {nextArrow && (
                <ChevronRightIcon
                  className="Story_Arrows"
                  onClick={toggleNext}
                  style={{ right: 0 }}
                />
              )}
            </ArrowsWrap>
          </StoryModalContent>
        </StoryModal>
      )}
    </MainWrapper>
  );
}

export default StoryBoard;
const MainWrapper = styled.div`
  background-color: rgb(23 23 23);
  height: 100vh;
  position: relative;
`;
const StoriesList = styled.div`
  height: 100vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(rgb(251 146 60), rgb(217 70 239));
    border-radius: 10px;
  }
`;
const StoryWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-right: 20px;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.01);
  }
`;
const ImageWrap = styled.div`
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(223, 223, 223, 0.6);
  border-radius: 10px;
`;
const UserProfile = styled.img`
  position: absolute;
  border-radius: 9999px;
  width: 60px;
  height: 60px;
  object-fit: contain;
  padding: 4px;
  cursor: pointer;
  background-image: linear-gradient(to right, rgb(251 146 60), rgb(217 70 239));
`;
const ImageBackground = styled.img`
  height: 25vh;
  width: 150px;
  object-fit: contain;
  border-radius: 10px;
`;
const StoryModal = styled.div`
  position: absolute;

  height: 80vh;
  width: 100%;
  top: 20px;

  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;

  @media (min-width: 750px) {
    width: 40vw;
    top: 50px;
    right: 30vw;
    left: 30vw;
  }
`;
const StoryModalContent = styled.div``;
const HeaderContent = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-top-left-radius: 10px; /* 4px */
  border-top-right-radius: 10px; /* 4px */
  > img {
    height: 40px;
    width: 40px;
    object-fit: contain;
    border-radius: 9999px;
  }
  > p {
    color: rgb(245 245 245);
    font-weight: 500;
    font-size: 15px;
  }
  > span {
    color: rgb(163 163 163);
  }
`;
const ArrowsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25vh;
`;
