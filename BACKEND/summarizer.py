import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM
)

device = (
    "cuda"
    if torch.cuda.is_available()
    else "cpu"
)

model_name = "t5-small"

tokenizer = AutoTokenizer.from_pretrained(
    model_name
)

model = AutoModelForSeq2SeqLM.from_pretrained(
    model_name
).to(device)

def summarize_chunk(text_chunk):

    prompt = f"summarize: {text_chunk}"

    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        truncation=True,
        max_length=512
    ).to(device)

    summary_ids = model.generate(
        **inputs,
        max_new_tokens=80,
        num_beams=2,
        early_stopping=True
    )

    return tokenizer.decode(
        summary_ids[0],
        skip_special_tokens=True
    )