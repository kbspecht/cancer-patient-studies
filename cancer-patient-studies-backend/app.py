from flask import Flask, jsonify

from db import get_db, init_app

import os

app = Flask(__name__)
app.config.from_mapping(
    DATABASE=os.path.join(app.instance_path, "cancer_patient_studies.sqlite"),
)
os.makedirs(app.instance_path, exist_ok=True)
init_app(app)


@app.route("/")
def main_page():
    return "<h1>Cancer Patient Studies Backend</h1>"


@app.route("/patients")
def patients():
    rows = get_db().execute(
        """
        SELECT
            patient_id,
            first_name,
            last_name,
            gender,
            street_address,
            city,
            state,
            zip_code,
            phone
        FROM patients
        ORDER BY last_name, first_name
        """
    ).fetchall()

    return jsonify([dict(row) for row in rows])
