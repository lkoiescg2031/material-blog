import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';

const usePathStyle = makeStyles(theme => ({
  categoryRoot: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
  },
}));

const Category = ({ pathes }) => {
  const classes = usePathStyle();
  const [first, ...others] = pathes || [];

  let pathPrefix = '';
  const getPathes = url => {
    const currentPath = `${pathPrefix}/${url}`;
    pathPrefix = currentPath;
    return currentPath;
  };

  return (
    <div className={classes.categoryRoot}>
      <Chip
        key="category-0"
        color="secondary"
        size="small"
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
            size="small"
            label={other}
            clickable
            component="a"
            href={getPathes(other)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

Category.propTypes = {
  pathes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Category;
