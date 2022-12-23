import pyttsx3
import sys

# get the text to convert
text = sys.argv[1]

# create a text-to-speech engine
engine = pyttsx3.init()

engine.save_to_file(text, './python/readaloud.mp3')
engine.runAndWait()
