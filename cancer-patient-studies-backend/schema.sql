PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS patient_genes;
DROP TABLE IF EXISTS patient_diagnoses;
DROP TABLE IF EXISTS patients;

-- Table for patient data
CREATE TABLE patients (
  patient_id VARCHAR(11) PRIMARY KEY CHECK (patient_id GLOB '[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  first_name TEXT,
  last_name TEXT,
  gender TEXT,
  street_address TEXT,
  city TEXT,
  state VARCHAR(2) CHECK (length(state) = 2),
  zip_code VARCHAR(5) CHECK (length(zip_code) = 5 AND zip_code NOT GLOB '*[^0-9]*'),
  phone VARCHAR(12) CHECK (phone GLOB '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
);

-- Table for patient diagnoses
CREATE TABLE patient_diagnoses (
  patient_id VARCHAR(11) NOT NULL CHECK (patient_id GLOB '[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  diagnosis TEXT NOT NULL COLLATE NOCASE,
  PRIMARY KEY (patient_id, diagnosis),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- Table for patient genes
CREATE TABLE patient_genes (
  patient_id VARCHAR(11) NOT NULL CHECK (patient_id GLOB '[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  gene VARCHAR(3) NOT NULL CHECK (length(gene) = 3) COLLATE NOCASE,
  PRIMARY KEY (patient_id, gene),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);
