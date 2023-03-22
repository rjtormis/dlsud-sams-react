from app import db
from datetime import datetime


class Details:
    """
    Model for inheriting created& updated column
    """

    created = db.Column(db.DateTime(), default=datetime.utcnow)
    updated = db.Column(db.DateTime(), default=datetime.utcnow)
