/**
 * Created by dkel on 2018-07-22.
 */

/**
 * 디테일 화면으로 이동합니다.
 *
 * @param target
 */
function goDetailItem(target) {
	var lectureId = $(target).parents('.item_list').attr('data-id'); // 강의 ID
	var detailId = $(target).attr('data-detail-id'); // 차시 ID

	console.log(lectureId);

	window.location.href = '/lecture/detail/' + lectureId + "/item/" + detailId;
}