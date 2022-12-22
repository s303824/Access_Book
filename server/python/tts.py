import pyttsx3
import sys

# get the text to convert
text = sys.argv[1]

# create a text-to-speech engine
engine = pyttsx3.init()
voices = engine.getProperty('voices')       #getting details of current voice
engine.setProperty('voice', voices[0].id)  #changing index, changes voices. o for male*

engine.save_to_file(text, './server/python/readaloud.mp3')
engine.runAndWait()
