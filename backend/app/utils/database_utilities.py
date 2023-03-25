from flask import request, jsonify
from app import db


def push_to_database(data):
    """Helper Function to push data directly into the database"""
    try:

        db.session.add(data)
        db.session.commit()
    except:
        return jsonify({"msg": "Error occured"}), 500


def push_multiple_to_database(data1, data2):
    """Helper Function to push data directly into the database"""
    try:

        db.session.add(data1)
        db.session.add(data2)
        db.session.commit()
    except:
        return jsonify({"msg": "Error occured"}), 500


def delete_in_database(data):
    """Helper Function that removes data directly into the database."""
    try:
        db.session.delete(data)
        db.session.commit()
    except:
        return jsonify({"msg": "Error occured"}), 500
