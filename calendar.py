from icalendar import Calendar, Event
import pytz
from datetime import datetime

def make_calendar(userdata):
    cal = Calendar()
    cal.add_component(timezone)
    pacific_time = pytz.timezone('America/Los_Angeles') # Berkeley uses Pacific time
    for section in userdata['PLACEHOLDER']: 
        dept, course_number, section_number, ccn = userdata['PLACEHOLDER: UNPACK']
        section_dept_and_number = "{} {}".format(dept, course_number)
        if len(section['PLACEHOLDER: GET MEETINGS']) == 0:
            print("warning: Your {} has no meeting, ignored in calender".format(section_dept_and_number))
            continue
        meeting = section['meetings'][0]
        meeting_type = meeting['meetingType']
        start_date, end_date = 0 # replace with start/end date once we figure out the API
        start_time, end_time = 0 # replace later
        dtstart = 0 # replace later
        dtend = 0 # replace later
        byday = [weekday_abbrv_converter[x] for x in meeting['daysRaw']]
        location = meeting['location']
        event_name = "{} {} {}".format(section_dept_and_number, meeting_type, section_number)
        if len(byday) == 0:
            print("warning: Your {} has no appointed time, ignored in calender".format(event_name))
            continue
        event = Event()
        event.add('summary', event_name)
        event.add('dtstart', dtstart)
        event.add('dtend', dtend)
        event['location'] = vText(location)
        event.add('rrule', {'freq': 'weekly', 'until': end_date, 'byday': byday})
        cal.add_component(event)
    return cal