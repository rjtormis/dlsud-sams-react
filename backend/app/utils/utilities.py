import string
import random
from app import db
from uuid import uuid4
from flask import jsonify


class UniqueIdentifier:
    def generate_sub_code(char=string.ascii_uppercase + string.digits):
        """
        Generates unique subject code

        Return: String
        """

        code1 = "".join(random.choice(char) for _ in range(4))
        code2 = "".join(random.choice(char) for _ in range(4))
        return f"{code1}-{code2}"

    def generate_uuid():
        """Generate UUID"""
        uuid = uuid4().hex
        return uuid

    def generate_file_identifier(char=string.ascii_uppercase + string.digits):
        return "".join(random.choice(char) for _ in range(2))


class DatabaseUtilities:
    def push_single(data):
        """Helper Function to push data directly into the database"""
        try:
            db.session.add(data)
            db.session.commit()
        except:
            return jsonify({"msg": "Error occured"}), 500

    def push_multiple(data1, data2):
        """Helper Function to push data directly into the database"""
        try:
            db.session.add(data1)
            db.session.add(data2)
            db.session.commit()
        except:
            return jsonify({"msg": "Error occured"}), 500

    def delete_single(data):
        """Helper Function that removes data directly into the database."""
        try:
            db.session.delete(data)
            db.session.commit()
        except:
            return jsonify({"msg": "Error occured"}), 500
