import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Tags from './Tags';

const usePostStyle = makeStyles(theme => ({
  cardRoot: {
    width: '300px',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  showButtonRoot: {
    marginLeft: 'auto',
  },
}));

function Post({ post }) {
  const classes = usePostStyle();
  return (
    <Card elevation={3} classes={{ root: classes.cardRoot }}>
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
      {post.frontmatter.featuredImage && (
        <CardMedia
          className={classes.media}
          image={`./${post.frontmatter.featuredImage.childImageSharp.fluid.originalImg}`}
          title={
            post.frontmatter.featuredImage.childImageSharp.fluid.originalImg
          }
        />
      )}
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
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
