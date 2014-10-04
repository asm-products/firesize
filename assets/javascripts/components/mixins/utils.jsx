/**
 * Util Mixins
 */

var UtilsMixin = {

	'use strict',

	/**
	 * Get a randome number
	 * @return {[type]} [description]
	 */
	getRandomNum: function () {
		var time = Date.now();
		return time + 1;
	}

};

module.exports = UtilsMixin;