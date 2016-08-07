/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');

module.exports = {
	projectRoot: path.resolve(__dirname, '..'),
	dev: {
		contentBase: path.resolve(__dirname, '../src')
	}
};
