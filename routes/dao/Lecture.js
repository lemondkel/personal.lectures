/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		idx: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING(100),
			defaultValue: "제목이 입력되지 않았습니다."
		},
		day: {
			type: Sequelize.INTEGER
		},
		thumbnail: {
			type: Sequelize.STRING(500)
		},
		text: {
			type: Sequelize.STRING(500)
		},
		isDel: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}
};