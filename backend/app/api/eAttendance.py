from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify

# Models
from ..models.absent import Absent
from ..models.attendance import Attendance
from ..models.studentSubject import StudentSubject


@app.route("/api/v1/edit_attendance", methods=["POST"])
@jwt_required()
def method_name():
    if request.method == "POST":
        current_user = get_jwt_identity()
        data = request.get_json()

        if data["type"] == "Attendance":
            attendance_data = Attendance.query.filter_by(
                studentNo=data["studentNo"], sub_code=data["code"], date=data["qDate"]
            ).first()
            absent_record = Absent.query.filter_by(
                studentNo=data["studentNo"], sub_code=data["code"], date=data["qDate"]
            ).first()
            if attendance_data:
                return jsonify({"msg": "Student already has attendance recorded"})
            if absent_record:
                new_attendance = Attendance(
                    studentNo=data["studentNo"],
                    sub_code=data["code"],
                    date=data["qDate"],
                    time=data["time"],
                )
                db.session.delete(absent_record)
                db.session.add(new_attendance)
                enrolled_sub = StudentSubject.query.filter_by(
                    studentNo=data["studentNo"], sub_code=data["code"]
                ).first()
                enrolled_sub.total_attendance = enrolled_sub.total_attendance + 1
                enrolled_sub.total_absent = enrolled_sub.total_absent - 1

                db.session.commit()
                return jsonify({"msg": "Attendance recorded"})
            if not attendance_data and not absent_record:
                return jsonify({"msg": "Record does not exists"})
        if data["type"] == "Absent":
            absent_data = Absent.query.filter_by(
                studentNo=data["studentNo"], sub_code=data["code"], date=data["qDate"]
            ).first()
            attendance_record = Attendance.query.filter_by(
                studentNo=data["studentNo"], sub_code=data["code"], date=data["qDate"]
            ).first()
            if absent_data:
                return jsonify({"msg": "Student already has absent recorded"})
            if attendance_record:
                new_absent = Absent(
                    studentNo=data["studentNo"],
                    sub_code=data["code"],
                    date=data["qDate"],
                )
                db.session.delete(attendance_record)
                db.session.add(new_absent)
                enrolled_sub = StudentSubject.query.filter_by(
                    studentNo=data["studentNo"], sub_code=data["code"]
                ).first()
                enrolled_sub.total_attendance = enrolled_sub.total_attendance - 1
                enrolled_sub.total_absent = enrolled_sub.total_absent + 1

                db.session.commit()
                return jsonify({"msg": "Absent recorded"})
            if not absent_data and not attendance_record:
                return jsonify({"msg": "Record does not exists"})
