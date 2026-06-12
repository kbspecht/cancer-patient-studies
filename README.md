# cancer-patient-studies

## Overview

The cancer patient studies app retrieves and displays data related to cancer patients. Its purpose is to allow clinicians to identify patients who may be a fit for their clinical studies, using their personal information along with their diagnoses and any relevant genes they may have.

## Requirements

The cancer patient studies app will function as follows:
- Shall load and organize patient information from a data folder
- Shall allow users to view data of a group of many patients at the same time
- Shall allow users to view data of a single patient exclusively
- Shall allow users to filter patients based on first name, last name, state, cancer diagnosis, and genes

## Run Instructions

In order to use the cancer patient studies app, you need to run both the React Vite front end and the Flask back end. To run the back end, open a terminal and go into the cancer-patient-studies-backend directory. You need to first set up the database by running the 'flask init-db' command, then load the sample data into the database by running the 'flask load-csv' command. Then, you can run the back end by simply using the 'flask run' command. Note that the front end is configured to access the back end at the port http://127.0.0.1:5000, so make sure that the back end is running at that port (it should be the default).

Once the back end is running, the front end should be able to request data from it successfully, so you can safely run it now. To run the front end, open another terminal and go into the cancer-patient-studies-ui directory, then just run the command 'npm run dev'. Note that the back end is configured to allow access to the front end at the port http://localhost:5173, so make sure that the front end is running at that port (it should be the default).
