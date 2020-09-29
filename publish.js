const ghpages = require("gh-pages");
console.log("Publishing frontend to GitHub Pages...");
ghpages.publish("dist", function(err) {
  console.log("Published!");
});
