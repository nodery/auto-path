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
