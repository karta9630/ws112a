import _ from "npm:lodash"
// var _ = require('lodash');
let r = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
console.log(r)
