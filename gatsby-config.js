module.exports = {
  siteMetadata: {
    title: 'Happy Life Programmer',
    description: 'My life log',
    author: 'Taehong Kim',
    user: {
      name: 'Taehong Kim',
      figure:
        'https://avatars3.githubusercontent.com/u/42562726?s=400&u=611e46e8fb672c2be8df5c50ad9f2e5c3a35cbbf&v=4',
      position: 'developer',
      email: 'lkoiescg2031@naver.com',
      blog: 'https://lkoiescg2031.github.io',
      github: 'https://github.com/lkoiescg2031',
      facebook: 'https://www.facebook.com/profile.php?id=100015452532299',
      twitter: '',
      instagram: '',
      linkedIn: '',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // for typescript
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    // aphrodite
    `gatsby-plugin-aphrodite`,
    // for material ui
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false,
      },
    },
  ],
};
