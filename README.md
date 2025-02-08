# Resume Scanner

A web application that extracts and analyzes resumes to match skills with job descriptions using Flask and NLP libraries.

## Description

The Resume Scanner application allows users to upload a resume (in PDF or DOCX format) and a job description. It extracts relevant information from the resume, such as name, email, phone number, and skills, and provides an analysis of how well the resume matches the job description. It utilizes the `spacy`, `pdfplumber`, and `docx2txt` libraries for text extraction and processing.

## Features

- Extracts text from resumes in PDF and DOCX formats.
- Analyzes and extracts basic information (name, email, phone).
- Identifies skills from the resume and compares them with job description skills.
- Provides a match score indicating the fit between the resume and the job description.
- User-friendly web interface built with Flask.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/resume-scanner.git
   cd resume-scanner
   ```

2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Run the application:

   ```bash
   python app.py
   ```

2. Open your web browser and go to `http://127.0.0.1:5000/`.

3. Upload a resume file and enter the job description in the input field, then submit the form to see the extracted information and match analysis.

## Dependencies

- Flask
- spacy
- pdfplumber
- docx2txt
- nltk

Make sure to install the required dependencies listed in `requirements.txt`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Flask](https://flask.palletsprojects.com/) - The web framework used.
- [spaCy](https://spacy.io/) - For natural language processing.
- [pdfplumber](https://github.com/jsvine/pdfplumber) - For extracting text from PDF files.
- [docx2txt](https://github.com/ankushs/dox2txt) - For extracting text from DOCX files.
- [nltk](https://www.nltk.org/) - For natural language processing tasks.
