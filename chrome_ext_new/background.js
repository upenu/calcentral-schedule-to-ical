function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var callback = function(details) {
    alert("done")
    for (var i = 0; i < details.responseHeaders.length; ++i) {
        if (details.responseHeaders[i].name === 'Set-Cookie') {
            var cookie = details.responseHeaders[i].value;
            fetch('https://calcentral.berkeley.edu/api/my/academics', {
                headers: {
                    'Cookie': cookie
                }
            }).then(r => r.json()).then(result => {
                // Download academic calendar from Google Calendar
                calendar = httpGet('https://calendar.google.com/calendar/ical/c_lublpqqigfijlbc1l4rudcpi5s@group.calendar.google.com/public/basic.ics')
                alert(calendar)
                var classes = result['semesters'][0]['classes']
                for (var j = 0; j < classes.length; ++j) {
                    var classname = classes[j]['course_code']
                    var 
                    for (var k = 0; k < classes[j]['sections'].length; ++k) {
                        var curr_section = classes[j]['sections'][k]
                        var section_schedule = curr_section['schedules']['recurring'][0]
                        if (section_schedule) {
                            alert(classname + ' ' + curr_section['instruction_format'] + ' ' + section_schedule['buildingName'] + ' ' + section_schedule['roomNumber'] + ' ' + section_schedule['schedule'])
                        } else {
                            alert(classname + ' has no meeting times')
                        }
                    }
                }

            })
            break;
        }
    }
};
var filter = {urls: ["https://calcentral.berkeley.edu/api/my/residency"]};
var opt_extraInfoSpec = ["responseHeaders", "extraHeaders"];


chrome.webRequest.onHeadersReceived.addListener(callback, filter, opt_extraInfoSpec);
