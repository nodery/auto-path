<!-- Logo -->
<p align="center">
  <img width="250" src="https://cdn.jsdelivr.net/gh/nodewell/path/assets/icon-with-name-color.svg" alt="@nodewell/path" />
</p>

<!-- Branded divider -->
<a href="https://github.com/nodewell"><img src="https://cdn.jsdelivr.net/npm/@nodewell/assets@1.2.1/media/github/divider.svg" alt="divider" /></a>

<!-- Badges - 1st row -->
<p align="center">
  <!-- NPM badge -->
  <a href="https://www.npmjs.com/package/@nodewell/path"><img src="https://img.shields.io/npm/v/@nodewell/path?color=brightgreen&style=flat-square" alt="release-badge"></a>
  <!-- CI badge -->
  <a href="https://github.com/nodewell/path/actions?query=workflow%3Aci"><img src="https://github.com/nodewell/path/workflows/ci/badge.svg?style=flat-square" alt="ci-badge"></a>
  <!-- Coverage badge -->
  <a href="https://codecov.io/gh/nodewell/path"><img src="https://img.shields.io/codecov/c/github/nodewell/path?style=flat-square" alt="coverage-badge"></a>
  <!-- Dependency badge -->
  <a href="https://david-dm.org/nodewell/path"><img src="https://img.shields.io/badge/dependabot-enabled-brightgreen.svg?style=flat-square" alt="dependency-badge"></a>
  <!-- Documentation badge -->
  <a href="https://github.com/nodewell/path/blob/master/doc/API.md"><img src="https://inch-ci.org/github/nodewell/path.svg?branch=master&style=flat-square" alt="documentation-badge"></a>
</p>

<!-- Badges - 2nd row -->
<p align="center">
  <!-- Code style badge -->
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/style-standardjs-f1d300.svg?style=flat-square" alt="code-style-badge"></a>
  <!-- Commit style badge -->
  <a href="https://commitizen.github.io/cz-cli"><img src="https://img.shields.io/badge/commit-commitizen-fe7d37.svg?style=flat-square" alt="commit-style-badge"></a>
  <!-- Release workflow badge -->
  <a href="https://semantic-release.gitbook.io/semantic-release"><img src="https://img.shields.io/badge/release-semantic--release-e10079.svg?style=flat-square" alt="release-workflow-badge"></a>
  <!-- License badge -->
  <a href="https://github.com/nodewell/path/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square" alt="license-badge"></a>
  <!-- Contribution badge -->
  <a href="https://github.com/nodewell/path/blob/master/.github/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="contribution-badge"></a>
</p>

---

<h3 align="center">
  Painless, simple, easy path management.
</h3>

<p align="center">
  A Node.js utility to provide a simple solution for path management
  in your build scripts and in general tasks.
</p>

---

## :thinking: Why?

- **Before:** :thumbsdown:

  ```javascript
  // project_root/scripts/build/frontend.js
  const path = require('path')

  const root = path.join(__dirname, '../../')
  const dist = path.join(root, '/frontend/dist')
  const src = path.join(root, '/frontend/src')
  // ...
  ```

- **After:** :thumbsup:

  ```javascript
  // /project_root/scripts/build/frontend.js
  const path = require('@nodewell/path')

  path('@') // '/project_root'
  path('@/frontend/dist') // '/project_root/frontend/dist'
  path('@/frontend/src') // '/project_root/frontend/src'
  // ...
  ```

- **Even Better:** :ok_hand:

  Use a `.pathrc` file with your custom paths in your project's root:

  ```json
  {
    "@dist": "./frontend/dist",
    "@src": "./frontend/src",
    "@custom-path": "@/custom/path"
  }
  ```

  ...then, when you use **`@nodewell/path`**, your paths will be available in the whole project / package:

  ```javascript
  const path = require('@nodewell/path')

  path('@dist') // '/project_root/frontend/dist'
  path('@src') // '/project_root/frontend/src'
  path('@custom-path') // '/project_root/custom/path'
  ```

## :package: Installation

- **NPM:**

  ```bash
  npm install @nodewell/path
  ```

- **Yarn:**

  ```bash
  yarn add @nodewell/path
  ```

## :coffee: Usage

**`@nodewell/path`** is intended to be used **with Node.js** primarily.

```javascript
const path = require('@nodewell/path')
```

After **`@nodewell/path`** is loaded, it **determines your project's root automatically**
based on the directory, where your **`package.json`** can be found.

```javascript
// assuming your project's package.json can be found in '/home/user/project/package.json'

// access your project's root directory
path('@') // '/home/user/project'

// access a file in your project
path('@/src/index.js') // '/home/user/project/src/index.js'

// access a directory in your project
path('@/src') // '/home/user/project/src'

// access files and directories
path('@/src/**/*.js') // '/home/user/project/src/**/*.js'
path('@/test/') // '/home/user/project/test/'
path('@/test/fixtures') // '/home/user/project/test/fixtures'

// access files with the '***' (triple-dot) glob
path('@/src/***') // '/home/user/project/src/**/*.*'
```

To define **custom, project-wide paths**, use a `.pathrc` file with your own custom paths:

```json
{
  "@dist": "./dist",
  "@src": "./src",
  "@custom-path": "@/custom/path"
}
```

Supported `.pathrc` file names:

 - JSON formats:
   - `.pathrc`
   - `.pathsrc`
   - `.path.json`
   - `.paths.json`

 - JavaScript (Node.js CommonJS module) formats:
   - `.path.config.js`
   - `.paths.config.js`
 
 - YAML formats:
   - `.path.yml`
   - `.paths.yml`
   - `.path.yaml`
   - `.paths.yaml`

---

## :computer: API

<!--- <% api --->
<a name="module_@nodewell/path"></a>

## @nodewell/path
<a name="exp_module_@nodewell/path--module.exports"></a>

### module.exports(paths) ⇒ <code>string</code> ⏏
Processes and returns the path segments.

**Returns**: <code>string</code> - Returns the processed path segments.  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>paths</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>The path segments to process.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// assuming your project's root is '/home/user/project'
const path = require('@nodewell/path')

path('@') // '/home/user/project'
path('@/src') // '/home/user/project/src'
path('@/src/*.js') // '/home/user/project/src/*.js'
```
<!--- api %> --->

---

## :star: Related

Check out the [official website][url-website] for more tools, utilities, and packages.

Find more **@nodewell** packages on [NPM][url-npm] and [GitHub][url-github].

## :beers: Contribution

**Any contribution is ***highly*** appreciated**. To get going, check out the [**contribution guidelines**][url-contrib-doc].

***Thank you and have fun!***

## :copyright: License

[ISC][url-license-doc] @ [Richard King](https://www.richrdkng.com)

  <!--- References ============================================================================ -->

  <!--- URLs -->
  [url-website]:     https://nodewell.github.io
  [url-github]:      https://github.com/nodewell
  [url-npm]:         https://www.npmjs.com/search?q=keywords:nodewell
  [url-contrib-doc]: https://github.com/nodewell/path/blob/master/.github/CONTRIBUTING.md
  [url-license-doc]: https://github.com/nodewell/path/blob/master/LICENSE.md
