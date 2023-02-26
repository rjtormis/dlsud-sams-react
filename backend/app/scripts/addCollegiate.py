from app import db
from ..models.collegiate import Collegiate


def collegiateScript():
    """Script for adding Collegiates"""

    collegiates = {
        "CBAA": "College of Business Administration and Accountancy",
        "CCJE": "College of Criminal Justice Education",
        "CEAT": "College of Engineering, Architecture and Technology",
        "CLAC": "College of Liberal Arts and Communication",
        "CSCS": "College of Science and Computer Studies",
        "CTHM": "College of Tourism and Hospitality Management",
    }

    for key, value in collegiates.items():
        key = Collegiate(collegiate_name=value, collegiate_shorten=key)
        db.session.add(key)
    db.session.commit()
