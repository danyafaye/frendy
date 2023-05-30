import styled from 'styled-components';
import { motion } from 'framer-motion';

import { COLORS } from '@src/constants/styles';

import { ReactComponent as EditIcon } from '@assets/icons/edit_icon.svg';
import { ReactComponent as LikeIcon } from '@assets/icons/like_icon.svg';
import { ReactComponent as CommentIcon } from '@assets/icons/comment_icon.svg';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete_icon.svg';
import { ReactComponent as ImageIcon } from '@assets/icons/image_icon.svg';

export const ProfileWrapper = styled(motion.div)`
  display: flex;
  height: 100%;
  background-color: rgba(130, 97, 108, 0.25);
`;

export const ProfileBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export const ProfileContentWrapper = styled.div`
  flex-basis: 85%;
  padding: 20px;
`;

export const ProfileSidebarBlock = styled(ProfileBlock)`
  flex-basis: 15%;
  border-radius: 10px;
  padding: 24px;
  position: sticky;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.05);
  background-color: ${COLORS.$white100};
  margin: 20px;
`;

export const ProfileTitle = styled.div`
  font-size: 24px;
`;

export const ProfileContentBlock = styled(ProfileBlock)`
  display: flex;
  flex-direction: row;
  row-gap: 10px;
  height: 100%;
  align-items: flex-start;
  column-gap: 40px;
`;

export const ProfileContent = styled(motion.div)`
  background-color: ${COLORS.$white100};
  border-radius: 10px;
  padding: 24px;
  display: flex;
  column-gap: 10px;
`;

export const ProfileContentAvatar = styled.div`
  width: 272px;
  height: 272px;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProfileContentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const AvatarStyled = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid ${COLORS.$purple50};
`;

export const ProfileUserName = styled.div`
  font-size: 24px;
  font-weight: 300;
  word-break: normal;
  color: ${COLORS.$gray90};
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const ProfileContentLeft = styled(ProfileContent)`
  height: 100%;
  flex-basis: 80%;
`;

export const ProfileContentRight = styled(ProfileContent)`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const ProfileUserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  row-gap: 20px;
  column-gap: 27px;
  width: 100%;
  overflow-y: auto;
`;

export const Post = styled.div`
  border: 1px solid #d5dadd;
  border-radius: 8px;
  padding: 28px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: border 0.3s ease-in-out;
  font-size: 18px;
  row-gap: 24px;
  &:hover {
    border: 1px solid ${COLORS.$purple50};
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostHeaderLeftContent = styled.div`
  display: flex;
  column-gap: 12px;
`;

export const PostHeaderAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${COLORS.$purple50};
`;

export const PostHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostHeaderUpperContent = styled.div`
  display: flex;
  column-gap: 6px;
  font-size: 20px;
`;

export const PostHeaderBottomContent = styled.div`
  display: flex;
  column-gap: 6px;
  font-size: 16px;
  color: rgb(130, 130, 130);
  font-weight: 300;
`;

export const PostContent = styled.div``;

export const PostHeaderEditStyled = styled(EditIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  fill: rgb(130, 130, 130);
  &:hover {
    fill: ${COLORS.$purple50};
  }
`;

export const PostHeaderDeleteStyled = styled(DeleteIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  fill: red;
`;

export const PostFooter = styled.div`
  display: flex;
  column-gap: 10px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255) !important;
  fill: ${COLORS.$gray90};
  transition: all 0.3s ease-in-out;
  border: 1px solid #d5dadd;
  padding: 6px 12px;
  border-radius: 32px;
  font-size: 14px !important;
  line-height: 14px !important;
  &:hover {
    background-color: #d5dadd;
  }

  cursor: pointer;
`;

export const LikeStyled = styled(LikeIcon)`
  width: 24px;
  height: 24px;
`;

export const CommentStyled = styled(CommentIcon)`
  width: 24px;
  height: 24px;
`;

export const PostsTextArea = styled.textarea`
  resize: none;
  height: 100px;
  padding: 10px;
  border: 1px solid #d5dadd;
  border-radius: 8px;
  &::placeholder {
    font-size: 18px;
    font-weight: 300;
  }
`;

export const CreatePostForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #d5dadd;
  border-radius: 8px;
  padding: 10px;
  row-gap: 10px;
  background-color: ${COLORS.$white80};
`;

export const UserPostEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const CreatePostControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageIconStyled = styled(ImageIcon)`
  transition: fill 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    fill: ${COLORS.$purple50};
  }
`;

export const PostsPlug = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #696969;
`;

export const DropAreaActive = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 75.5px 0;
  border: 3px dashed #d5dadd;
  background-color: ${COLORS.$white80};
  border-radius: 8px;
`;

export const LoadImageWrapper = styled.div``;

export const StyledInputFile = styled.input``;

export const StyledLabelFile = styled.label``;
