const { of } = require("./observable")
const { map, subscribe } = require("./observable/operators")
const { filter } = require("./observable/operators/filter")

of(1, 2, 3, 4, 5)
  |> map(x => x * 2)
  |> filter(x => x > 5)
  |> subscribe(console.log)
