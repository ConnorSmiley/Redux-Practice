import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsAdded } from "@/redux/features/postSlice";
import styled from "styled-components";
import tw from "twin.macro";
import { allUsers } from "@/redux/features/Users/usersSlice";


const FormContainer = styled.div`
  ${tw`
    `}
`;

const H2 = styled.h2`
    ${tw`
    font-extrabold
    text-2xl
    uppercase
    pb-2
    
    `}
`

const FormStyles = styled.div`
  ${tw`
  flex
  items-center
  flex-col
    `}
`;

const Section = styled.section`
    ${tw`
    flex
    flex-col
    justify-center
    items-center
    
    `}
`
const Form = styled.form`
    ${tw`
    flex
    items-center
    flex-col
    `}
`

const Input = styled.input`
    ${tw`
    w-80
    h-10
    rounded-md
    py-4
    text-black
    px-2
    
    `}
`

const Textarea = styled.textarea`
    ${tw`
    w-80
    h-28
    mt-2
    text-black
    px-2
    rounded-md
    
    `}
`

const Button = styled.button`
    ${tw`
    text-white
    bg-pink-500
    px-20
    py-1
    rounded-md
    uppercase
    text-xl
    font-extrabold
    my-4
    hover:cursor-pointer
    hover:bg-pink-200
    
    `}
`
const Select = styled.select`
    ${tw`
    text-black
    text-xl
    
    `}
`

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState("");
  const user = useSelector(allUsers)
  const dispatch = useDispatch();

  const changeTitle = (e: any) => setTitle(e.target.value);
  const changeContent = (e: any) => setContent(e.target.value);
  const changeUsers = (e:any) => setUsers(e.target.value)

  const onSave = () => {
    if (title && content) {
      dispatch(
        postsAdded(title, content, users)
      );
      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(users)

  const usersMapped = user.map(x => (
    <option key={x.id} value ={x.id}>
      {x.name}
    </option>
  ))

  return (
    <FormContainer>
      <FormStyles>
        <Section>
          <H2> Add New post</H2>
          <Form>
            <Input
              type="text"
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={changeTitle}
            />
            <Select
              id="postAuthor"
              value={users}
              onChange={changeUsers}
            >
              <option value=""></option>
              {usersMapped}
            </Select>
            <Textarea
              id="postContent"
              name="postContent"
              value={content}
              onChange={changeContent}
            />
            <Button
              type="button"
              onClick={onSave}
              disabled={!canSave}
            >save</Button>
          </Form>
        </Section>
      </FormStyles>
    </FormContainer>
  );
}
