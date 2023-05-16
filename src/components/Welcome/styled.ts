import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

export const WelcomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UpperFrame = styled.div`
  padding: 0 220px 0 80px;
  display: flex;
  margin-bottom: 80px;
  .welcome {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 20px;
    &-title {
      font-weight: 600;
      font-size: 64px;
      color: ${COLORS.$purple50};
    }
    &-description {
      font-weight: 300;
      font-size: 32px;
      color: ${COLORS.$gray90};
    }
  }
`;

export const MiddleFrame = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  .left-side {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    padding-right: 20px;
    &-chats {
      margin-top: -3px;
      font-size: 24px;
      font-weight: 400;
      width: 400px;
      text-align: right;
    }
    &-friends {
      font-size: 24px;
      font-weight: 400;
      width: 330px;
      text-align: right;
    }
  }
  .middle-img {
    width: 828px;
    height: 682px;
    &-avatars {
      margin-top: -4px;
      padding-left: 20px;
      display: flex;
      font-size: 24px;
      font-weight: 400;
      width: 330px;
      text-align: left;
    }
  }
`;

export const BottomFrame = styled.div`
  margin-bottom: 20px;
  padding: 0 100px;
  display: flex;
  .bottom-frame {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    &-title {
      font-weight: 700;
      font-size: 96px;
      color: ${COLORS.$purple50};
    }
    &-description {
      font-weight: 400;
      font-size: 32px;
      line-height: 39px;

      color: ${COLORS.$gray90};
    }
  }
`;
