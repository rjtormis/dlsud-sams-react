from flask import jsonify, request
from app import app, db, jwt_required, get_jwt_identity

# Model
from ..models.professor import Professor
from ..models.section import Section

# Helper
from ..utils.push_to_database import push_to_database


@app.route("/api/v1/section", methods=["GET", "POST"])
@jwt_required()
def classroom():
    if request.method == "GET":
        get_sections = Section.query.order_by(Section.created.desc()).all()

        sections = []

        for i in get_sections:
            sections.append(i.json_format())
        return jsonify({"sections": sections})

    if request.method == "POST":
        current_user = get_jwt_identity()
        full = f'{request.values.get("course")} {request.values.get("year")}{request.values.get("section")}'
        query_section = Section.query.filter_by(section_name=full).first()

        if query_section:
            return jsonify({"msg": "Section already taken"}), 401

        new_section = Section(section_name=full, section_adviser=current_user)
        push_to_database(new_section)

        return jsonify(new_section.json_format()), 201


@app.route("/api/v1/sections/<string:name>/adviser", methods=["GET"])
@jwt_required()
def section_adviser(name):
    current_user = get_jwt_identity()

    query_section = Section.query.filter_by(section_name=name).first()

    if query_section.section_adviser == current_user:
        return jsonify({"isAdviser": True}), 200
    else:
        return jsonify({"isAdviser": False}), 200
