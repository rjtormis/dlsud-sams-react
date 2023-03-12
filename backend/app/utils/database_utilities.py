from flask import request, jsonify
from app import db


def push_to_database(data):
    """Helper Function to push data directly into the database"""
    try:

        db.session.add(data)
        db.session.commit()
    except:
        return jsonify({"msg": "Error occured"}), 500


def remove_in_database(data):
    """Helper Function that removes data directly into the database."""
    try:
        db.session.remove(data)
        db.session.commit()
    except:
        return jsonify({"msg": "Error occured"}), 500
