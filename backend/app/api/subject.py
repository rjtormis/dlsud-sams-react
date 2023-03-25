from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify, make_response
from datetime import datetime

# Models
from ..models.professor import Professor
from ..models.section import Section
from ..models.subject import Subject

# Utils
from ..utils.generate_unique_code import id_generator
from ..utils.database_utilities import push_to_database, delete_in_database


@app.route("/api/v1/subjects", methods=["GET", "POST", "DELETE"])
@jwt_required()
def subjects():
    """
    REST API that handles the creation of subject on specific section

    Return: POST: STATUS 200
    """
    current_user = get_jwt_identity()

    if request.method == "POST":
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
        subject = Subject.query.filter_by(
            section_id=section.id, subject_name=subjectName
        ).first()

        if subject:
            return jsonify(
                {"msg": f"Subject {subjectName} already exists in {sectionName} "}
            )

        else:
            new_subject = Subject(
                section_id=section.id,
                professor_id=user.id,
                subject_name=subjectName,
                start=start,
                end=end,
                day=day,
            )

            push_to_database(new_subject)

            return jsonify({"subject": new_subject.serialized}), 200


@app.route(
    "/api/v1/subjects/<string:section_name>/<string:sub>",
    methods=["GET", "PATCH", "DELETE"],
)
@jwt_required()
def specific_subject(section_name, sub):
    """
    REST API that handles the deleting and editing of the specific subject

    Return: PATCH : STATUS 200(SUCCESS) STATUS 409(Subject already exists)
            DELETE : STATUS 200
    """

    current_user = get_jwt_identity()
    section = Section.query.filter_by(section_full=section_name).first()
    current_subject = Subject.query.filter_by(
        section_id=section.id, subject_name=sub
    ).first()

    if request.method == "GET":
        pass

    if request.method == "PATCH":
        data = request.get_json()
        subjectName, start, end, day = (
            data["subjectName"],
            data["start"],
            data["end"],
            data["day"],
        )

        query_subject = Subject.query.filter_by(
            section_id=section.id, subject_name=subjectName
        ).first()

        if query_subject:

            # If the user only wants to edit minor details on the subject itself.
            if current_subject.id == query_subject.id:

                current_subject.subject_name = subjectName
                current_subject.start = start
                current_subject.end = end
                current_subject.day = day
                current_subject.updated = datetime.now()
                db.session.commit()

                return jsonify({"msg": "Subject successfully edited"}), 200

            # Otherwise this will trigger.
            return (
                jsonify(
                    {
                        "msg": f"Subject {subjectName} already exists in {section.section_full} "
                    }
                ),
                409,
            )

        else:
            current_subject.subject_name = subjectName
            current_subject.start = start
            current_subject.end = end
            current_subject.day = day
            current_subject.updated = datetime.utcnow()
            db.session.commit()

            return jsonify({"msg": "Subject successfully edited"})

    if request.method == "DELETE":

        delete_in_database(current_subject)
        return jsonify({"msg": "Subject deleted successfully."})
