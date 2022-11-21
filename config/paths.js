'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
  'scss',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};
function getMyPageConfig() {
  const { myPage } = process.env;
  const srcPath = myPage ? `myPage/${myPage}` : 'src';
  return {
    appBuild: myPage ? `build/${myPage}` : 'build/base',
    appIndexJs: `${srcPath}/index`,
    appSrc: `${srcPath}`,
    testsSetup: `${srcPath}/setupTests`,
    proxySetup: `${srcPath}/setupProxy.js`,
    swSrc: `${srcPath}/service-worker`
  };
}
const { appBuild, appIndexJs, appSrc,
  testsSetup, proxySetup, swSrc } = getMyPageConfig();
// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  // appBuild: resolveApp(buildPath),
  appBuild: resolveApp(appBuild),
  // appIndexJs: resolveModule(resolveApp, 'src/index'),
  appIndexJs: resolveModule(resolveApp, appIndexJs),
  // appSrc: resolveApp('src'),
  appSrc: resolveApp(appSrc),
  // testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  testsSetup: resolveModule(resolveApp, testsSetup),
  // proxySetup: resolveApp('src/setupProxy.js'),
  proxySetup: resolveApp(proxySetup),
  // swSrc: resolveModule(resolveApp, 'src/service-worker'),
  swSrc: resolveModule(resolveApp, swSrc),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;
