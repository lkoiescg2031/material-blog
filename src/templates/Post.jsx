import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import BlogLayout from '../layout/BlogLayout';
import Category from '../components/Category';
import Tags from '../components/Tags';

const usePostStyle = makeStyles(theme => ({
  titleDivider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    borderTop: '3px double rgba(0, 0, 0, 0.12)',
  },
}));

const Post = ({ data }) => {
  const classes = usePostStyle();
  const post = data.markdownRemark;

  const pathes = post.fields.slug.split('/').slice(1, -1);

  return (
    <BlogLayout>
      <Category medium pathes={pathes} />
      <Typography variant="h3">{post.frontmatter.title}</Typography>
      <Typography align="right" variant="subtitle2">
        <CalendarTodayIcon fontSize="inherit" />
        {new Date(post.frontmatter.date).toLocaleDateString()}
      </Typography>
      <Divider classes={{ root: classes.titleDivider }} />
      <Tags align="right" tags={post.frontmatter.tags} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </BlogLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        tags
        date
      }
      fields {
        slug
      }
      html
    }
  }
`;

export default Post;
