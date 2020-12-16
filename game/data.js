"use strict"

createItem("me", PLAYER(), {
  loc:"cellar",
  regex:/^(me|myself|player)$/,
  examine: "You look like a great adventurer.",
  hitpoints:100,
})

//All other objects in 'items.js' and 'rooms.js'.
