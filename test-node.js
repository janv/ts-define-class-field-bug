class A {
  foo = () => {
    throw new Error()
  }
}

const a = new A()
a.bar = a.foo

a.bar()