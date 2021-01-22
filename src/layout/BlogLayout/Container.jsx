import React from 'react';

import BlogLayout from './BlogLayout';

export default props => {
  //TODO inject appbar data and drawer data
  // const data = useStaticQuery(`
  // `);
  return <BlogLayout {...props} />;
};
