/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const CategoryBuilder = require('./gatsby-modules/gatsby-category.js');

exports.sourceNodes = (...params) => {
  // add categories in graphql
  const categoryBuilder = new CategoryBuilder(params[0]);
  categoryBuilder.build();
};
