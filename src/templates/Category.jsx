import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import BlogLayout from '../layout/BlogLayout';
import Category from '../components/Category';
import Post from '../components/Post';

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

const PostList = ({ data, path }) => {
  const classes = usePostListStyle();
  const posts = data.allMarkdownRemark.nodes || [];
  const pathes = path.split('/').slice(1);

  return (
    <BlogLayout>
      <Category medium pathes={pathes} />
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
  query allPostByCategory($slug: String!) {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $slug } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          date
          featuredImage {
            childImageSharp {
              fluid {
                originalImg
                originalName
              }
            }
          }
        }
        html
      }
      totalCount
    }
  }
`;

export default PostList;
