/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import fse from 'fs-extra';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, '../lib/@demonware/devzone-core');

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(packagePath, 'package.json'),
    'utf8'
  );
  const {
    nyc,
    scripts,
    devDependencies,
    workspaces,
    dependencies,
    peerDependencies,
    prettier,
    'lint-staged': lintStaged,
    ...packageDataOther
  } = JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    private: false,
    peerDependencies,
    dependencies: Object.entries(dependencies).reduce(
      (acc, [pkg, v]) => (peerDependencies[pkg] ? acc : { ...acc, [pkg]: v }),
      {}
    ),
  };

  await fse.writeFile(
    path.resolve(buildPath, 'package.json'),
    JSON.stringify(newPackageData, null, 2),
    'utf8'
  );
  console.log(`Created package.json in ${buildPath}`);

  return newPackageData;
}

async function run() {
  await createPackageFile();
  await includeFileInBuild('README.md');
}

run();
