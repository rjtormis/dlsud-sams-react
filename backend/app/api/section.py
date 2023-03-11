from flask import jsonify, request
from datetime import datetime
from app import app, db, jwt_required, get_jwt_identity

# Model
from ..models.professor import Professor
from ..models.section import Section
from ..models.subject import Subject

# Helper
from ..utils.push_to_database import push_to_database


@app.route("/api/v1/sections", methods=["GET", "POST"])
@jwt_required()
def allSections():
    """
    REST API that queries all the sections(GET) and creates section(POST)

    Return: GET: STATUS 200
            POST: STATUS 200
    """
    current_user = get_jwt_identity()

    if request.method == "GET":
        get_sections = Section.query.order_by(Section.created.desc()).all()
        sections = []

        for i in get_sections:
            sections.append(i.json_format())
        return jsonify({"sections": sections})

    if request.method == "POST":
        course = request.values.get("course")
        year = request.values.get("year")
        section = request.values.get("section")
        full = f"{course} {year}{section}"

        query_section = Section.query.filter_by(section_full=full).first()

        if query_section:
            return jsonify({"msg": "Section already taken"}), 401

        new_section = Section(
            section_full=full,
            section_course=course,
            section_adviser=current_user,
            section_year=year,
            section_level=section,
        )
        push_to_database(new_section)

        return jsonify(new_section.json_format()), 201


@app.route("/api/v1/sections/<string:name>/adviser", methods=["GET"])
@jwt_required()
def isSectionAdviser(name):
    """
    REST API that checks if the logged in user is the adviser

    Arguments : name - Name of the section.
    Return: GET: STATUS 200
    """

    current_user = get_jwt_identity()

    query_section = Section.query.filter_by(section_full=name).first()

    if query_section.section_adviser == current_user:
        return jsonify({"isAdviser": True}), 200
    else:
        return jsonify({"isAdviser": False}), 200


@app.route("/api/v1/sections/<string:name>", methods=["GET", "POST", "DELETE", "PUT"])
@jwt_required()
def specificSection(name):

    """
    REST API that handles the editing and deleting the section

    Arguments : name - Name of the section.
    Return :
             GET : STATUS 200
             PUT : STATUS 200(success) , 409(conflict/section already exists)
             DELETE : STATUS 200
    """

    current_user = get_jwt_identity()
    section = Section.query.filter_by(section_full=name).first()

    if request.method == "GET":
        allSubjects = Subject.query.filter_by(section_id=section.id).all()
        subject = []
        for i in allSubjects:
            subject.append(i.json_format())
        return jsonify({"section": section.json_format()})

    if request.method == "PUT":
        data = request.get_json()
        full = f"{data['course']} {data['year']}{data['section']}"
        query_section = Section.query.filter_by(section_full=full).first()

        if query_section:
            return jsonify({"msg": "Section already exists"}), 409

        section.section_full = full
        section.section_course = data["course"]
        section.section_year = data["year"]
        section.section_level = data["section"]
        section.updated = datetime.utcnow()

        db.session.commit()

        return (
            jsonify(
                {
                    "msg": "Section editted successfully.",
                    "section": section.json_format(),
                }
            ),
            200,
        )

    if request.method == "DELETE":
        print(section)
        db.session.delete(section)
        db.session.commit()
        return jsonify({"msg": "Section deleted successfully."}), 200
