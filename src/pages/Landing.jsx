import React from 'react';
import { graphql } from 'gatsby';

import MouseEffectLayout from '../components/MouseEffectLayout';
import BusinessCard from '../components/BusinessCard';
import { CardTemplate1, CardTemplate2 } from '../components/CardTemplates';

export default ({ data }) => {
  const { siteMetadata } = data.site;
  const { user } = siteMetadata;

  return (
    <MouseEffectLayout>
      <BusinessCard>
        {changeTo => (
          <>
            <CardTemplate1
              title={siteMetadata.title}
              subTitle={siteMetadata.description}
              hasButton
              onClick={e => {
                changeTo();
              }}
            />
            <CardTemplate2
              figure={user.figure}
              name={user.name}
              position={user.position}
              email={user.email}
              blog={user.blog}
              github={user.github}
              facebook={user.facebook}
              linkedIn={user.linkedIn}
              twitter={user.twitter}
              instagram={user.instagram}
            />
          </>
        )}
      </BusinessCard>
    </MouseEffectLayout>
  );
};

export const siteMetadata = graphql`
  {
    site {
      siteMetadata {
        title
        description
        user {
          name
          figure
          position
          email
          blog
          github
          facebook
          twitter
          instagram
          linkedIn
        }
      }
    }
  }
`;
