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
        section = Section.query.filter_by(section_name=sectionName).first()
        user = Professor.query.filter_by(id=current_user).first()
        new_subject = Subject(
            section_id=section.id,
            professor_id=user.id,
            subject_name=subjectName,
            start=start,
            end=end,
            day=day,
            code=id_generator,
        )

        push_to_database(new_subject)

        return jsonify({"msg": "test"}), 200
