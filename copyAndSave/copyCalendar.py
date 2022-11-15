# script to get recently downloaded schedule.json file from local downloads folder and create an appropriate .ics file 
# to be invoked by button in popup.html

import os
import json
from pathlib import Path
from ics import Calendar, Event
from zoneinfo import ZoneInfo
from datetime import datetime


months = {"January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, 
"July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12}

# accesses the user's downloads folder
if os.name == 'nt':
    import ctypes
    from ctypes import windll, wintypes
    from uuid import UUID

    # ctypes GUID copied from MSDN sample code
    class GUID(ctypes.Structure):
        _fields_ = [
            ("Data1", wintypes.DWORD),
            ("Data2", wintypes.WORD),
            ("Data3", wintypes.WORD),
            ("Data4", wintypes.BYTE * 8)
        ] 

        def __init__(self, uuidstr):
            uuid = UUID(uuidstr)
            ctypes.Structure.__init__(self)
            self.Data1, self.Data2, self.Data3, \
                self.Data4[0], self.Data4[1], rest = uuid.fields
            for i in range(2, 8):
                self.Data4[i] = rest>>(8-i-1)*8 & 0xff

    SHGetKnownFolderPath = windll.shell32.SHGetKnownFolderPath
    SHGetKnownFolderPath.argtypes = [
        ctypes.POINTER(GUID), wintypes.DWORD,
        wintypes.HANDLE, ctypes.POINTER(ctypes.c_wchar_p)
    ]

    def _get_known_folder_path(uuidstr):
        pathptr = ctypes.c_wchar_p()
        guid = GUID(uuidstr)
        if SHGetKnownFolderPath(ctypes.byref(guid), 0, 0, ctypes.byref(pathptr)):
            raise ctypes.WinError()
        return pathptr.value

    FOLDERID_Download = '{374DE290-123F-4565-9164-39C4925E467B}'

    def get_download_folder():
        return _get_known_folder_path(FOLDERID_Download)
else:
    def get_download_folder():
        home = os.path.expanduser("~")
        return os.path.join(home, "Downloads")

# finds and returns the most recently downloaded schedule in the user's downloads folder
def get_recent_schedule():
    entries = os.scandir(get_download_folder())

    schedules = list()

    for entry in entries:
        if (entry.is_file() and 'schedule' in entry.name and '.json' in entry.name):
            schedules.append(entry)

    most_recent = max(schedules, key=os.path.getctime)
    return most_recent

# load json data from the file
def load_data(sched_file):
    file = open(sched_file)
    data = json.load(file)
    return data

# creates .ics file from given schedule data
def create_calendar(curr_data):
    calendar = Calendar()
    year = int(curr_data["Year"])
    month = months[curr_data["Month"]]

    for day in curr_data["Days"]:
        begin = datetime(year, month, int(day["Date"]), int(day["Start_Time"][0:2]), minute=int(day["Start_Time"][3:5]), tzinfo=ZoneInfo("America/Vancouver"))
        end = datetime(year, month, int(day["Date"]), int(day["End_Time"][0:2]), minute=int(day["End_Time"][3:5]), tzinfo=ZoneInfo("America/Vancouver"))
        shift = Event(name=day["Job"], begin=begin, end=end, location=day["Department"])
        calendar.events.add(shift)
        print(begin)
        print(end)
    return calendar

# writes the calendar to an ics file
def write_to_file(calendar):
    open("./copyAndSave/fullSchedule.ics", "w").writelines(calendar)    

def main():
    curr_sched = get_recent_schedule()
    print(curr_sched.name)
    curr_data = load_data(curr_sched)

    print(curr_data)

    curr_calendar = create_calendar(curr_data)
    print(curr_calendar.serialize())

    write_to_file(curr_calendar)

if __name__ == "__main__":
    main()