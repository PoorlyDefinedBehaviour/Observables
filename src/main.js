import { of } from "./observable"
import { map, subscribe } from "./observable/operators"
import { filter } from "./observable/operators/filter"

of(1, 2, 3, 4, 5)
  |> map(x => x * 2)
  |> filter(x => x > 5)
  |> subscribe(console.log)
