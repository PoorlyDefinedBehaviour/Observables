import { Observable, of } from "../index"
import { map, subscribe, filter, from } from "."

describe("Operators unit test suite", () => {
  describe("map", () => {
    test("should apply the provided function before passing value to subscriber", () => {
      const observable = of(10) |> map(x => x * 2)

      observable.subscribe(value => expect(value).toBe(20))
    })

    test("should not apply the provided function before passing value to subscriber when producer emits an error", () => {
      const observable =
        Observable(subscriber => subscriber.error("oops")) |> map(x => x * 2)

      observable.subscribe({
        next: _value => expect(true).toBeFalsy(),
        error: value => expect(value).toBe("oops"),
      })
    })

    test("should not apply the provided function before passing value to subscriber when producer is done", () => {
      const observable =
        Observable(subscriber => subscriber.done("done")) |> map(x => x * 2)

      observable.subscribe({
        next: _value => expect(true).toBeFalsy(),
        error: _value => expect(true).toBeFalsy(),
        done: value => expect(value).toBe("done"),
      })
    })
  })

  describe("subscribe", () => {
    test("should call observable.subscribe method", () => {
      of("hello world")
        |> map(str => str.toUpperCase())
        |> subscribe(value => expect(value).toBe("HELLO WORLD"))
    })
  })

  describe("filter", () => {
    test("sync :: should take a predicate & call subscriber.next only when predicate returns true", () => {
      Observable(subscriber => {
        for (const value of [1, 2, 3]) {
          subscriber.next(value)
        }
      })
        |> filter(value => value === 2)
        |> subscribe(value => expect(value).toBe(2))
    })

    test("async :: should take a predicate & call subscriber.next only when predicate returns true", done => {
      Observable(subscriber => {
        let i = 1

        const emit = () => {
          subscriber.next(i)
          i += 1
          if (i < 3) {
            setTimeout(emit, 50)
          }
        }

        emit()
      })
        |> filter(value => value === 2)
        |> subscribe(value => {
          expect(value).toBe(2)
          done()
        })
    })
  })

  describe.only("from", () => {
    test("should take a promise and return an Observable that calls subscriber.next when the promise resolves", done => {
      from(Promise.resolve(2)).subscribe(value => {
        expect(value).toBe(2)
        done()
      })
    })
  })
})
