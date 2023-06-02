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

const VIDEO_FORMATS = ['h264', 'mp4', 'ogg', 'raw', 'mov'];
const IMAGE_FORMATS = ['bmp', 'png', 'jpg', 'gif', 'jpeg', 'heic', 'webp'];

const Posts: FC<MiniProfilePostsProps> = ({ userInfo, otherUserId }) => {
  const toast = useToast();
  const [userPosts, setUserPosts] = useState<UserPostsDTO[]>([]);
  const [isEditPost, setIsEditPost] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [file, setFile] = useState<string>();
  const [fileType, setFileType] = useState<string>();

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
        if (!values.text && !values.attached.name) {
          toast.error({
            data: { message: 'Для публикации поста необходимо указать текст или загрузить файл' },
          });
        } else {
          const res = await createUserPost(formData);
          if ('error' in res) {
            handleFormError(res.error, createPostForm);
          } else {
            toast.success({ text: 'Пост опубликован!' });
            setFile('');
            setFileType('');
            if (typeof file === 'string') {
              window.URL.revokeObjectURL(file);
            }
            await getUsersPostHandler();
            createPostForm.resetForm();
          }
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
        setUserPosts(userPosts.filter((p) => p.id !== id));
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
        setIsEditPost('');
        setUserPosts(
          userPosts.map((post) => {
            if (post.id === request.id) {
              return res.data;
            } else return post;
          }),
        );
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
    const fileType = file.type.split('/')[0];
    setFile(window.URL.createObjectURL(file));
    setFileType(fileType);
  };

  const renderedPosts = useMemo(() => {
    return userPosts.length !== 0 ? (
      userPosts.map((it) => {
        const postCreated = new Date(it.createdAt);
        const { user } = it;
        const isVideo = VIDEO_FORMATS.includes(it.attached?.split('.').at(-1) as string);
        const isImage = IMAGE_FORMATS.includes(it.attached?.split('.').at(-1) as string);
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
                    {postCreated.toLocaleTimeString().slice(0, -3)}
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
                <div>{it.text}</div>
              )}
              {it.attached && (
                <>
                  {isImage && (
                    <ST.StyledAttachedWrapper>
                      <ST.StyledPostImage
                        src={it.attached}
                        alt="image"
                        preview
                      />
                    </ST.StyledAttachedWrapper>
                  )}
                  {isVideo && (
                    <ST.StyledAttachedWrapper>
                      <ST.StyledPostPlayer
                        controls
                        url={it.attached}
                      />
                    </ST.StyledAttachedWrapper>
                  )}
                </>
              )}
            </ST.PostContent>
            {/* TODO: реализовать когда сделаются на бэке лайки и комменты
            <ST.PostFooter>
              <ST.IconsWrapper>
                <ST.LikeStyled />
              </ST.IconsWrapper>
              <ST.IconsWrapper>
                <ST.CommentStyled />
              </ST.IconsWrapper>
            </ST.PostFooter>*/}
          </ST.Post>
        );
      })
    ) : (
      <ST.PostsPlug>
        К сожалению, этот пользователь пока не опубликовал ни одного поста :(
      </ST.PostsPlug>
    );
  }, [userPosts, userPostsIsLoading, isEditPost, editInputValue, otherUserId, userInfo]);

  const onCloseIconClick = () => {
    setFile('');
    setFileType('');
    createPostForm.setFieldValue('attached', {});
  };

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
              {file &&
                (fileType === 'image' ? (
                  <ST.StyledAttachedWrapper>
                    <ST.StyledImageDiv>
                      <ST.StyledPostImage
                        src={file}
                        alt="img"
                        preview
                      />
                      <ST.StyledCloseIcon onClick={onCloseIconClick}>x</ST.StyledCloseIcon>
                    </ST.StyledImageDiv>
                  </ST.StyledAttachedWrapper>
                ) : (
                  <ST.StyledAttachedWrapper>
                    <ST.StyledImageDiv>
                      <ST.StyledPostPlayer
                        controls
                        url={file}
                      />
                      <ST.StyledCloseIcon onClick={onCloseIconClick}>x</ST.StyledCloseIcon>
                    </ST.StyledImageDiv>
                  </ST.StyledAttachedWrapper>
                ))}
              <ST.CreatePostControlsWrapper>
                <ST.LoadImageWrapper>
                  <ST.StyledInputFile
                    name="attend"
                    id="attend"
                    type="file"
                    onChange={onChangeHandler}
                    hidden
                    accept=".bmp, .png, .jpg, .gif, .jpeg, .heic, .webp, .h264, .mp4, .ogg, .raw, .mov"
                  />
                  <ST.StyledLabelFile htmlFor="attend">
                    <ST.ImageIconStyled />
                    <ST.ImagesSplitter>|</ST.ImagesSplitter>
                    <ST.VideoIconStyled />
                  </ST.StyledLabelFile>
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
