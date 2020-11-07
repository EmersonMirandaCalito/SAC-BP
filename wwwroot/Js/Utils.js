
jQuery.doPostAndWait = function (url, json, successCallback, errorCallback) {

    $.ajax({
        url: '/Ticket/getUser',
        data: json,
        type: 'POST',
        dataType: 'json',
        success: successCallback,
        error: errorCallback
    });
}


