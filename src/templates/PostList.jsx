import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import BlogLayout from '../layout/BlogLayout';
import Category from '../components/Category';
import Tags from '../components/Tags';

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
  postPaper: {
    width: '300px',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  showButtonRoot: {
    marginLeft: 'auto',
  },
}));

const PostList = ({ data, path }) => {
  const classes = usePostListStyle();
  const posts = data.allMarkdownRemark.nodes || [];
  const pathes = path.split('/').slice(1);

  return (
    <BlogLayout>
      <Category pathes={pathes} />
      <Typography
        classes={{ root: classes.postCounterRoot }}
        varient="subtitle2"
      >{`${posts.length} 개의 포스트`}</Typography>
      <div className={classes.posts}>
        {posts.map((post, idx) => (
          <Card
            key={`${path}-${idx}`}
            elevation={3}
            classes={{ root: classes.postPaper }}
          >
            <CardHeader
              title={
                <>
                  <Typography align="right" variant="caption">
                    <CalendarTodayIcon fontSize="inherit" />
                    {new Date(post.frontmatter.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h6">{post.frontmatter.title}</Typography>
                  <Tags outlined tags={post.frontmatter.tags} />
                </>
              }
            />
            <CardContent>
              <Typography>
                {post.html.replace(/<[^>]*>?/gm, '').substring(0, 150)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                href={post.fields.slug}
                classes={{ root: classes.showButtonRoot }}
              >
                SHOW
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </BlogLayout>
  );
};

export const query = graphql`
  query PostsListQry($slug: String!) {
    allMarkdownRemark(filter: { fields: { slug: { regex: $slug } } }) {
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
