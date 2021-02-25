/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const CategoryBuilder = require('./gatsby-modules/gatsby-category.js');

exports.sourceNodes = param1 => {
  // add categories in graphql
  const categoryBuilder = new CategoryBuilder(param1);
  categoryBuilder.build();
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
      trailingSlash: false,
    });
    createNodeField({
      node,
      name: `slug`,
      value: '/Posts' + slug,
    });
  } else if (node.internal.type === 'Category') {
    // createNodeField({
    //   node,
    //   name: 'slug',
    //   value: slug,
    // });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allCategory {
        nodes {
          url: relativePath
        }
      }
      allMarkdownRemark {
        nodes {
          fields {
            url: slug
          }
        }
      }
    }
  `);

  //포스트 카테고리별 페이지 생성
  //FIXME : path 의 특수문자 처리 (#,+)
  result.data.allCategory.nodes.forEach(node => {
    createPage({
      path: node.url,
      component: path.resolve('./src/templates/PostList.jsx'),
      context: {
        slug: `/${node.url}/`,
      },
    });
  });

  //포스트 페이지 생성
  result.data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.fields.url,
      component: path.resolve('./src/templates/Post.jsx'),
      context: {
        slug: node.fields.url,
      },
    });
  });
};
