const five = require('johnny-five')
var temporal = require("temporal")
const board = new five.Board({repl: false})
var temporal
board.on("ready", function() {
    var rgb = new five.Led.RGB([6, 5, 3]);
    // var index = 0;
    // var rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];
  
    // this.loop(1000, function() {
    //   rgb.color(rainbow[index++]);
    //   if (index === rainbow.length) {
    //     index = 0;
    //   }
    // });

  // Set to full intensity red
  console.log("100% green");
  led.color("#FF0000");

  temporal.queue([{
    // After 3 seconds, dim to 30% intensity
    wait: 3000,
    task: function() {
      console.log("30% red");
      led.intensity(30);
    }
  }, {
    // 3 secs then turn blue, still 30% intensity
    wait: 3000,
    task: function() {
      console.log("30% blue");
      led.color("#0000FF");
    }
  }, {
    // Another 3 seconds, go full intensity blue
    wait: 3000,
    task: function() {
      console.log("100% blue");
      led.intensity(100);
    }
  }, 
  ]);
})