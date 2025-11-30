<p align="center">
  <img src="https://img.shields.io/badge/SysSecura%20AI-AI%20Forensic%20Assistant-blueviolet?style=for-the-badge&logo=ai" />
</p>

<h1 align="center">🔐 SysSecura AI – Insider Threat Detection</h1>
<p align="center">AI-powered forensic assistant for internal threat detection and behavioral analysis.</p>
<p align="center">
  <img src="https://img.shields.io/badge/Machine%20Learning-Enabled-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/NLP-Active-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Streamlit-Dashboard-red?style=flat-square" />
  <img src="https://img.shields.io/badge/Python-3.10+-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" />
</p>


# SysSecura AI 🔐
AI-powered forensic assistant for detecting insider threats.

This project analyzes employee behavior, email communication, and activity patterns using Machine Learning & NLP to identify suspicious activities inside an organization.

---

## 🚀 Features
- Insider threat detection using ML models  
- Email text analysis using NLP  
- Psychometric behavior analysis  
- Simple dashboard for uploading data & viewing results  
- Explainable outputs (why a user/activity is flagged)

---

## 🛠️ Tech Used
- Python  
- Scikit-learn  
- TensorFlow (optional)  
- Pandas, NumPy  
- NLTK / spaCy  
- Streamlit (dashboard)  
- Flask (backend)

---

## 📂 How to Run
```bash
pip install -r requirements.txt
streamlit run app.py


App will start at:  
http://localhost:5000/

---

## 🟩 OPTION 2 — Run Streamlit Dashboard
pip install -r requirements.txt
streamlit run app.py


---

## 🟧 OPTION 3 — Run Using Docker (Full Deployment)
docker-compose up --build


This will:
- Build the Docker image  
- Run backend + frontend  
- Start Nginx automatically  

---

## 🟪 OPTION 4 — Run React Frontend (If needed)
cd frontend
npm install
npm run dev


Runs on:  
http://localhost:5173/

---

# 📂 Project Structure
AI-Powered-Forensic-Assistant/
│── app.py
│── requirements.txt
│── test_data/
│── models/
│── tfidf.pkl
│── Dockerfile
│── docker-compose.yml
│── nginx.conf
│── frontend/
│── utils/
│── README.md

---

##  Author
**Nandani Daga**

