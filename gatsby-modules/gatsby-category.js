module.exports = class CategoryBuilder {
  constructor({ actions, createNodeId, createContentDigest, getNodesByType }) {
    //params
    this.createNode = actions.createNode;
    this.createNodeId = createNodeId;
    this.createContentDigest = createContentDigest;
    this.getNodesByType = getNodesByType;
  }

  build() {
    const allPostPathes = this.getAllPostsPath();

    const categoryObjes = allPostPathes.reduce(
      (finalMaps, postPath) => ({
        ...finalMaps,
        ...this.extractCategory(postPath, finalMaps),
      }),
      {},
    );
    const categoryNodes = this.replaceParent(categoryObjes);
    this.appendChildren(categoryNodes);

    Object.values(categoryNodes).forEach(node => this.createNode(node));
  }

  getAllPostsPath() {
    return this.getNodesByType('File')
      .filter(file => file.sourceInstanceName === 'posts')
      .map(posts => posts.absolutePath);
  }

  extractCategory(postPath, categoryMaps) {
    const [beforePosts, afterPosts] = postPath.split('/posts/');
    const orderedCateogryNames = ['Posts', ...afterPosts.split('/')];
    orderedCateogryNames.pop();

    let parentPath = beforePosts;

    return orderedCateogryNames.reduce((categories, categoryName) => {
      const currentPath = `${parentPath}/${categoryName}`;

      if (categoryMaps.hasOwnProperty(currentPath) === false) {
        categories[currentPath] = this.createCategoryNode(
          parentPath === beforePosts ? null : parentPath,
          currentPath,
          categoryName,
        );
      } else {
        categoryMaps[currentPath].postsCnt += 1;
      }

      parentPath = currentPath;
      return categories;
    }, {});
  }

  createCategoryNode(parentPath, currentPath, categoryName) {
    const afterPosts = currentPath.split('/Posts/')[1];
    const relativePath = `/Posts${
      typeof afterPosts === 'undefined' ? '' : `/${afterPosts}`
    }`;
    return {
      absolutePath: currentPath,
      relativePath,
      name: categoryName,
      postsCnt: 1,
      id: this.createNodeId(`category-${currentPath}`),
      internal: {
        type: 'Category',
        contentDigest: this.createContentDigest(currentPath),
      },
      parent: parentPath,
      children: [],
    };
  }

  replaceParent(categoryMaps) {
    return Object.values(categoryMaps)
      .map(category => ({
        ...category,
        parent:
          category.parent === null ? null : categoryMaps[category.parent].id,
      }))
      .reduce(
        (finalMaps, category) => ({ ...finalMaps, [category.id]: category }),
        {},
      );
  }

  appendChildren(categoryMaps) {
    Object.values(categoryMaps).forEach(node => {
      const nodeID = node.id;
      const parentID = node.parent;

      if (parentID !== null) {
        categoryMaps[parentID].children.push(nodeID);
      }
    });
  }
};
