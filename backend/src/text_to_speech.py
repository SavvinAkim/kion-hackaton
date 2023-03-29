import torch
import torchaudio
import sounddevice as sd
import time


def text_to_speech(text):
    lang = 'ru'
    model_id = 'ru_v3'
    sample_rate = 48000
    speaker = 'aidar'
    put_accent = True
    put_yo = True
    device = torch.device('cpu')
    model, _ = torch.hub.load(repo_or_dir='snakers4/silero-models',
                                     model='silero_tts',
                                     language=lang,
                                     speaker=model_id)

    model.to(device)  # gpu or cpu

    audio = model.apply_tts(text=text,
                        speaker=speaker,
                        sample_rate=sample_rate,
                        put_accent=put_accent,
                        put_yo=put_yo)

    torchaudio.save('buffer.wav',
                  audio.unsqueeze(0),
                  sample_rate=sample_rate)