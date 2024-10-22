import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const aiTextGeneration = async (prompt: string) => {
  const result = await hf.textGeneration({
    model: 'mistralai/Mistral-7B-Instruct-v0.3',
    inputs: prompt,
    parameters: {
      top_k: 50,
      top_p: 0.95,
      temperature: 0.8,
      max_length: 4000,
      return_full_text: false,
      num_beams: 5,
      no_repeat_ngram_size: 2,
      max_new_tokens: 200
    }
  });

  return result;
};
