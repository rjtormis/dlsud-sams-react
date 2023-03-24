from app import app
from flask import jsonify


@app.errorhandler(404)
def handle_not_found_error(error):
    message = error.message
    return jsonify({"error": "Not Found", "status": 404, "message": str(message)}), 404


@app.errorhandler(409)
def handle_conflict_error(error):
    message = error.message
    return jsonify({"error": "Conflict", "status": 409, "message": str(message)}), 409
