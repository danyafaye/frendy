import { FC, useMemo, useRef } from 'react';

import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { useAuth } from '@src/providers/AuthProvider';

import { useUploadUserModelMutation, useUploadUserAvatarMutation } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

import { Button } from '@components/Button';

import AvatarTemplate from '@assets/profile_template.png';

import * as ST from './styled';

const Avatar: FC = () => {
  const {
    userInfo: { avatar, modelAvatar },
    updateUserInfoField,
  } = useAuth();
  const toast = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadUserModel] = useUploadUserModelMutation();
  const [uploadUserAvatar] = useUploadUserAvatarMutation();
  const avatarModelRef = useRef<HTMLCanvasElement>(null);

  const modelObject = useMemo(() => {
    const modelExtension = modelAvatar.slice(modelAvatar.lastIndexOf('.') + 1);
    if (!modelAvatar) return undefined;
    if (['gltf', 'glb', 'vrm'].includes(modelExtension)) {
      return useLoader(GLTFLoader, modelAvatar).scene;
    }
    if (modelExtension === 'obj') {
      return useLoader(OBJLoader, modelAvatar);
    }
    if (modelExtension === 'fbx') {
      return useLoader(FBXLoader, modelAvatar);
    }
    toast.error('Добавьте новую модель подходящего формата: gltf, glb, obj, fbx, vrm');
    return undefined;
  }, [modelAvatar]);

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
            } else {
              toast.error(res.error);
            }
          } catch (error) {
            throw error;
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
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        throw error;
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
                  <primitive object={modelObject} />
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
