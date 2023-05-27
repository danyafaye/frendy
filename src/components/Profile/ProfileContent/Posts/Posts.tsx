import { FC, useEffect, useMemo } from 'react';
import { CircleLoader } from 'react-spinners';

import { useFormik } from 'formik';
import { QueryStatus } from '@reduxjs/toolkit/query';

import { useAuth } from '@src/providers/AuthProvider';

import { useCreateUserPostMutation, useLazyGetUserPostsQuery } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

import { Button } from '@components/Button';

import { handleFormError } from '@utils/handleFormError';

import HeaderTemplate from '@assets/header_template.png';

import * as ST from '../../styled';

const Posts: FC = () => {
  const { userInfo } = useAuth();
  const toast = useToast();

  const [getUsersPost, { data: userPosts, status: userPostsIsLoading }] =
    useLazyGetUserPostsQuery();

  const [createUserPost] = useCreateUserPostMutation();

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
          toast.success({ text: 'Информация успешно изменена' });
          await getUsersPost({ user_id: userInfo.id });
        }
      } catch (e) {
        throw e;
      }
    },
  });

  useEffect(() => {
    getUsersPost({ user_id: userInfo.id });
  }, []);

  const renderedPosts = useMemo(() => {
    return (
      userPosts?.map((it) => {
        const postCreated = new Date(it.createdAt).toLocaleDateString();
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
                  <ST.PostHeaderBottomContent>{postCreated}</ST.PostHeaderBottomContent>
                </ST.PostHeaderContent>
              </ST.PostHeaderLeftContent>
              <div>
                <ST.PostHeaderEditStyled />
              </div>
            </ST.PostHeader>
            <ST.PostContent>
              {it.text}
              {it.attached}
            </ST.PostContent>
            <ST.PostFooter>
              <ST.IconsWrapper>
                <ST.LikeStyled />
                <div>0</div>
              </ST.IconsWrapper>
              <ST.IconsWrapper>
                <ST.CommentStyled />
                <div>0</div>
              </ST.IconsWrapper>
            </ST.PostFooter>
          </ST.Post>
        );
      }) || []
    );
  }, [userPosts, userPostsIsLoading]);

  return (
    <ST.PostsWrapper>
      <ST.CreatePostForm onSubmit={createPostForm.handleSubmit}>
        <ST.PostsTextArea
          onChange={createPostForm.handleChange}
          value={createPostForm.values.text}
          name="text"
          placeholder="Что у вас нового?"
        />
        <Button
          type="submit"
          text="Опубликовать"
          decoration="filled"
        />
      </ST.CreatePostForm>
      {renderedPosts}
    </ST.PostsWrapper>
  );
};

export { Posts };
