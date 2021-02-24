import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import BlogLayout from './Layout';

export default props => (
  <StaticQuery
    query={graphql`
      {
        allCategory(filter: { parent: { id: { eq: null } } }) {
          edges {
            node {
              name
              postsCnt
              url: relativePath
              absolutePath
              childrenCategory {
                name
                postsCnt
                url: relativePath
                absolutePath
                childrenCategory {
                  name
                  postsCnt
                  url: relativePath
                  absolutePath
                  childrenCategory {
                    name
                    postsCnt
                    relativePath
                    absolutePath
                  }
                }
              }
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            user {
              name
              figure
              email
              github
              twitter
              facebook
              instagram
              linkedIn
              position
            }
          }
        }
      }
    `}
    render={data => (
      <BlogLayout
        {...props}
        title={data.site.siteMetadata.title}
        categories={data.allCategory.edges[0].node}
        profile={{
          ...data.site.siteMetadata.user,
          desc: data.site.siteMetadata.description,
        }}
      />
    )}
  ></StaticQuery>
);
