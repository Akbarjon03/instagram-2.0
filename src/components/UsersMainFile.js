import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserAddIcon, ChevronDownIcon, BookOpenIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { SelectProfile } from "../Slice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Profile() {
  const profile = useSelector(SelectProfile);
  const [posts, setPosts] = useState([]);
  const colRef = collection(db, "posts");
  const q = query(colRef, where("userId", "==", `${profile.userId}`));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, [q]);
  return (
    <ProfileWrapper>
      <HeaderWrap>
        <img src={profile.userProfile} alt="Profile_photo" />
        <HeaderInfoWrap>
          <section>
            <h1>{profile.username}</h1>
            <ButtonsContainer>
              <ChevronDownIcon className="Profile__BUtton" />
              <UserAddIcon className="Profile__BUtton" />
            </ButtonsContainer>
          </section>
          <StatisticsWrap>
            <p>
              <strong>{posts?.length}</strong> posts
            </p>
          </StatisticsWrap>
        </HeaderInfoWrap>
      </HeaderWrap>
      <div
        style={{
          borderTop: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <BookOpenIcon style={{ height: 20 }} /> POSTS
      </div>
      <Gallery>
        {posts?.map((post, index) => (
          <img src={post.data().image} alt="" key={index} />
        ))}
      </Gallery>
    </ProfileWrapper>
  );
}

export default Profile;
const ProfileWrapper = styled.div`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderWrap = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  border-bottom: 1px solid rgb(229 229 229);
  padding-bottom: 50px;
  > img {
    object-fit: contain;
    width: 150px !important;
    border-radius: 9999px;
    padding: 4px;
    border: 3px solid rgb(219 39 119);
    flex: 0.2;
  }
`;
const HeaderInfoWrap = styled.div`
  flex: 0.8;
  > section {
    display: flex;
    flex-direction: column;
    gap: 30px;
    @media (min-width: 750px) {
      display: flex;
      gap: 30px;
    }
  }
  > section > h1 {
    color: rgb(115 115 115);
    font-size: 30px;
    font-weight: 200;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const StatisticsWrap = styled.div`
  padding: 20px 0;
`;
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 20px;

  > img {
    width: 100%;
  }
`;
