import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from '@src/providers/AuthProvider';

import { useLazyGetUserQuery } from '@api/UsersApi/UsersApi';
import { UsersDTO } from '@api/UsersApi';

import { MiniProfile } from '@components/Profile/ProfileContent/MiniProfile';
import { Posts } from '@components/Profile/ProfileContent/Posts';

import * as ST from '../styled';

const ProfileContent: FC = () => {
  const { userInfo } = useAuth();
  const [params] = useSearchParams(window.location.search);
  const otherUserId = params.get('id');

  const [getUserQuery] = useLazyGetUserQuery();

  const [user, setUser] = useState<UsersDTO[]>([userInfo]);

  const getUser = async () => {
    try {
      if (params.get('id')) {
        const res = await getUserQuery({ query: params.get('id') || '' });
        if ('data' in res) {
          setUser(res.data || []);
        }
      } else {
        setUser([userInfo]);
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getUser();
  }, [params]);

  return (
    <ST.ProfileContentBlock
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      key="PROFILE_CONTENT"
    >
      <ST.ProfileContentLeft
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
      >
        <Posts
          userInfo={user[0]}
          otherUserId={Boolean(otherUserId)}
        />
      </ST.ProfileContentLeft>
      <ST.ProfileContentRight
        variants={{
          hidden: { opacity: 0, x: +20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        }}
      >
        <MiniProfile
          userInfo={user[0]}
          otherUserId={Boolean(otherUserId)}
        />
      </ST.ProfileContentRight>
    </ST.ProfileContentBlock>
  );
};

export { ProfileContent };
