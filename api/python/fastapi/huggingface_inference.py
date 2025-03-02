import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv('.env')

hf_token = os.getenv('HUGGINGFACE_TOKEN')
model_name = "mistralai/Mistral-7B-Instruct-v0.3"


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
        model=model_name,
        messages=messages,
        response_format=response_format,
        max_tokens=8000
    )

    return response.choices[0].message.content


def article_generator(prompt: str):
    print(f"Prompt: {prompt}")

    messages = [
        {
            "role": "user",
            "content": prompt,
        },
    ]

    client = InferenceClient(token=hf_token)

    response = client.chat.completions.create(
        model=model_name,
        messages=messages,
    )

    print(f"Response: {response.choices[0].message.content}")

    article = response.choices[0].message.content

    # Split by lines and preserve the newlines
    for line in article.splitlines():
        # Yield each word in the line
        for word in line.split():
            yield word + " "

        # Yield a new line after each line of text
        yield "\n"
