import React from 'react';

import MouseEffectLayout from '../components/MouseEffectLayout';
import BusinessCard from '../components/BusinessCard';
import { CardTemplate1, CardTemplate2 } from '../components/CardTemplates';

//FIXME 페이지 스크롤 버그 제거
export default () => (
  <MouseEffectLayout>
    <BusinessCard>
      {changeTo => (
        <>
          <CardTemplate1
            title="Dev & LifeStyles"
            subTitle="Computer Enginner's Blog"
            hasButton
            onClick={e => {
              changeTo();
            }}
          />
          <CardTemplate2 />
        </>
      )}
    </BusinessCard>
  </MouseEffectLayout>
);
