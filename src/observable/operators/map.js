import { Observable } from "../index"

export const map = f => observable =>
  Observable(subscriber =>
    observable.subscribe({
      next: value => value |> f |> subscriber.next,
      error: subscriber.error,
      done: subscriber.done,
    })
  )
