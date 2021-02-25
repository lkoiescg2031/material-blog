import React from 'react';

import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import Layout from '../layout/BlogLayout';
import Tag from '../components/Tags';

function Tags({ data }) {
  const tags = data.allTag.nodes.map(({ name }) => name);

  return (
    <Layout>
      <Typography variant="h3">Tags</Typography>
      <Typography align="right" variant="subtitle2">
        {tags.length}개의 테그
      </Typography>
      <Tag medium tags={tags} />
    </Layout>
  );
}

export const TagQry = graphql`
  query TagQry {
    allTag {
      nodes {
        name
      }
    }
  }
`;

export default Tags;
