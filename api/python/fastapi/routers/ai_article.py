from fastapi import APIRouter
from typing import List

from pydantic import BaseModel
from ..model import article_generator
from fastapi.responses import StreamingResponse


router = APIRouter(prefix="/ai_article", tags=["ai_article"])


class RequestBody(BaseModel):
    words: List[str]


@router.post("")
def post_ai_article(req_body: RequestBody):
    return StreamingResponse(article_generator(req_body.words), media_type="text/event-stream")
