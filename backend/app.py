from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from resume_parser import process_resume
from utils import match_resume_to_job

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400

    resume = request.files["resume"]
    job_description = request.form.get("job_description", "")

    if resume.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)
    resume.save(file_path)

    result = process_resume(file_path, job_description)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
