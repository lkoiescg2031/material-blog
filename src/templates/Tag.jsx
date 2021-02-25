import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import BlogLayout from '../layout/BlogLayout';
import Post from '../components/Post';
import Category from '../components/Category';

const usePostListStyle = makeStyles(theme => ({
  postCounterRoot: {
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
  posts: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  },
}));

const PostList = ({ data, path, pageContext }) => {
  const classes = usePostListStyle();
  const posts = data.allMarkdownRemark.nodes || [];

  return (
    <BlogLayout>
      <Typography variant="h3">{pageContext.slug}</Typography>
      <Typography
        classes={{ root: classes.postCounterRoot }}
        varient="subtitle2"
      >{`${posts.length} 개의 포스트`}</Typography>
      <div className={classes.posts}>
        {posts.map((post, idx) => (
          <Post key={`${path}-${idx}`} post={post} />
        ))}
      </div>
    </BlogLayout>
  );
};

export const query = graphql`
  query allPostByTag($slug: [String]) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: $slug } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          date
        }
        html
      }
      totalCount
    }
  }
`;

export default PostList;
