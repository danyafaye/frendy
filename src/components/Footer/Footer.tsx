import { FC } from 'react';

import { LINKS } from '@src/links';

import * as ST from './styled';

const Footer: FC = () => {
  return (
    <ST.FooterWrapper>
      <ST.DescriptionSection>
        <div style={{ fontSize: '24px', fontWeight: 400 }}>полезные ссылки</div>
        <hr style={{ backgroundColor: 'white', height: '1px' }} />
        <ST.Links>
          <ST.StyledLink to={LINKS.aboutUs}>о нас</ST.StyledLink>
          <ST.StyledLink to={LINKS.rules}>правила</ST.StyledLink>
        </ST.Links>
      </ST.DescriptionSection>
      <ST.IconsSection>
        <a href="https://discord.gg/nKyDfCsK">
          <ST.StyledDiscordIcon />
        </a>
        <a href="https://discord.gg/nKyDfCsK">
          {/*TODO: убрать заглушки либо вообще потом выпилить нафик иконки*/}
          <ST.StyledTelegramIcon />
        </a>
      </ST.IconsSection>
    </ST.FooterWrapper>
  );
};

export { Footer };
