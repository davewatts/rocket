import path from 'path';

export function urlToSourceRelativeFilePath() {}
export function outputRelativeFilePathToSourceRelativeFilePath() {}

/**
 * @param {string} name
 * @returns {string}
 */
function cleanOrder(name) {
  let newName = name;
  const matches = name.match(/^[0-9]+--(.*)$/);
  if (matches && matches.length > 1 && matches[1]) {
    newName = matches[1];
  }

  return newName;
}

/**
 * @param {string} relPath
 * @returns {string}
 */
export function sourceRelativeFilePathToOutputRelativeFilePath(relPath) {
  const basename = path.basename(relPath);
  const rawDirname = path.dirname(relPath);

  const dirname = rawDirname
    .split('/')
    .map(part => cleanOrder(part))
    .join('/');

  let name = basename;
  for (const ending of ['.rocket.js', '.rocket.md', '.rocket.html']) {
    name = name.endsWith(ending) ? name.substring(0, name.length - ending.length) : name;
  }

  name = cleanOrder(name);

  if (relPath.endsWith('.js') && name.includes('.')) {
    return path.join(dirname, name);
  }

  return name === 'index'
    ? path.join(dirname, 'index.html')
    : path.join(dirname, name, 'index.html');
}

/**
 * 
 * @param {string} sourceRelativeFilePath 
 * @returns 
 */
export function sourceRelativeFilePathToUrl(sourceRelativeFilePath) {
  const outputRelativeFilePath = sourceRelativeFilePathToOutputRelativeFilePath(sourceRelativeFilePath);

  return outputRelativeFilePath.endsWith('index.html')
    ? `/${outputRelativeFilePath.substring(0, outputRelativeFilePath.length - 10)}`
    : `/${outputRelativeFilePath}`;
}
