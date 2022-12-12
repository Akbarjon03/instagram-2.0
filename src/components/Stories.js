import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  SetAddStoryModal,
  SetStoryIndex,
  selectStories,
} from "../features/appSlice";

function Stories() {
  const stories = useSelector(selectStories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storyIndex, setStoryIndex] = useState(null);

  const toggleAddStory = () => {
    dispatch(
      SetAddStoryModal({
        addStoryIsOpen: true,
      })
    );
  };

  if (storyIndex !== null) {
    navigate("/stories");
    dispatch(
      SetStoryIndex({
        storyIndex: storyIndex,
      })
    );
  }

  return (
    <StoriesWrap>
      <AddStoryWrap onClick={toggleAddStory}>
        <PlusIcon style={{ height: 60, color: "gray", padding: 2 }} />
        <p>Add Story</p>
      </AddStoryWrap>
      {stories?.map((story, index) => (
        <StoryContainer onClick={() => setStoryIndex(index)} key={story.id}>
          <img src={story?.data().image} alt="" />
          <p>{story?.data().username}</p>
        </StoryContainer>
      ))}
    </StoriesWrap>
  );
}

export default Stories;
const StoriesWrap = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: scroll;
  background-color: #fff;
  border: 1px solid rgb(212 212 212);
  padding: 10px;
  height: 100px;
  margin-bottom: 25px;

  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #000;
  }
`;
const AddStoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  > p {
    font-size: 12px;
  }
`;
const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  > img {
    object-fit: contain;
    height: 60px;
    width: 60px;
    border-radius: 9999px;
    padding: 4px;
    background-image: linear-gradient(
      to right,
      rgb(251 146 60),
      rgb(217 70 239)
    );
  }
  > p {
    font-size: 12px;
    max-width: 80px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
