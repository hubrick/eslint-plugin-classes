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

## Usage

```yaml
plugins:
  - classes

rules:
  # Plugins
  classes/space  : 2
  classes/name   : [2, "class", "name-required", "method"]
```

## License

MIT
