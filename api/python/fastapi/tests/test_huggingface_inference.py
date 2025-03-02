from unittest.mock import MagicMock

import pytest
from api.python.fastapi.huggingface_inference import generate_word_dictionary, article_generator


@pytest.fixture(autouse=True)
def mock_inference_client(mocker):
    mock_client = mocker.patch(
        'api.python.fastapi.huggingface_inference.InferenceClient')

    # Mock the chat completion method
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content="This is a mocked response.\n"))]
    mock_client.return_value.chat.completions.create.return_value = mock_response

    return mock_client


def test_generate_word_dictionary(mock_inference_client):
    word = "example"
    context = "This is a test context."

    result = generate_word_dictionary(word, context)

    # Check that the mocked response content is returned
    assert result == "This is a mocked response.\n"
    mock_inference_client.return_value.chat.completions.create.assert_called_once()


def test_article_generator(mock_inference_client):
    prompt = "Write an article about AI."

    result = list(article_generator(prompt))

    # Check that the mocked response is split into words and newlines
    assert result == ['This ', 'is ', 'a ', 'mocked ', 'response. ', '\n']
    mock_inference_client.return_value.chat.completions.create.assert_called_once()
