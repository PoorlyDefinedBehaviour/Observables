export const subscribe = subscriber => observable =>
  subscriber |> observable.subscribe
