# script to get recently downloaded schedule.json file from local downloads folder and create an appropriate .ics file 
# to be invoked by button in popup.html

import os
import json
from pathlib import Path


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

    # print(schedules)

    most_recent = max(schedules, key=os.path.getctime)
    # print(most_recent)

    return most_recent

# load json data from the file
def load_data(sched_file):
    file = open(sched_file)
    data = json.load(file)
    return data

curr_sched = get_recent_schedule()
curr_data = load_data(curr_sched)

print(curr_data)

