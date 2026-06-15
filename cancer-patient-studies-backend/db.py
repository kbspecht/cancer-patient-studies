import csv
import sqlite3
from pathlib import Path

import click
from flask import current_app, g

"""
Database functions for the Cancer Patient Studies project.
"""

# Connect to the database
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

# Close the database connection
def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()

# Initialize the database
def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# Load CSV data from the data folder into the database
def load_csv_data():
    db = get_db()
    data_path = Path(current_app.root_path).parent / "data"

    # Insert patient details
    with (data_path / "fake_patient_details.csv").open(newline="") as patient_file:
        patients = csv.DictReader(patient_file)
        db.executemany(
            """
            INSERT OR REPLACE INTO patients (
                patient_id,
                first_name,
                last_name,
                gender,
                street_address,
                city,
                state,
                zip_code,
                phone,
                comment
            )
            VALUES (
                :patient_id,
                :first_name,
                :last_name,
                :gender,
                :street_address,
                :city,
                :state,
                :zip_code,
                :phone,
                :comment
            )
            """,
            patients,
        )

    # Insert patient diagnoses
    with (data_path / "fake_patient_diagnosis.csv").open(newline="") as diagnosis_file:
        diagnoses = csv.DictReader(diagnosis_file)
        db.executemany(
            """
            INSERT OR REPLACE INTO patient_diagnoses (patient_id, diagnosis, stage)
            VALUES (:patient_id, :diagnosis, :stage)
            """,
            diagnoses,
        )

    # Insert patient genes
    with (data_path / "fake_patient_genes.csv").open(newline="") as gene_file:
        genes = csv.DictReader(gene_file)
        db.executemany(
            """
            INSERT OR IGNORE INTO patient_genes (patient_id, gene)
            VALUES (:patient_id, :gene)
            """,
            genes,
        )

    db.commit()

# CLI command for initializing the database
@click.command("init-db")
def init_db_command():
    init_db()
    click.echo("Initialized the database.")

# CLI command for loading CSV data from the data folder into the database
@click.command("load-csv")
def load_csv_command():
    load_csv_data()
    click.echo("Loaded CSV data.")

# Initialize the Flask app by cleaning up the database connection and adding the CLI commands
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(load_csv_command)
