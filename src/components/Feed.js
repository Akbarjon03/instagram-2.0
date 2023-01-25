import React from "react";
import styled from "styled-components";
import PersonalInfoCard from "./InfoCard";
import { useSelector } from "react-redux";
import { selectMobile, selectPosts } from "../Slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Post from "./ShowPosts";

function Feed() {
  const mobile = useSelector(selectMobile);
  const posts = useSelector(selectPosts);
  const [user] = useAuthState(auth);

  return (
    <FeedContainer>
        <PostsContainer>
          {posts?.map((post) => (
            <Post post={post} key={post.id} user={user} />
          ))}
        </PostsContainer>
      {!mobile ? (
        <Widgets>
          <PersonalInfoCard user={user} />
          <SuggestionsContainer>
            <SuggestionsHeader>
              <h4>Suggestions For You</h4>
              <p>See All</p>
            </SuggestionsHeader>
          </SuggestionsContainer>
          <p style={{ color: "rgb(212 212 216)", fontSize: 13, marginTop: 50 }}>
          © 2022 INSTAGRAM FROM META
          </p>
        </Widgets>
      ) : (
        ""
      )}
    </FeedContainer>
  );
}

export default Feed;

const FeedContainer = styled.div`
  display: flex;
  border: 1px solid #f7fafc;
  margin-top: 20px;
`;

const PostsContainer = styled.div``;

const Widgets = styled.div`
  @media (min-width: 750px) {
    flex: 0.4;
  }
  padding: 0 20px;
`;
const SuggestionsContainer = styled.div``;
const SuggestionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > p {
    font-weight: 100;
  }
  h4 {
    color: gray;
  }
`;
