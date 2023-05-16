import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { COLORS } from '@src/constants/styles';

import { ReactComponent as DiscordIcon } from '../../assets/icons/discord.svg';
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg';

export const FooterWrapper = styled.footer`
  background-color: ${COLORS.$purple50};
  color: ${COLORS.$white100};
  padding: 14px;
  row-gap: 24px;
  display: flex;
  flex-direction: column;
`;

export const IconsSection = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 36px;
`;

export const DescriptionSection = styled.div`
  display: flex;
  row-gap: 6px;
  flex-direction: column;
`;

export const Links = styled.div`
  display: flex;
  column-gap: 12px;
`;

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 22px;
  font-weight: 300;
`;

export const StyledDiscordIcon = styled(DiscordIcon)`
  height: 42px;
  width: 42px;
`;
export const StyledTelegramIcon = styled(TelegramIcon)`
  height: 42px;
  width: 42px;
`;
