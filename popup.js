startOfDay = new Date((new Date()).setHours(0, 0, 0, 0));
window.onload = function () {
    var arrowBack = document.getElementById('arrowBack');
    var arrowNext = document.getElementById('arrowNext');
    var dateLabel = document.getElementById('dateLabel');
    updateDateLabel();


    this.queryNumOfGoogled(startOfDay)

    arrowBack.addEventListener('click', function () {
        startOfDay = new Date(startOfDay.setDate(startOfDay.getDate() - 1));
        queryNumOfGoogled(startOfDay);
        updateDateLabel()
    }, false);

    arrowNext.addEventListener('click', function () {
        startOfDay = new Date(startOfDay.setDate(startOfDay.getDate() + 1));
        queryNumOfGoogled(startOfDay);
        updateDateLabel()
    }, false);

    function updateDateLabel(){
        const monthList = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.']
        var month = startOfDay.getMonth() + 1;
        var day = startOfDay.getDate();
        dateLabel.textContent = String(monthList[month] + ' ' + day);
    }
};



function queryNumOfGoogled(startOfDay) {
    var endOfDay_time = new Date(startOfDay).setHours(23, 59, 59, 999);
    chrome.history.search({
        'text': 'www.google.com/search',
        'startTime': startOfDay.getTime(),
        'endTime': endOfDay_time,
        maxResults: 999, 
    },
        function (data) {
            var h1Element = document.getElementById('numOfGoogled');
            h1Element.innerHTML = data.length;
        })
}