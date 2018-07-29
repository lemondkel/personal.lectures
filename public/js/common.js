/*
 * Created by dkel on 2018-07-22.
 */
var mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination'
	}
});

/**
 * 강의 세부페이지로 이동합니다.
 * @param target
 */
function goLectureDetail(target) {
	var lectureId = $(target).parents('.card').attr('data-id');
	// 강의 ID

	console.log(lectureId);
	window.location.href = '/lecture/detail/' + lectureId;
}

function goAdminMain() {
	window.location.href = '/admin/'
}

function login() {
	var id = $('#id').val();
	var pw = $('#pw').val();

	$.ajax({
		url: "/process/login",
		method : 'POST',
		data: {
			id: id,
			pw: pw
		},
		success: function (data) {
			if (data.result) {
				window.location.href = '/admin';
			} else {
				alert(data.desc);
			}
		}
	})
}

function logout() {
	$.ajax({
		url: "/process/logout",
		method : 'POST',
		success: function (data) {
			if (data.result) {
				window.location.href = '/';
			} else {
				alert(data.desc);
			}
		}
	})
}