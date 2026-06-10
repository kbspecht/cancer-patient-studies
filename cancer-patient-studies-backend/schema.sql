PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS patient_genes;
DROP TABLE IF EXISTS patient_diagnoses;
DROP TABLE IF EXISTS patients;

CREATE TABLE patients (
  patient_id VARCHAR(11) PRIMARY KEY CHECK (patient_id GLOB '[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state VARCHAR(2) NOT NULL CHECK (length(state) = 2),
  zip_code VARCHAR(5) NOT NULL CHECK (length(zip_code) = 5 AND zip_code NOT GLOB '*[^0-9]*'),
  phone VARCHAR(12) NOT NULL CHECK (phone GLOB '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]')
);

CREATE TABLE patient_diagnoses (
  patient_id VARCHAR(11) PRIMARY KEY CHECK (patient_id GLOB '[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  diagnosis TEXT NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

CREATE TABLE patient_genes (
  patient_id VARCHAR(11) NOT NULL CHECK (patient_id GLOB '[0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'),
  gene VARCHAR(3) NOT NULL CHECK (length(gene) = 3),
  PRIMARY KEY (patient_id, gene),
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- CREATE INDEX idx_patient_diagnoses_diagnosis
--   ON patient_diagnoses(diagnosis);

-- CREATE INDEX idx_patient_genes_patient_id
--   ON patient_genes(patient_id);

-- CREATE INDEX idx_patient_genes_gene
--   ON patient_genes(gene);
