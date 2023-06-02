import { FC } from 'react';

import { motion } from 'framer-motion';

import Schoolboy3D from '@assets/welcomePage/Saly-14.png';
import Globe3D from '@assets/welcomePage/shar4.png';
import Gamer3D from '@assets/welcomePage/gamer3d.png';

import * as ST from './styled';

const Welcome: FC = () => {
  return (
    <ST.WelcomePageWrapper
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      key="WELCOME_WRAPPER"
    >
      <ST.UpperFrame>
        <motion.img
          src={Schoolboy3D}
          alt="Schoolboy 3D Image"
        />
        <div className="welcome">
          <motion.div
            key="WELCOME-HELLO"
            className="welcome-title"
          >
            ПРИВЕТ!
          </motion.div>
          <motion.div
            key="WELCOME-DESCRIPTION"
            className="welcome-description"
          >
            Прояви индивидуальность в игровом формате и впусти в свою жизнь мир уникальных 3D
            аватаров!
          </motion.div>
        </div>
      </ST.UpperFrame>
      <ST.MiddleFrame>
        <div className="left-side">
          <div className="left-side-chats">
            Ищи единомышленника с похожим на твой вкус! обязательно напиши ему какой у него классный
            3D аватар!
          </div>
          <div className="left-side-friends">Общайся со своими друзьями!</div>
        </div>
        <img
          className="middle-img"
          src={Globe3D}
          alt="globe3dmodel"
        />
        <span className="middle-img-avatars">Создавай свой уникальный 3D аватар</span>
      </ST.MiddleFrame>
      <ST.BottomFrame>
        <div className="bottom-frame">
          <div className="bottom-frame-title">ТВОЙ ПРОФИЛЬ</div>
          <div className="bottom-frame-description">
            После того, как ты зарегистрируешься в нашем замечательном приложении, можешь пройти в
            настройки, где есть инструкция по тому, как работать с 3D моделью в профиле. Желаем
            хорошего настроения!
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
