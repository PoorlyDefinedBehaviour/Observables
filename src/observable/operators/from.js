import { Observable } from ".."

export const from = promise =>
  Observable(subscriber =>
    promise.then(subscriber.next).catch(subscriber.error)
  )
