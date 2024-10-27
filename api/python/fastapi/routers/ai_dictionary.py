from huggingface_hub import InferenceClient
import os
from fastapi import APIRouter
from pydantic import BaseModel

# Load the Mistral model and tokenizer from Hugging Face
token = os.getenv('HUGGINGFACE_TOKEN')
model_name = "mistralai/Mistral-7B-Instruct-v0.3"
client = InferenceClient(model_name, token=token)

response_format = {
    "type": "json",
    "value": {
        "properties": {
            "definition": {"type": "string"},
            "part_of_speech": {"type": "string"},
            "example": {"type": "string"},
        },
        "required": ["definition", "part_of_speech", "example"],
    },
}


def generate_word_dictionary(word, context):
    messages = [
        {
            "role": "user",
            "content": f'Given the word "{word}" and the context: "{context}". \
                What is the word definition, part of speech? Give example using this word.',
        },
    ]

    response = client.chat.completions.create(
        model=model_name,
        messages=messages,
        response_format=response_format,
        max_tokens=8000
    )

    return response.choices[0].message.content


router = APIRouter(prefix="/ai_dictionary", tags=["ai_dictionary"])


class WordContext(BaseModel):
    word: str
    context: str


@router.post("")
def generate_ai_dictionary(word_context: WordContext):
    result = generate_word_dictionary(word_context.word, word_context.context)
    return result
