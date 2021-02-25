import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const useTagStyle = makeStyles(theme => ({
  tagWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  tagLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0.2),
    },
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignCenter: {
    justifyContent: 'center',
  },
}));

function Tags({ tags, align, outlined, medium }) {
  const classes = useTagStyle();

  return (
    <div
      className={clsx(
        classes.tagWrapper,
        {
          [classes.alignRight]: align === 'right',
        },
        {
          [classes.alignCenter]: align === 'center',
        },
      )}
    >
      {(tags || []).map((tag, idx) => (
        <Chip
          key={`tag-${idx}`}
          variant={outlined ? 'outlined' : 'default'}
          size={medium ? 'medium' : 'small'}
          color="secondary"
          label={
            <div className={classes.tagLabel}>
              <LocalOfferIcon fontSize="inherit" color="inherit" />
              <Typography variant="subtitle2">{tag}</Typography>
            </div>
          }
          clickable
          component="a"
          href={`/Tags/${tag}`}
        />
      ))}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  align: PropTypes.oneOf(['right', 'left', 'center']),
  outlined: PropTypes.bool,
  medium: PropTypes.bool,
};

Tags.defaultProps = {
  align: 'left',
  outlined: false,
  medium: false,
};

export default Tags;
