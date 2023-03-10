from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify, make_response

# Models
from ..models.professor import Professor
from ..models.section import Section
from ..models.subject import Subject

# Utils
from ..utils.generate_unique_code import id_generator
from ..utils.push_to_database import push_to_database


@app.route("/api/v1/subjects", methods=["GET", "POST", "DELETE"])
@jwt_required()
def subjects():
    """
    REST API that handles the creation of subject on specific section

    Return: POST: STATUS 200
    """

    if request.method == "POST":
        current_user = get_jwt_identity()
        data = request.get_json()

        sectionName, subjectName, start, end, day = (
            data["sectionName"],
            data["subjectName"],
            data["start"],
            data["end"],
            data["day"],
        )
        section = Section.query.filter_by(section_full=sectionName).first()
        user = Professor.query.filter_by(id=current_user).first()
        new_subject = Subject(
            section_id=section.id,
            professor_id=user.id,
            subject_name=subjectName,
            start=start,
            end=end,
            day=day,
        )

        push_to_database(new_subject)

        return jsonify({"msg": "Sucessfully added new subject."}), 200


@app.route(
    "/api/v1/subjects/<string:section_name>/<string:subject_name>",
    methods=["GET", "POST", "DELETE"],
)
@jwt_required()
def specific_subject(section_name, subject_name):
    """
    REST API that handles the deleting and editing of the specific subject

    Return: DELETE : STATUS 200
    """

    current_user = get_jwt_identity()
    section = Section.query.filter_by(section_full=section_name).first()
    subject = Subject.query.filter_by(
        section_id=section.id, subject_name=subject_name
    ).first()

    if request.method == "DELETE":

        db.session.delete(subject)
        db.session.commit()

        return jsonify({"msg": "Subject deleted successfully."})
