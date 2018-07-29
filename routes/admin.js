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

	sequelize.query('SELECT '
		+ '(select count(*) from lectures where day=0) AS day0, '
		+ '(select count(*) from lectures where day=1) AS day1, '
		+ '(select count(*) from lectures where day=2) AS day2, '
		+ '(select count(*) from lectures where day=3) AS day3, '
		+ '(select count(*) from lectures where day=4) AS day4, '
		+ '(select count(*) from lectures where day=5) AS day5, '
		+ '(select count(*) from lectures where day=6) AS day6').then(function (data) {
		console.log(data[0][0]);
		console.log('day1 : ' + data[0][0].day1);
		res.render('admin/index', {title: 'Express', dayCount: data[0][0]});
	});

});

/* GET home page. */
router.get('/create/lecture', function (req, res, next) {
	res.render('admin/create_lecture', {title: 'Express'});
});

/* GET home page. */
router.get('/create/lecture/item', function (req, res, next) {
	var lectureIdx = req.query.idx;

	res.render('admin/create_lecture_item', {title: 'Express', lectureIdx : lectureIdx});
});

/* GET home page. */
router.post('/process/create/lecture', function (req, res, next) {
	var title = req.body.title; // 제목
	var thumbnail = req.body.thumbnail; // 썸네일
	var text = req.body.text; // 텍스트
	var day = parseInt(req.body.day); // 요일 ID

	Lecture.create({
		title: title,
		thumbnamil: thumbnail,
		text: text,
		day: day
	}).then(function (data) {
		console.log(data);
		res.redirect('/admin/day/' + day);
	});
});

/* GET home page. */
router.post('/process/create/lecture/item', function (req, res, next) {
	var lectureIdx = req.body.lecture_idx; // 제목
	var title = req.body.title; // 제목
	var thumbnail = req.body.thumbnail; // 썸네일
	var text = req.body.text; // 텍스트
	var youtube = req.body.youtube; // 텍스트

	LectureItem.create({
		title: title,
		thumbnamil: thumbnail,
		text: text,
		youtube: youtube,
		lecture_idx: lectureIdx
	}).then(function (data) {
		console.log(data);
		res.redirect('/admin/detail/' + lectureIdx);
	});
});

/* GET home page. */
router.get('/day/:id', function (req, res, next) {
	var id = parseInt(req.params.id); // 요일 ID (0 ~ 6)
	// 0 : 월요일
	// 1 : 화요일
	// ...
	// 6 : 일요일

	Lecture.findAll({
		attributes: [
			'idx', 'title', 'text', 'thumbnail', [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('updatedAt'), '%Y-%m-%d %h:%i:%s'), 'updatedAt']
		],
		where: {
			day: id
		},
		order: [
			['updatedAt', 'DESC']
		]
	}).then(function (data) {
		console.log(data);
		res.render('admin/day', {title: 'Express', lectureList: data});
	});
});

/* GET home page. */
router.get('/detail/:id', function (req, res, next) {
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
			res.render('admin/detail', {title: 'Express', lecture: data, lectureItemList: data2});
		});
	});
});

module.exports = router;