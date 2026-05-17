from fastapi import FastAPI

from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

import joblib

import re

import string



# =========================
# FASTAPI INIT
# =========================

app = FastAPI(
    title="AI Ticket System API"
)



# =========================
# CORS
# =========================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



# =========================
# LOAD MODELS
# =========================

intent_model = joblib.load(
    "models/intent_classifier.pkl"
)

label_encoder = joblib.load(
    "models/label_encoder.pkl"
)

priority_model = joblib.load(
    "models/priority_classifier.pkl"
)

priority_encoder = joblib.load(
    "models/priority_encoder.pkl"
)



# =========================
# REQUEST SCHEMA
# =========================

class TicketRequest(BaseModel):

    text: str



# =========================
# CLEAN FUNCTION
# =========================

def clean_text(text):

    text = str(text)

    text = text.lower()

    text = re.sub(r'\S+@\S+', '', text)

    text = re.sub(r'http\S+', '', text)

    text = text.translate(

        str.maketrans('', '', string.punctuation)
    )

    text = re.sub(r'\s+', ' ', text).strip()

    return text



# =========================
# HOME ROUTE
# =========================

@app.get("/")

def home():

    return {

        "message":

        "AI Ticket System API Running"
    }



# =========================
# PREDICT ROUTE
# =========================

@app.post("/predict")

def predict(ticket: TicketRequest):


    # =====================
    # CLEAN TEXT
    # =====================

    cleaned = clean_text(
        ticket.text
    )



    # =====================
    # INTENT PREDICTION
    # =====================

    intent_pred = intent_model.predict(
        [cleaned]
    )[0]



    intent_label = (

        label_encoder.inverse_transform(
            [intent_pred]
        )[0]
    )



    # =====================
    # PRIORITY INPUT
    # =====================

    priority_input = (
        intent_label + " " + cleaned
    )



    # =====================
    # PRIORITY PREDICTION
    # =====================

    priority_pred = priority_model.predict(
        [priority_input]
    )[0]



    priority_label = (

        priority_encoder.inverse_transform(
            [priority_pred]
        )[0]
    )



    # =====================
    # RESPONSE
    # =====================

    return {

        "ticket": ticket.text,

        "intent": intent_label,

        "priority": priority_label
    }