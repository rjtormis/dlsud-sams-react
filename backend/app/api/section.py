from flask import jsonify, request
from app import app, db, jwt_required, get_jwt_identity

# Model
from ..models.professor import Professor
from ..models.section import Section

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
    REST API that handles the editting and deleting the section

    Arguments : name - Name of the section.
    Return :
             PUT : STATUS 200
             DELETE : STATUS 200
    """

    current_user = get_jwt_identity()
    section = Section.query.filter_by(section_full=name).first()

    if request.method == "GET":
        return jsonify(
            {
                "section": {
                    "full": section.section_full,
                    "course": section.section_course,
                    "year": section.section_year,
                    "section": section.section_level,
                    "adviser": f"{section.professor.first_name} {section.professor.middle_initial} {section.professor.last_name}",
                }
            }
        )

    if request.method == "PUT":
        data = request.get_json()
        print(data)

        return jsonify({"msg": "Section editted successfully."})

    if request.method == "DELETE":
        db.session.delete(section)
        db.session.commit()

        return jsonify({"msg": "Section deleted successfully."}), 200
