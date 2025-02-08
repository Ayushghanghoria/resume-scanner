import spacy
import pdfplumber
import docx2txt
import re
import csv
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")

nlp = spacy.load("en_core_web_sm")

# Load a skills database
SKILLS_DB = set()
with open("skills.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        SKILLS_DB.update(row)

# Extract text from PDF or DOCX
def extract_text(file_path):
    if file_path.endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            print([page.extract_text() for page in pdf.pages if page.extract_text()])
            return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    elif file_path.endswith(".docx"):
        return docx2txt.process(file_path)
    return ""

# Extract name, email, and phone
def extract_basic_info(text):
    extracted_data = {"Name": "", "Email": "", "Phone": ""}

    email_match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    if email_match:
        extracted_data["Email"] = email_match.group(0)

    phone_match = re.search(r"\+?\d{10,15}", text)
    if phone_match:
        extracted_data["Phone"] = phone_match.group(0)

    doc = nlp(text)
    name_candidates = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    if name_candidates:
        extracted_data["Name"] = name_candidates[0] 

    return extracted_data

# Extract skills
def extract_skills(text):
    words = set(text.lower().split())
    extracted_skills = [skill for skill in SKILLS_DB if skill.lower() in words]
    return extracted_skills

# Compare resume skills with job description
def analyze_match(resume_skills, job_description):
    job_skills = extract_skills(job_description)

    matched_skills = list(set(resume_skills) & set(job_skills))
    missing_skills = list(set(job_skills) - set(resume_skills))

    match_score = round((len(matched_skills) / max(len(job_skills), 1)) * 100, 2)  # Avoid division by zero

    return {
        "Job Skills": job_skills,
        "Matched Skills": matched_skills,
        "Missing Skills": missing_skills,
        "Match Score": f"{match_score}%",
    }

# Process resume and analyze job fit
def process_resume(file_path, job_description):
    text = extract_text(file_path).lower()
    basic_info = extract_basic_info(text)
    resume_skills = extract_skills(text)
    match_analysis = analyze_match(resume_skills, job_description.lower())

    return {**basic_info, "Resume Skills": resume_skills, **match_analysis}
