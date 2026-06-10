import csv
import sqlite3
from pathlib import Path

import click
from flask import current_app, g


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


def load_csv_data():
    db = get_db()
    data_path = Path(current_app.root_path).parent / "data"

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
                phone
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
                :phone
            )
            """,
            patients,
        )

    with (data_path / "fake_patient_diagnosis.csv").open(newline="") as diagnosis_file:
        diagnoses = csv.DictReader(diagnosis_file)
        db.executemany(
            """
            INSERT OR REPLACE INTO patient_diagnoses (patient_id, diagnosis)
            VALUES (:patient_id, :diagnosis)
            """,
            diagnoses,
        )

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


@click.command("init-db")
def init_db_command():
    init_db()
    click.echo("Initialized the database.")


@click.command("load-csv")
def load_csv_command():
    load_csv_data()
    click.echo("Loaded CSV data.")


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(load_csv_command)
