from unittest.mock import patch
from fastapi.testclient import TestClient

from api.python.fastapi.index import app
from api.python.fastapi.routers.ai_article import calculate_word_target

client = TestClient(app)


def test_calculate_word_target():
    """Test the word count calculation function"""
    # Test with empty list
    assert calculate_word_target([]) == 0

    # Test with a single word
    assert calculate_word_target(["AI"]) == 20

    # Test with multiple words
    assert calculate_word_target(["AI", "healthcare", "innovation"]) == 60


@patch("api.python.fastapi.routers.ai_article.article_generator")
def test_post_ai_article_valid(mock_article_generator):
    """Test successful article generation with valid input"""
    # Mock the article generator function to return a predetermined response
    mock_article_generator.return_value = [
        "Generated article content based on the prompt."]

    request_data = {
        "words": ["AI", "healthcare", "innovation"]
    }

    response = client.post("/ai_article", json=request_data)

    assert response.status_code == 200
    assert response.headers["content-type"] == "text/plain; charset=utf-8"
    assert response.text == "Generated article content based on the prompt."

    expected_prompt = "Write a comprehensive article using the following words: AI, healthcare, innovation. \
        The article should be approximately 60 words long."
    mock_article_generator.assert_called_once_with(expected_prompt)


def test_post_ai_article_empty_words():
    """Test error handling when no words are provided"""
    request_data = {
        "words": []
    }

    response = client.post("/ai_article", json=request_data)

    assert response.status_code == 400
    assert response.json() == {"detail": "No words provided."}


@patch("api.python.fastapi.routers.ai_article.article_generator")
def test_post_ai_article_streaming(mock_article_generator):
    """Test that the endpoint correctly streams the response"""
    def mock_stream():
        yield "Part 1 of the article. "
        yield "Part 2 of the article. "
        yield "Part 3 of the article."

    mock_article_generator.return_value = mock_stream()

    request_data = {
        "words": ["technology"]
    }

    response = client.post("/ai_article", json=request_data)

    assert response.status_code == 200
    assert response.headers["content-type"] == "text/plain; charset=utf-8"
    assert response.text == "Part 1 of the article. Part 2 of the article. Part 3 of the article."
