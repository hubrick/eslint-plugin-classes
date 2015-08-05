# eslint-plugin-classes

custom ESLint rule, checks class style.
(will adding more rules for class)

## Rule Details

### space

should be space between method name and parens.

The following patterns are considered warnings:

```js
class Foo {
  bar () {
  }
}

class Foo {
  static bar () {
  }
}

class Foo {
  bar () {
  }

  buz() {
  }
}
```

The following patterns are not warnings:

```js
class Foo {
  bar() {
  }
}

class Foo {
  static bar() {
  }
}

class Foo {
  bar() {
  }

  buz() {
  }
}
```

### name

- class name should start with upper case (option: "class")
- method name should start with lower case (option: "method")
- class name is required (option: "name-required")

The following patterns are considered warnings:

```js
class foo {
}

class Foo {
  Bar () {
  }
}
```

The following patterns are not warnings:

```js
class Foo {
}

class Foo {
  bar () {
  }
}
```

### order

This rule sets the order of members in classes. Basically the properties should be declared before methods.

You can activate the option `'statics-first'`, which says that all statics are declared in the beginning.
The order would then be: static props, static methods, properties, methods.

The object property feature is ES7 ([proposal stage](https://gist.github.com/jeffmo/054df782c05639da2adb)).
Note that the tests work with the non-default parser *babel-eslint*, because at the moment *esprima* doesn't recognize
properties and throws errors.

The following patterns are **INVALID**:

* Without `statics-first`:
  ```js
  class Foo {
    static alpha = 1;
    static gamma() {}
    beta = 2;
    delta() {}
  }

  class Foo {
    beta = 2;
    static alpha = 1;
    static gamma() {}
    delta() {}
  }

  class Foo {
    static alpha = 1;
    static beta() {}
    gamma = 2;
    delta() {}
    gamma2 = 3;
  }
  ```
  
* With `statics-first`:
  ```js
  class Foo {
    static alpha = 1;
    gamma = 2;
    static beta() {}
    delta() {}
  }
  ```

The following patterns are **VALID**:

* Without `statics-first`:
  ```js
  class Foo {
    static alpha = 1;
    beta = 2;
    static gamma() {}
    delta() {}
  }

  class Foo {
    /* comments, of course, are allowed */
    beta = 2;
    delta() {}
  }
  ```
  
* With `statics-first`:
  ```js
  class Foo {
    static alpha = 1;
    static beta() {};
    gamma = 2;
    delta() {}
  }
  ```


## Usage

```yaml
plugins:
  - classes

rules:
  # Plugins
  classes/space  : 2
  classes/name   : [2, "class", "name-required", "method"]
  classes/order   : [2, "statics-first"]
```

## License

MIT
