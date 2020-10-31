import { of } from "./observable"
import { map, subscribe, filter } from "./observable/operators"

of(1, 2, 3, 4, 5)
  |> map(x => x * 2)
  |> filter(x => x > 5)
  |> subscribe(console.log)
