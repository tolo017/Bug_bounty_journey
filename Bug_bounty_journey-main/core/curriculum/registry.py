from .week1 import WEEK_1_DATA
from .week2 import WEEK_2_DATA
from .week3 import WEEK_3_DATA
from .week4 import WEEK_4_DATA
from .week5 import WEEK_5_DATA
from .week6 import WEEK_6_DATA
from .week7 import WEEK_7_DATA
from .week8 import WEEK_8_DATA
from .week9 import WEEK_9_DATA
from .week10 import WEEK_10_DATA
from .week11 import WEEK_11_DATA
from .week12 import WEEK_12_DATA

WEEKS_DATA = {
    1: WEEK_1_DATA,
    2: WEEK_2_DATA,
    3: WEEK_3_DATA,
    4: WEEK_4_DATA,
    5: WEEK_5_DATA,
    6: WEEK_6_DATA,
    7: WEEK_7_DATA,
    8: WEEK_8_DATA,
    9: WEEK_9_DATA,
    10: WEEK_10_DATA,
    11: WEEK_11_DATA,
    12: WEEK_12_DATA,
}

def get_week_data(week_number):
    return WEEKS_DATA.get(int(week_number))

def get_all_weeks_summary():
    summary = []
    for week_num, data in WEEKS_DATA.items():
        summary.append({
            'week_number': week_num,
            'title': data['title'],
            'short_desc': data['short_desc'],
            'flag': data['flag']
        })
    return summary
