/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		id: {
			type: Sequelize.STRING(50),
			primaryKey: true
		},
		pw: {
			type: Sequelize.STRING(500)
		}
	}
};