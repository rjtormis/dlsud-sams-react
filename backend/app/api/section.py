from flask import jsonify, request
from datetime import datetime
from app import app, db, jwt_required, get_jwt_identity, s3, s3_bucket_name, s3_resource

# Model
from ..models.professor import Professor
from ..models.section import Section
from ..models.subject import Subject

# Helper
from ..utils.database_utilities import push_to_database
from ..utils.generate_unique_code import unique_identifier_file

# Exception
from ..exception import ConflictError

# Error Handler
from ..errors import handle_conflict_error


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
            sections.append(i.serialized)
        return jsonify({"sections": sections})

    if request.method == "POST":
        data = request.get_json()

        try:
            new_section = Section.create_section(
                data["course"], data["year"], data["section"], current_user
            )
            return jsonify(new_section), 201
        except ConflictError as e:
            return handle_conflict_error(e)


@app.route("/api/v1/sections/<string:name>/adviser", methods=["GET"])
@jwt_required()
def isSectionAdviser(name):
    """
    REST API that checks if the logged in user is the adviser

    Arguments : name - Name of the section.
    Return: GET: STATUS 200
    """

    current_user = get_jwt_identity()

    adviser = Section.isAdviser(current_user, name)

    return jsonify({"isAdviser": adviser}), 200


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
            subject.append(i.serialized)
        return jsonify({"section": section.serialized})

    if request.method == "PUT":
        data = request.get_json()

        try:
            Section.update_section(name, data["course"], data["year"], data["section"])
        except ConflictError as e:
            return handle_conflict_error(e)

    if request.method == "DELETE":

        Section.delete_section(section)

        return jsonify({"msg": "Section deleted successfully."}), 200


@app.route("/api/v1/section/get-pre-signed-url-section", methods=["POST"])
@jwt_required()
def generate_presigned_section():
    """
    REST API that gets pre signed url for AWS s3 storage then saves the image location e.g
    https://s3.console.aws.amazon.com/s3/object/aws-sams-storage?region=ap-southeast-1&prefix=section/default_section_image.jpg
    to the aws s3.

    Return:
            POST : STATUS 200 (Success)
    """

    if request.method == "POST":
        data = request.get_json()
        response, Key = Section.generate_presigned_url(data["id"], data["fileName"])
        return jsonify({"signed_url": response, "location": f"{Key}"})


@app.route("/api/v1/sections/<int:id>/upload", methods=["POST"])
@jwt_required()
def specificSectionUpload(id):
    """
    NOT SURE IF I IMPLEMENTED THIS API IN THE FRONT END LMAO.
    to check
    """

    if request.method == "POST":
        data = request.get_json()
        section = Section.query.filter_by(id=id).first()
        section.section_image_link = data["section_image"]
        db.session.commit()
        return jsonify({"msg": "Success"}), 200
