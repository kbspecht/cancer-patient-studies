from flask import Flask, jsonify
from flask_cors import CORS

from db import get_db, init_app

import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path, "cancer_patient_studies.sqlite"),
)
os.makedirs(app.instance_path, exist_ok=True)
init_app(app)


@app.route("/")
def main_page():
    return "<h1>Cancer Patient Studies</h1>"


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
            GROUP_CONCAT(DISTINCT patient_diagnoses.diagnosis) AS diagnoses,
            GROUP_CONCAT(DISTINCT patient_genes.gene) AS genes
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

@app.route("/patient/<patient_id>")
def patient(patient_id):
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
            GROUP_CONCAT(DISTINCT patient_diagnoses.diagnosis) AS diagnoses,
            GROUP_CONCAT(DISTINCT patient_genes.gene) AS genes
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
