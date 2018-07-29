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
		text: {
			type: Sequelize.STRING(1000)
		},
		youtube: {
			type: Sequelize.STRING(500)
		},
		thumbnail: {
			type: Sequelize.STRING(500)
		},
		isDel: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		lecture_idx: {
			type: Sequelize.INTEGER,
			references: {
				model: 'lectures', // 'persons' refers to table name
				key: 'idx' // 'id' refers to column name in persons table
			}
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