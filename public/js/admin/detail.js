/**
 * Created by dkel on 2018-07-22.
 */

function goAdminDetailItem(target) {
	var lectureId = $(target).attr('data-id'); // 강의 ID
	window.location.href = '/admin/detail/' + lectureId;
}

function goCreateLectureItem() {
	var lectureIdx = $('#lectureIdx').val();
	window.location.href = '/admin/create/lecture/item?idx=' + lectureIdx;
}