/**
 * Created by dkel on 2018-07-22.
 */

function goDay(target) {
	var dayId = $(target).attr('data-id'); // 요일 ID
	window.location.href = '/admin/day/' + dayId;
}

function goCreateLecture() {
	window.location.href = '/admin/create/lecture';
}