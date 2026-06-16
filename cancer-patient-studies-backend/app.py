from flask import Flask, jsonify, request
from flask_cors import CORS

from db import get_db, init_app

import os

"""
The main Flask application for the Cancer Patient Studies back end application.
"""

# create the Flask app, set up CORS and database
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path, "cancer_patient_studies.sqlite"),
)

# create the instance folder if it doesn't exist
os.makedirs(app.instance_path, exist_ok=True)

# initialize app
init_app(app)

# main page route
@app.route("/")
def main_page():
    return "<h1>Cancer Patient Studies</h1>"

# route to get all patients
@app.route("/patients")
def patients():
    rows = get_db().execute(
        """
        SELECT
            patients.patient_id,
            patients.first_name,
            patients.last_name,
            patients.gender,
            patients.street_address,
            patients.city,
            patients.state,
            patients.zip_code,
            patients.phone,
            patients.comment,
            REPLACE(GROUP_CONCAT(DISTINCT patient_diagnoses.diagnosis), ',', ', ') AS diagnoses,
            REPLACE(GROUP_CONCAT(DISTINCT patient_diagnoses.stage), ',', ', ') AS stages,
            REPLACE(GROUP_CONCAT(DISTINCT patient_genes.gene), ',', ', ') AS genes
        FROM patients
        LEFT JOIN patient_diagnoses
            ON patients.patient_id = patient_diagnoses.patient_id
        LEFT JOIN patient_genes
            ON patients.patient_id = patient_genes.patient_id
        GROUP BY patients.patient_id
        ORDER BY patients.patient_id
        """
    ).fetchall()

    return jsonify([dict(row) for row in rows])

# route to get a specific patient by ID or update their information
@app.route("/patient/<patient_id>", methods=["GET", "PUT"])
def patient(patient_id):
    if request.method == "GET":
        row = get_db().execute(
            """
            SELECT
                patients.patient_id,
                patients.first_name,
                patients.last_name,
                patients.gender,
                patients.street_address,
                patients.city,
                patients.state,
                patients.zip_code,
                patients.phone,
                patients.comment,
                REPLACE(GROUP_CONCAT(DISTINCT patient_diagnoses.diagnosis), ',', ', ') AS diagnoses,
                REPLACE(GROUP_CONCAT(DISTINCT patient_diagnoses.stage), ',', ', ') AS stages,
                REPLACE(GROUP_CONCAT(DISTINCT patient_genes.gene), ',', ', ') AS genes
            FROM patients
            LEFT JOIN patient_diagnoses
                ON patients.patient_id = patient_diagnoses.patient_id
            LEFT JOIN patient_genes
                ON patients.patient_id = patient_genes.patient_id
            WHERE patients.patient_id = ?
            GROUP BY patients.patient_id
            """,
            (patient_id,)
        ).fetchone()

        if row is None:
            return jsonify({"error": "Patient not found"}), 404

        return jsonify(dict(row))
    elif request.method == "PUT":
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Update the patient's information
        get_db().execute(
            """
            UPDATE patients
            SET first_name = ?, last_name = ?, gender = ?, street_address = ?, city = ?, state = ?, zip_code = ?, phone = ?, comment = ?
            WHERE patient_id = ?
            """,
            (
                data.get("first_name"),
                data.get("last_name"),
                data.get("gender"),
                data.get("street_address"),
                data.get("city"),
                data.get("state"),
                data.get("zip_code"),
                data.get("phone"),
                data.get("comment"),
                patient_id
            )
        )
        get_db().commit()

        return jsonify({"message": "Patient updated successfully"})
