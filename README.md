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

### properties

This feature is ES7 ([proposal stage](https://gist.github.com/jeffmo/054df782c05639da2adb)). 
It has been tested with the non-default parser *babel-eslint*, because at the moment *esprima* doesn't recognize 
properties and throws errors.

The following patterns are NOT valid:

```js
class Foo {
  baz() {}
  static bar = 1;
}
class Foo {
  baz() {}
  bar = 2;
}  
```

The following patterns are valid:

```js
class Foo {
  bar = 3; 
}          
class Foo {
  bar = 2;
  baz() {}
}        
class Foo {
  /* comments allowed */
  bar = 2;
  baz() {}
}        
class Foo {
  bar() {}
}        
class Foo {
  static bar = 1;
  baz() {}
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
  classes/properties   : [2, "on-top"]
```

## License

MIT
