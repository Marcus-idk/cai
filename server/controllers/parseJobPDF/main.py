import PyPDF2
import argparse
import json
import logging
from openai import OpenAI
clientOpenAI = OpenAI()

logger = logging.getLogger("PyPDF2")
logger.setLevel(logging.CRITICAL)
def extract_job_info(fields, job_suffix):
    suffix = '' if job_suffix == 1 else f' {job_suffix}'
    
    job_info = {
        'JobName': None,
        'JobDetails': fields.get(f'Project Details{suffix}', None),
        'IntendedLearningOutcomes': fields.get(f'Intended Learning Outcomes{suffix}', None),
        'PreferredSkillSet': fields.get(f'Preferred Skill Set{suffix}', None),
        'Slots': fields.get(f'Number of Interns{suffix}', None)
    }
    
    if not any(job_info.values()):
        return None
    return job_info

def extract_company_info(fields):
    company_info = {
        'CompanyName': fields.get('CompanyName', None),
        'Allowance': fields.get('Allowance', None)
    }
    return company_info

def generate_job_name(details, outcomes, skills):
    prompt = (
        "Generate a professional and realistic job title based on the provided details, learning outcomes, and skills. Please avoid creative or humorous titles and focus on titles that would be typically used in a professional setting. Nothing else, JUST the job title, keep it 1-3 words.\n"
        f"Details: {details}\n"
        f"Learning Outcomes: {outcomes}\n"
        f"Skills: {skills}\n"
        "Examples of job titles:\n"
        "- Linux Software Engineer\n"
        "- System Analyst\n"
        "NOTE: if any one of the details, learning outcomes or skills are empty, return None"
    )
    response = clientOpenAI.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def convertTagsToArray(tags_string):
    clean_string = tags_string.replace("Tags:", "").strip()
    if clean_string in ['General Coding', 'No Relevant Context']:
        return []
    tags_array = [tag.strip() for tag in clean_string.split(',')]
    return tags_array

def generate_job_tags(details, outcomes, skills):
    prompt = (
        "Your task is to analyze the following job listing and generate relevant tags, focusing strictly on identifying specific technologies, programming languages, or concrete skills mentioned. Avoid making assumptions or inferring skills not explicitly stated. Here are some guidelines for this analysis:\n\n"
        "1. Only include tags for technologies, programming languages, or skills that are explicitly mentioned in the job description.\n"
        "2. If the job description is too broad or lacks specific references to technologies or skills (like 'looking for a passionate developer'), tag as 'General Coding' or 'Too General'.\n"
        "3. Do not infer or assume additional contexts or skills not clearly stated in the job description.\n"
        "Analyze the following job listing and generate tags accordingly:\n"
        f"Details: {details}\n"
        f"Learning Outcomes: {outcomes}\n"
        f"Skills: {skills}\n"
        "\nExpected output format: 'Tags: tag1, tag2, tag3'. Separate tags with commas. If the job description is too general or lacks specific references, return 'General Coding' or 'No Relevant Context'."
    )
    response = clientOpenAI.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    res = response.choices[0].message.content
    return convertTagsToArray(res) 

def parseData(pdf_path):
    with open(pdf_path, 'rb'):
        reader = PyPDF2.PdfReader(pdf_path, strict=False)
        fields = reader.get_form_text_fields()

        data = {
            'company_info': extract_company_info(fields),
            'job_info': []
        }

        job_suffix = 1
        while True:
            job_info = extract_job_info(fields, job_suffix)
            if job_info is None:
                break
            job_name = generate_job_name(job_info['JobDetails'], job_info['IntendedLearningOutcomes'], job_info['PreferredSkillSet'])
            job_tags = generate_job_tags(job_info['JobDetails'], job_info['IntendedLearningOutcomes'], job_info['PreferredSkillSet'])
            job_info['JobName'] = job_name
            job_info['tags'] = job_tags if len(job_tags) > 0 else [job_name]
            data['job_info'].append(job_info)
            job_suffix += 1

        def has_job_name(job):
            return job["JobName"] != 'None'

        filtered_jobs = list(filter(has_job_name, data["job_info"]))
        data["job_info"] = filtered_jobs
        return data
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some PDFs.')
    parser.add_argument('pdf_path', type=str, help='The path to the PDF file to be processed')
    
    args = parser.parse_args()
    
    pdf_data = parseData(args.pdf_path)
    print(json.dumps(pdf_data))