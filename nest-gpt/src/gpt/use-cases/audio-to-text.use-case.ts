import OpenAI from 'openai';
import * as fs from 'fs';

interface Options {
  prompt: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, audioFile } = options;

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt, // Should be the same language as the audio
    language: 'es',
    response_format: 'text',
  });

  return response;
};