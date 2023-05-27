import { FC } from 'react';

import * as ST from './styled';

const Dialogs: FC = () => {
  return (
    <ST.DialogsWrapper
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{
        hidden: { opacity: 0, x: +20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      }}
    >
      <ST.DialogsLeftSide>диалог</ST.DialogsLeftSide>
      <ST.DialogsRightSide>диалог</ST.DialogsRightSide>
    </ST.DialogsWrapper>
  );
};

export { Dialogs };
