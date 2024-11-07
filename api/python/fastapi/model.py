import json
from langchain_nvidia_ai_endpoints import ChatNVIDIA
import os
from typing import List
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load the environment variables from .env.local
load_dotenv('.env.local')

hf_token = os.getenv('HUGGINGFACE_TOKEN')
nvidia_token = os.getenv('NVIDIA_API_KEY')


def generate_word_dictionary(word, context):
    messages = [
        {
            "role": "user",
            "content": f'Given the word "{word}" and the context: "{context}". \
                What is the word definition, part of speech? Give example using this word.',
        },
    ]

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

    client = InferenceClient(token=hf_token)

    response = client.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.3",
        messages=messages,
        response_format=response_format,
        max_tokens=8000
    )

    return response.choices[0].message.content


def article_generator(includingWords: List[str]):
    print('Hello', nvidia_token)
    client = ChatNVIDIA(
        model="mistralai/mistral-7b-instruct-v0.3",
        api_key=nvidia_token,
    )

    messages = [{"role": "user", "content": f"Write an article using words: \
            {json.dumps(includingWords)}"}]

    for chunk in client.stream(messages):
        print(chunk.content, end="")
        yield chunk.content
