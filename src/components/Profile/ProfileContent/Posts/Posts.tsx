import { FC, useEffect, useMemo, useState } from 'react';
import { CircleLoader } from 'react-spinners';

import { useFormik } from 'formik';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { MiniProfilePostsProps } from '@src/@types/profile';

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
import { StyledInputFile, StyledLabelFile } from '../../styled';

const Posts: FC<MiniProfilePostsProps> = ({ userInfo, otherUserId }) => {
  const toast = useToast();
  const [userPosts, setUserPosts] = useState<UserPostsDTO[]>([]);
  const [isEditPost, setIsEditPost] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [image, setImage] = useState<string>();

  const [getUsersPost, { status: userPostsIsLoading }] = useLazyGetUserPostsQuery();

  const getUsersPostHandler = async () => {
    try {
      const res = await getUsersPost({ user_id: userInfo.id });
      if ('error' in res) {
        toast.error(res.error);
      } else {
        setUserPosts(res.data || []);
      }
    } catch (e) {
      throw e;
    }
  };

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
      attached: {} as File,
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('attached', values.attached);
        formData.append('text', values.text);
        const res = await createUserPost(formData);
        if ('error' in res) {
          handleFormError(res.error, createPostForm);
        } else {
          toast.success({ text: 'Пост опубликован!' });
          await getUsersPostHandler();
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
        await getUsersPostHandler();
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
        await getUsersPostHandler();
        setIsEditPost('');
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getUsersPostHandler();
  }, [userInfo]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    createPostForm.setFieldValue('attached', file);
    setImage(window.URL.createObjectURL(file));
  };

  const renderedPosts = useMemo(() => {
    return userPosts.length !== 0 ? (
      userPosts.map((it) => {
        const postCreated = new Date(it.createdAt);
        const { user } = it;
        return (
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
              {otherUserId ? null : (
                <div>
                  <ST.PostHeaderEditStyled onClick={() => isEditPostHandler(it)} />
                  <ST.PostHeaderDeleteStyled onClick={() => deletePostHandler(it.id)} />
                </div>
              )}
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

              <img
                src={it.attached}
                alt="image"
              />
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
      })
    ) : (
      <ST.PostsPlug>
        К сожалению, этот пользователь пока не опубликовал ни одного поста :(
      </ST.PostsPlug>
    );
  }, [userPosts, userPostsIsLoading, isEditPost, editInputValue, otherUserId, userInfo]);

  return (
    <ST.PostsWrapper>
      {userPostsIsLoading === QueryStatus.pending ? (
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
        <>
          {otherUserId ? null : (
            <ST.CreatePostForm onSubmit={createPostForm.handleSubmit}>
              <ST.PostsTextArea
                onChange={createPostForm.handleChange}
                value={createPostForm.values.text}
                name="text"
                placeholder="Что у вас нового?"
              />
              {image && (
                <img
                  src={image}
                  alt="img"
                />
              )}
              <ST.CreatePostControlsWrapper>
                <ST.LoadImageWrapper>
                  <StyledInputFile
                    name="attend"
                    id="attend"
                    type="file"
                    onChange={onChangeHandler}
                  />
                  <StyledLabelFile htmlFor="attend">
                    <ST.ImageIconStyled />
                  </StyledLabelFile>
                </ST.LoadImageWrapper>

                <Button
                  type="submit"
                  text="Опубликовать"
                  decoration="filled"
                  size="sm"
                />
              </ST.CreatePostControlsWrapper>
            </ST.CreatePostForm>
          )}
          {renderedPosts}
        </>
      )}
    </ST.PostsWrapper>
  );
};

export { Posts };
