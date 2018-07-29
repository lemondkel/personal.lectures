var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var userDao = require(rootPath + '/routes/dao/User');
var lectureDao = require(rootPath + '/routes/dao/Lecture');
var lectureItemDao = require(rootPath + '/routes/dao/LectureItem');

const User = sequelize.define('User', userDao.info, userDao.desc);
const Lecture = sequelize.define('Lecture', lectureDao.info, lectureDao.desc);
const LectureItem = sequelize.define('LectureItem', lectureItemDao.info, lectureItemDao.desc);

/* GET home page. */
router.get('/', function (req, res, next) {
	Lecture.findAll({
		where: {day: 0},
		order: [
			['updatedAt', 'DESC']
		]
	}).then(function (day0) {
		Lecture.findAll({
			where: {
				day: 1
			},
			order: [
				['updatedAt', 'DESC']
			]
		}).then(function (day1) {
			Lecture.findAll({
				where: {
					day: 2
				},
				order: [
					['updatedAt', 'DESC']
				]
			}).then(function (day2) {
				Lecture.findAll({
					where: {
						day: 3
					},
					order: [
						['updatedAt', 'DESC']
					]
				}).then(function (day3) {
					Lecture.findAll({
						where: {
							day: 4
						},
						order: [
							['updatedAt', 'DESC']
						]
					}).then(function (day4) {
						Lecture.findAll({
							where: {
								day: 5
							},
							order: [
								['updatedAt', 'DESC']
							]
						}).then(function (day5) {
							Lecture.findAll({
								where: {
									day: 6
								},
								order: [
									['updatedAt', 'DESC']
								]
							}).then(function (day6) {
								res.render('index', {
									title: 'Express',
									day0: day0,
									day1: day1,
									day2: day2,
									day3: day3,
									day4: day4,
									day5: day5,
									day6: day6
								});
							});
						});
					});
				});
			});
		});
	});
});

/* GET home page. */
router.get('/login', function (req, res, next) {
	res.render('login', {title: 'Express'});
});

/* GET home page. */
router.get('/about', function (req, res, next) {
	res.render('about', {title: 'Express'});
});

/**
 * 로그인 프로세스 정리
 */
router.post('/process/login', function (req, res, next) {
	console.log("hi~");

	var id = req.body.id; // 사용자 아이디
	var pw = req.body.pw; // 사용자 비밀번호
	User.findOne({
		where: {
			id: id
		}
	}).then(function (data) {
		if (data !== null) {
			User.findOne({
				where: {
					id: id,
					pw: pw
				}
			}).then(function (data) {
				console.log(data);
				if (data !== null) {
					console.log(data);
					req.session.user_id = data.id;

					res.json({result: true, desc: '로그인 완료'});
				} else {
					res.json({result: false, desc: '비밀번호가 일치하지 않습니다'});
				}
			});
		} else {
			res.json({result: false, desc: '아이디가 존재하지 않습니다'});
		}
	}).catch(function (err) {
		console.log(err);
		res.json({result: false, desc: '서버 에러'});
	});
});

router.get('/process/logout', function (req, res, next) {
	try {
		delete req.session.user_id;
		res.json({result: true, desc: '로그인 완료'});
	} catch (Exception) {
		res.json({result: false, desc: '서버 에러'});
	}
});

/* GET home page. */
router.get('/lecture/detail/:id', function (req, res, next) {
	var id = req.params.id; // 강의 ID
	Lecture.find({
		where: {
			idx: id
		}
	}).then(function (data) {
		console.log(data);
		LectureItem.findAll({
			where: {
				lecture_idx: id
			}
		}).then(function (data2) {
			res.render('lecture/detail', {title: 'Express', lecture: data, lectureItemList: data2});
		});
	});
});

/* GET home page. */
router.get('/lecture/detail/:id/item/:id2', function (req, res, next) {
	console.log(req.params.id); // 강의 ID
	console.log(req.params.id2); // 차시 ID

	LectureItem.find({
		where: {
			idx: req.params.id2
		}
	}).then(function (data) {
		res.render('lecture/item', {title: 'Express', lectureItem: data});
	});
});

module.exports = router;
