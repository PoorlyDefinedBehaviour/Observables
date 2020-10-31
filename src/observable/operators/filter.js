import { Observable } from ".."

export const filter = predicate => observable =>
  Observable(subscriber =>
    observable.subscribe({
      next: value => {
        if (predicate(value)) {
          subscriber.next(value)
        }
      },
      error: subscriber.error,
      done: subscriber.done,
    })
  )
