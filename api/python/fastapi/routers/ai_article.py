from fastapi import APIRouter, HTTPException
from typing import List

from pydantic import BaseModel
from ..model import article_generator
from fastapi.responses import StreamingResponse


router = APIRouter(prefix="/ai_article", tags=["ai_article"])


class RequestBody(BaseModel):
    words: List[str]


def calculate_word_target(words: list[str]) -> int:
    words_per_input_word = 20  # Each input word generates approximately 20 words
    return len(words) * words_per_input_word


@router.post("")
async def post_ai_article(req_body: RequestBody):
    words = req_body.words

    if not words:
        raise HTTPException(status_code=400, detail="No words provided.")

    # Calculate the target word count based on the input (20 words per word)
    target_word_count = calculate_word_target(words)

    # Formulate the prompt for the AI
    prompt = f"Write a comprehensive article using the following words: {', '.join(words)}. \
        The article should be approximately {target_word_count} words long."

    # Generate and stream the text response
    stream = article_generator(prompt)
    return StreamingResponse(iter(stream), media_type="text/plain")
