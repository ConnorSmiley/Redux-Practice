import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { allPosts, getPostsStatus, getPostsError, fetchPosts } from "@/redux/features/postSlice";
import AddPostForm from "@/redux/features/AddPostForm";
import PostAuthor from "@/redux/features/Users/postAuthor";
import TimeAgo from "@/redux/features/TimeAgo";
import ReactionButtons from "@/redux/features/ReactionButtons";
import { useEffect } from "react";

const Container = styled.div`
  ${tw`
  bg-black
  w-screen
  h-screen
  flex
  justify-center
  items-center
    `}
`;

const Styles = styled.div`
  ${tw`
  text-white
  flex
  flex-col
  items-center
  w-[42em]
    
    `}
`;

const MappedContainer = styled.div`
  ${tw`
  flex
  items-center
  border-2
  border-white
  w-full
    `}
`;

const MappedStyles = styled.div`
  ${tw`
  p-4
  w-full
    `}
`;

const ListStyles = styled.div`
  ${tw`
  text-white
  text-2xl 
  uppercase
  font-extrabold
  w-full
    
    `}
`;

const AuthorTime = styled.div`
  ${tw`
    text-base
    uppercase
    flex
    justify-between
    w-full
    pt-2
    uppercase
    font-bold
    
    `}
`;

export default function PostList() {
  const posts = useSelector(allPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const postsFetch = useSelector(fetchPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle")
      {
      dispatch(fetchPosts());
      }
  }, [postStatus, dispatch]);


  const orderPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date));

  const mapped = orderPosts.map(x => (
    <MappedContainer>
      <MappedStyles>
        <article key={x.id}>
          <ListStyles>
            <h3>{x.title}</h3>
            <p>{x.content}</p>
          </ListStyles>
          <AuthorTime>
            <PostAuthor userId={x.userId} />
            <TimeAgo timestamp={x.date} />
          </AuthorTime>
          <ReactionButtons post={x} />
        </article>
      </MappedStyles>
    </MappedContainer>
  ));


  return (
    <>
      <Container>
        <Styles>
          <AddPostForm />
          {mapped}
        </Styles>
      </Container>
    </>
  );
}
