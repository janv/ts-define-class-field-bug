class A {
  foo = () => {
    throw new Error()
  }
  bar: any
}

const a = new A()
a.bar = a.foo

a.bar()