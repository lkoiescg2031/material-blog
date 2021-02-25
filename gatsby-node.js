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

exports.onCreateNode = async ({
  node,
  getNode,
  getNodes,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  const { createNodeField, createNode } = actions;

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
    // 테그 생성
    const tags = node.frontmatter.tags || [];
    for (const tag of tags) {
      const found = getNodes().find(
        node => node.internal.type === 'Tag' && node.name === tag,
      );

      if (typeof found === 'undefined') {
        await createNode({
          name: tag,
          id: createNodeId(`Tag-${tag}`),
          internal: {
            type: 'Tag',
            contentDigest: createContentDigest(tag),
          },
        });
      }
    }
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
      allTag {
        nodes {
          name
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
  const toRegexStr = str => {
    return `/${str.replace('+', '\\+')}/`;
  };

  const toEncode = str => {
    return str.replace('#', escape('#'));
  };

  result.data.allCategory.nodes.forEach(node => {
    createPage({
      path: toEncode(node.url),
      component: path.resolve('./src/templates/Category.jsx'),
      context: {
        slug: toRegexStr(node.url),
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

  //테그 페이지 생성
  result.data.allTag.nodes.forEach(({ name }) => {
    createPage({
      path: `/Tags/${name}`,
      component: path.resolve('./src/templates/Tag.jsx'),
      context: {
        slug: name,
      },
    });
  });
};
