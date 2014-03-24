(function ($, window, undefined) {
    'use strict';

    var courseTitle = $("#course-title"),
        courseDescription = $("#course-description"),
        iframe = $("#course-iframe"),
        embedURL = "http://app.kurubee.com/?course=/api/v1/career/{}",
        apiURL = "http://beta.drglearning.com/api/v1/career/{}";

    function init() {
        var courseId = readCourseId();
        if (courseId.length > 0) {
            getCourse(courseId);
            loadCourse(courseId);
        }
    }

    function readCourseId() {
        return window.location.hash.substr(1);
    }

    function getCourse(courseId) {
        var request = $.ajax(apiURL.replace("{}", courseId), {
            dataType: "json"
        });
        request.then(function (data) {
            courseTitle.text(data.name);
            courseDescription.text(data.description);
        });
        request.fail(function (xhr) {
            console.log("Error loading course info")
        });
    }

    function loadCourse(courseId) {
        iframe.attr("src", embedURL.replace("{}", courseId));
    }

    $(init);
})(jQuery, window);
