import { FC } from 'react';

import { useAuth } from '@src/providers/AuthProvider';

import HeaderTemplate from '@assets/header_template.png';

import * as ST from '../../styled';

const Posts: FC = () => {
  const { userInfo } = useAuth();

  return (
    <ST.PostsWrapper>
      <ST.Post>
        <ST.PostHeader>
          <ST.PostHeaderLeftContent>
            {userInfo.avatar ? (
              <ST.PostHeaderAvatar src={userInfo.avatar} />
            ) : (
              <ST.PostHeaderAvatar src={HeaderTemplate} />
            )}
            <ST.PostHeaderContent>
              <ST.PostHeaderUpperContent>
                <div>{userInfo.firstName}</div>
                <div>{userInfo.lastName}</div>
              </ST.PostHeaderUpperContent>
              <ST.PostHeaderBottomContent>27 мая 2023</ST.PostHeaderBottomContent>
            </ST.PostHeaderContent>
          </ST.PostHeaderLeftContent>
          <div>
            <ST.PostHeaderEditStyled />
          </div>
        </ST.PostHeader>
        <ST.PostContent>Мой первый пост!</ST.PostContent>
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
    </ST.PostsWrapper>
  );
};

export { Posts };
