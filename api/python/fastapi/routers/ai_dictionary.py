# router.py

from fastapi import APIRouter
from pydantic import BaseModel
from ..huggingface_inference import generate_word_dictionary

router = APIRouter(prefix="/ai_dictionary", tags=["ai_dictionary"])


class WordContext(BaseModel):
    word: str
    context: str


@router.post("")
def post_ai_dictionary(word_context: WordContext):
    result = generate_word_dictionary(word_context.word, word_context.context)
    return result
