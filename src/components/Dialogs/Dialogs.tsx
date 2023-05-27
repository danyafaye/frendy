import { FC } from 'react';

import * as ST from './styled';

const Dialogs: FC = () => {
  return (
    <ST.DialogsWrapper>
      <ST.DialogsLeftSide>диалог</ST.DialogsLeftSide>
      <ST.DialogsRightSide>диалог</ST.DialogsRightSide>
    </ST.DialogsWrapper>
  );
};

export { Dialogs };
