from fastapi import APIRouter, HTTPException
from typing import List

from pydantic import BaseModel
from ..huggingface_inference import article_generator
from fastapi.responses import StreamingResponse


router = APIRouter(prefix="/ai_article", tags=["ai_article"])


class RequestBody(BaseModel):
    words: List[str]


def calculate_word_target(words: list[str]) -> int:
    words_per_provided_word = 20  # Each provided word generates approximately 20 words
    return len(words) * words_per_provided_word


@router.post("")
async def post_ai_article(req_body: RequestBody):
    """
    Endpoint to generate a comprehensive article based on provided words.

    Args:
        req_body (RequestBody): Contains a list of words for the article.

    Raises:
        HTTPException: If no words are provided in the request body.

    Returns:
        StreamingResponse: Streams the generated article text.
    """
    provided_word = req_body.words

    if not provided_word:
        raise HTTPException(status_code=400, detail="No words provided.")

    # Calculate the target word count based on the input
    # (20 words generated per provided word)
    target_word_count = calculate_word_target(provided_word)

    # Formulate the prompt for the AI model
    prompt = f"Write a comprehensive article using the following words: {', '.join(provided_word)}. \
        The article should be approximately {target_word_count} words long."

    # Generate and stream the text response
    stream = article_generator(prompt)
    return StreamingResponse(iter(stream), media_type="text/plain")
