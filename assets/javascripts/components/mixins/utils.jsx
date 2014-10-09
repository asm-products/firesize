/**
 * Util Mixins
 */

'use strict';

var _ = require('underscore');

var UtilsMixin = {

	/**
	 * Get a randome number
	 * @return {[type]} [description]
	 */
	getRandomNum: function () {
		var time = Date.now();
		return time + 1;
	},

	/**
	 * Return the difference of the two arrays
	 * @param  {[type]} a [description]
	 * @return {[type]}   [description]
	 */
	diffArrays: function(arrayA, arrayB) {
		
	}

};

module.exports = UtilsMixin;