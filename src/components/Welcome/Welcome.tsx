import { FC } from 'react';

import Schoolboy3D from '@assets/welcomePage/Saly-14.png';
import Globe3D from '@assets/welcomePage/shar4.png';
import Gamer3D from '@assets/welcomePage/gamer3d.png';

import * as ST from './styled';

const Welcome: FC = () => {
  return (
    <ST.WelcomePageWrapper>
      <ST.UpperFrame>
        <img
          src={Schoolboy3D}
          alt="Schoolboy 3D Image"
        />
        <div className="welcome">
          <div className="welcome-title">ПРИВЕТ!</div>
          <div className="welcome-description">
            Прояви индивидуальность в игровом формате и впусти в свою жизнь мир уникальных 3D
            аватаров!
          </div>
        </div>
      </ST.UpperFrame>
      <ST.MiddleFrame>
        <div className="left-side">
          <div className="left-side-chats">
            создавай группы, чаты, где ты сможешь делиться со своими друзьями картинками со смешными
            котиками!
          </div>
          <div className="left-side-friends">общайся со своими друзьями!</div>
        </div>
        <img
          className="middle-img"
          src={Globe3D}
          alt="globe3dmodel"
        />
        <span className="middle-img-avatars">создавай свой уникальный 3D аватар</span>
      </ST.MiddleFrame>
      <ST.BottomFrame>
        <div className="bottom-frame">
          <div className="bottom-frame-title">ТВОЙ ПРОФИЛЬ</div>
          <div className="bottom-frame-description">
            Описание придумаем когда сделаем редактор моделей и будем понимать что мы вообще
            представляем и какие возможности даем пользователям
          </div>
        </div>
        <img
          src={Gamer3D}
          alt="gamer3dmodel"
        />
      </ST.BottomFrame>
    </ST.WelcomePageWrapper>
  );
};

export { Welcome };
