import { FC, useEffect, useMemo, useState } from 'react';
import { CircleLoader } from 'react-spinners';

import { useFormik } from 'formik';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { useAuth } from '@src/providers/AuthProvider';

import {
  useCreateUserPostMutation,
  useDeleteUserPostMutation,
  useEditUserPostMutation,
  useLazyGetUserPostsQuery,
} from '@api/UsersApi/UsersApi';
import { EditUserPostRequestDTO, UserPostsDTO } from '@api/UsersApi';

import { useToast } from '@hooks/useToast';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { handleFormError } from '@utils/handleFormError';

import HeaderTemplate from '@assets/header_template.png';

import * as ST from '../../styled';

const Posts: FC = () => {
  const { userInfo } = useAuth();
  const toast = useToast();

  const [isEditPost, setIsEditPost] = useState('');
  const [editInputValue, setEditInputValue] = useState('');

  const [getUsersPost, { data: userPosts, status: userPostsIsLoading }] =
    useLazyGetUserPostsQuery();

  const [createUserPost] = useCreateUserPostMutation();
  const [deleteUserPost] = useDeleteUserPostMutation();
  const [editUserPost] = useEditUserPostMutation();

  const isEditPostHandler = (post: UserPostsDTO) => {
    if (isEditPost !== post.id) {
      setIsEditPost(post.id);
      setEditInputValue(post.text);
    } else {
      setIsEditPost('');
      setEditInputValue('');
    }
  };

  const createPostForm = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await createUserPost({ text: values.text });
        if ('error' in res) {
          handleFormError(res.error, createPostForm);
        } else {
          toast.success({ text: 'Пост опубликован!' });
          await getUsersPost({ user_id: userInfo.id });
          createPostForm.resetForm();
        }
      } catch (e) {
        throw e;
      }
    },
  });

  const deletePostHandler = async (id: string) => {
    try {
      const res = await deleteUserPost({ id });
      if ('error' in res) {
        toast.error(res.error);
      } else {
        toast.success({ text: 'Пост удален!' });
        await getUsersPost({ user_id: userInfo.id });
      }
    } catch (e) {
      throw e;
    }
  };

  const editUserPostHandler = async (request: EditUserPostRequestDTO) => {
    try {
      const res = await editUserPost({ id: request.id, text: request.text });
      if ('error' in res) {
        toast.error(res.error);
      } else {
        toast.success({ text: 'Пост отредактирован!' });
        await getUsersPost({ user_id: userInfo.id });
        setIsEditPost('');
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getUsersPost({ user_id: userInfo.id });
  }, []);

  const renderedPosts = useMemo(() => {
    return (
      userPosts?.map((it) => {
        const postCreated = new Date(it.createdAt);
        const { user } = it;
        return userPostsIsLoading === QueryStatus.pending ? (
          <CircleLoader
            color="#82616C"
            size={150}
            cssOverride={{
              position: 'absolute',
              top: '40%',
              left: '45%',
            }}
          />
        ) : (
          <ST.Post key={it.id}>
            <ST.PostHeader>
              <ST.PostHeaderLeftContent>
                {user.avatar ? (
                  <ST.PostHeaderAvatar src={user.avatar} />
                ) : (
                  <ST.PostHeaderAvatar src={HeaderTemplate} />
                )}
                <ST.PostHeaderContent>
                  <ST.PostHeaderUpperContent>
                    <div>{user.firstName}</div>
                    <div>{user.lastName}</div>
                  </ST.PostHeaderUpperContent>
                  <ST.PostHeaderBottomContent>
                    {postCreated.toLocaleDateString()}{' '}
                    {postCreated.toLocaleTimeString().slice(0, 5)}
                  </ST.PostHeaderBottomContent>
                </ST.PostHeaderContent>
              </ST.PostHeaderLeftContent>
              <div>
                <ST.PostHeaderEditStyled onClick={() => isEditPostHandler(it)} />
                <ST.PostHeaderDeleteStyled onClick={() => deletePostHandler(it.id)} />
              </div>
            </ST.PostHeader>
            <ST.PostContent>
              {isEditPost === it.id ? (
                <ST.UserPostEditWrapper>
                  <Input
                    value={editInputValue}
                    onChange={(e) => {
                      setEditInputValue(e.currentTarget.value);
                    }}
                    inputSize="md"
                  />
                  <Button
                    text="Применить"
                    onClick={() => editUserPostHandler({ id: it.id, text: editInputValue })}
                    size="md"
                  />
                </ST.UserPostEditWrapper>
              ) : (
                it.text
              )}
              {it.attached}
            </ST.PostContent>
            <ST.PostFooter>
              <ST.IconsWrapper>
                <ST.LikeStyled />
              </ST.IconsWrapper>
              <ST.IconsWrapper>
                <ST.CommentStyled />
              </ST.IconsWrapper>
            </ST.PostFooter>
          </ST.Post>
        );
      }) || []
    );
  }, [userPosts, userPostsIsLoading, isEditPost, editInputValue]);

  return (
    <ST.PostsWrapper>
      <ST.CreatePostForm onSubmit={createPostForm.handleSubmit}>
        <ST.PostsTextArea
          onChange={createPostForm.handleChange}
          value={createPostForm.values.text}
          name="text"
          placeholder="Что у вас нового?"
        />
        <ST.CreatePostControlsWrapper>
          <ST.ImageIconStyled />
          <Button
            type="submit"
            text="Опубликовать"
            decoration="filled"
            size="sm"
          />
        </ST.CreatePostControlsWrapper>
      </ST.CreatePostForm>
      {renderedPosts}
    </ST.PostsWrapper>
  );
};

export { Posts };
