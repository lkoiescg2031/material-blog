import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';

const usePathStyle = makeStyles(theme => ({
  categoryRoot: {
    width: 'max-content',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

const Category = ({ pathes, medium }) => {
  const classes = usePathStyle();
  const [first, ...others] = pathes || [];

  let pathPrefix = '';
  const getPathes = url => {
    const currentPath = `${pathPrefix}/${url}`;
    pathPrefix = currentPath;
    return currentPath;
  };

  return (
    <Paper elevation={4} classes={{ root: classes.categoryRoot }}>
      <Chip
        key="category-0"
        color="secondary"
        size={medium ? 'medium' : 'small'}
        label={first}
        clickable
        component="a"
        href={getPathes(first)}
      />
      {others.map((other, idx) => (
        <React.Fragment key={`category-${idx + 1}`}>
          <KeyboardArrowRightSharpIcon fontSize="small" />
          <Chip
            color="secondary"
            size={medium ? 'medium' : 'small'}
            label={other}
            clickable
            component="a"
            href={getPathes(other)}
          />
        </React.Fragment>
      ))}
    </Paper>
  );
};

Category.propTypes = {
  pathes: PropTypes.arrayOf(PropTypes.string).isRequired,
  medium: PropTypes.bool,
};

Category.defaultProps = {
  medium: false,
};

export default Category;
