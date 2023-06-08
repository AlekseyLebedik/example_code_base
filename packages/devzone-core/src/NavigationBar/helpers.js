/* eslint-disable prefer-promise-reject-errors */
import matchSorter from 'match-sorter';

export const makeCancelable = promise => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export const threshold = matchSorter.rankings.CONTAINS;

export const groupSections = ({ groups, sections }) =>
  groups.map(g => ({
    items: g.sectionKeys.includes('all')
      ? sections
      : sections.filter(s => g.sectionKeys.includes(s.key)),
    ...g,
  }));

export const findSubsection = ({ parentKey, subsectionKey, routes }) => {
  const parent = routes.find(i => i.key === parentKey);
  if (!parent) return null;
  const section = parent.items.find(subItem =>
    [subItem.key, subItem.title].includes(subsectionKey)
  );
  if (section) return section;

  for (let i = 0; i < parent.items.length; i += 1) {
    if (parent.items[i].items) {
      const subSection = parent.items[i].items.find(subSubItem =>
        [subSubItem.key, subSubItem.title].includes(subsectionKey)
      );
      if (subSection) {
        return subSection;
      }
    }
  }
  return null;
};

export const filterRoutes = (items, searchKey) => {
  if (!searchKey || searchKey === '') {
    return items;
  }
  const titlesToNodes = new Map();
  const root = { title: 'root' };
  titlesToNodes.set('root', root);
  const findNodeToAppend = node => {
    if (titlesToNodes.has(node.title)) {
      return titlesToNodes.get(node.title);
    }
    if (node.parent) {
      return findNodeToAppend(node.parent);
    }
    return titlesToNodes.get('root');
  };
  const appendNode = route => {
    const node = findNodeToAppend(route);

    const parentStack = [route];
    let nextParent = route;
    while (node.title !== nextParent.title) {
      if (!nextParent.parent) {
        break;
      }
      parentStack.push(nextParent.parent);
      nextParent = nextParent.parent;
    }
    let nextNode = node;
    parentStack.pop();
    while (parentStack.length !== 0) {
      const newParent = parentStack.pop();
      if (!nextNode.items) {
        nextNode.items = [];
      }
      nextNode.items = [newParent, ...nextNode.items];
      titlesToNodes.set(newParent.title, newParent);
      nextNode = newParent;
    }
  };
  const DFS = rootNode => {
    const stack = [];
    const explored = new Set();
    stack.push(rootNode);
    explored.add(rootNode);
    while (stack.length !== 0) {
      const current = stack.pop();
      // Here is where the actual search happens on every node
      const match = matchSorter([current], searchKey, {
        keys: ['title'],
        threshold,
      });
      // If there is a match, append the node and everything below to the result
      if (current.title !== 'root' && match.length !== 0) {
        // appendNode handles inserting intermediate parents if needed
        appendNode(current);
      }
      // else, keep searching in the children with DFS traverse order
      else if (current.items) {
        current.items
          .filter(n => !explored.has(n))
          .forEach(n => {
            explored.add(n);
            // eslint-disable-next-line no-unused-vars
            const { items: _, ...parent } = current;
            stack.push({ parent, ...n });
          });
      }
    }
  };
  DFS({ items, ...root });
  return root.items || [];
};
