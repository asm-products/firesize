var UtilsMixin = {
	/**
	 * Get a random number
	 * @return {[type]} [description]
	 */
	getRandomNum: function () {
		'use strict';
		var time = Date.now();
		return time + 1;
	}

};

module.exports = UtilsMixin;
