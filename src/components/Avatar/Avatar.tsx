import { FC, useRef } from 'react';

import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useAuth } from '@src/providers/AuthProvider';

import { useUploadUserModelMutation, useUploadUserAvatarMutation } from '@api/UsersApi/UsersApi';

import { Button } from '@components/Button';

import AvatarTemplate from '@assets/profile_template.png';

import * as ST from './styled';

const Avatar: FC = () => {
  const {
    userInfo: { avatar, modelAvatar },
    updateUserInfoField,
  } = useAuth();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadUserModel] = useUploadUserModelMutation();
  const [uploadUserAvatar] = useUploadUserAvatarMutation();
  const modelObject = modelAvatar ? useLoader(GLTFLoader, modelAvatar) : undefined;
  const avatarModelRef = useRef<HTMLCanvasElement>(null);

  const makeAvatarScreenshot = async () => {
    const canvas = avatarModelRef.current;
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append('avatar', blob);
          try {
            const res = await uploadUserAvatar(formData);
            if ('data' in res) {
              updateUserInfoField('avatar', res.data.url);
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  const handleOpenInputFile = () => {
    inputFileRef?.current?.showPicker();
  };

  const handleModelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append('model', file);

      try {
        const res = await uploadUserModel(formData);
        if ('data' in res) {
          updateUserInfoField('modelAvatar', res.data.url);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ST.AvatarWrapper>
      <ST.AvatarContent>
        <ST.AvatarContentBlock>
          Ваш 3D-аватар
          <ST.AvatarModel>
            {modelObject ? (
              <Canvas
                gl={{ preserveDrawingBuffer: true }}
                ref={avatarModelRef}
              >
                <CameraControls />
                <ambientLight />
                <directionalLight
                  position={[-5, 5, 5]}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <group>
                  <primitive
                    object={Array.isArray(modelObject) ? modelObject[0].scene : modelObject.scene}
                  />
                </group>
                <mesh
                  rotation={[-0.5 * Math.PI, 0, 0]}
                  position={[0, -1, 0]}
                  receiveShadow
                >
                  <planeBufferGeometry args={[10, 10, 1, 1]} />
                  <shadowMaterial
                    transparent
                    opacity={0.2}
                  />
                </mesh>
              </Canvas>
            ) : (
              <ST.AvatarEmptyPlug>У вас еще нет 3D-аватара</ST.AvatarEmptyPlug>
            )}
          </ST.AvatarModel>
          <ST.AvatarControls>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleModelChange}
              hidden
            />
            <Button
              text="Загрузить"
              decoration="filled"
              size="md"
              onClick={handleOpenInputFile}
            />
          </ST.AvatarControls>
        </ST.AvatarContentBlock>
        <ST.AvatarContentBlock>
          Ваш аватар
          {avatar ? (
            <ST.AvatarImage
              src={avatar}
              alt="Аватар"
            />
          ) : (
            <ST.AvatarImage
              src={AvatarTemplate}
              alt="Аватар"
            />
          )}
          <ST.AvatarControls>
            <Button
              text="Фото 3D-аватара"
              decoration="filled"
              size="md"
              disabled={!modelObject}
              onClick={makeAvatarScreenshot}
            />
          </ST.AvatarControls>
        </ST.AvatarContentBlock>
      </ST.AvatarContent>
    </ST.AvatarWrapper>
  );
};

export { Avatar };