const { Observable, of } = require(".")

describe("Observable unit test suite", () => {
  describe("Observable", () => {
    test("Observable :: should take a function that accepts a subscriber and return an observable", () => {
      Observable(subscriber => subscriber.next(10)).subscribe(value =>
        expect(value).toBe(10)
      )
    })

    test("Observable :: should take a function that accepts an object subscriber and return an observable", () => {
      Observable(subscriber => subscriber.next(10)).subscribe({
        next: value => expect(value).toBe(10),
      })
    })

    test("Observable :: should take a function that accepts an object subscriber and return an observable that calls subscriber.error on errors", () => {
      Observable(subscriber => subscriber.error("oops")).subscribe({
        next: () => {
          /* no-op */
        },
        error: error => expect(error).toBe("oops"),
      })
    })

    test("Observable :: should take a function that accepts an object subscriber and return an observable that calls subscriber.done when it has no more values to emit", () => {
      Observable(subscriber => subscriber.done()).subscribe({
        next: () => {
          /* no-op */
        },
        done: () => expect(true).toBeTruthy(),
      })
    })
  })

  describe.only("of", () => {
    test("when one value is passed should return an Observable that will call subscriber.next passing the value", () => {
      of(3).subscribe(value => expect(value).toBe(3))
    })

    test("when more than one value is passed should return an Observable that will call subscriber.next passing each value", done => {
      const values = []

      of(1, 2, 3).subscribe(value => {
        values.push(value)

        if (values.length === 3) {
          expect(values).toEqual([1, 2, 3])
          done()
        }
      })
    })
  })
})
