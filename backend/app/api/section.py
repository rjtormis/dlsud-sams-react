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
        data = request.get_json()
        course = data["course"]
        year = data["year"]
        section = data["section"]
        full = f"{course} {year}{section}"

        query_section = Section.query.filter_by(section_full=full).first()

        if query_section:
            return jsonify({"msg": "Section already taken"}), 409

        new_section = Section(
            section_full=full,
            section_course=course,
            section_adviser=current_user,
            section_year=year,
            section_level=section,
        )
        push_to_database(new_section)
        new_section.check_section_folder(f"section/{new_section.id}")

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
        bucket = s3_resource.Bucket(s3_bucket_name)
        bucket.objects.filter(Prefix=f"section/{section.id}").delete()
        db.session.delete(section)
        db.session.commit()
        return jsonify({"msg": "Section deleted successfully."}), 200


@app.route("/api/v1/section/get-pre-signed-url-section", methods=["POST"])
@jwt_required()
def generate_presigned_section():
    if request.method == "POST":
        data = request.get_json()
        imgID = unique_identifier_file()
        section = Section.query.filter_by(id=data["id"]).first()
        if section.section_image_link != "default_section_image.jpg":
            current_section_image = section.section_image_link.split("/")[1]
            s3.delete_object(
                Bucket=s3_bucket_name, Key=f"{section.id}/{current_section_image}"
            )
        Key = f"{data['id']}/{imgID}_{data['fileName']}"
        response = s3.generate_presigned_post(
            s3_bucket_name, Key=f"section/{Key}", ExpiresIn=300
        )

        return jsonify({"signed_url": response, "location": f"{Key}"})


@app.route("/api/v1/sections/<int:id>/upload", methods=["POST"])
@jwt_required()
def specificSectionUpload(id):
    if request.method == "POST":
        data = request.get_json()
        section = Section.query.filter_by(id=id).first()
        section.section_image_link = data["section_image"]
        db.session.commit()
        return jsonify({"msg": "Success"}), 200
