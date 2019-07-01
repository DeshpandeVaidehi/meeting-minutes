from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from textToSummary import generate_MoM
from speechToText import speech_sample
from emailService import emailHelper

app = Flask(__name__)
CORS(app, support_credentials=False)
notDemo = False;
summary = {};
to = "nehal.borole@gmail.com"
class Line:
    def __init__(self, name):
        self.text = name

    def serialize(self):
        return{
            'text': self.text,
        }

class Summary:
    def __init__(self, topic, desc):
        self.topic = topic
        self.desc = desc

    def serialize(self):
        return{
            'topic': self.topic,
            'desc': self.desc
        }

@app.route("/getTranscript")
@cross_origin(support_credentials=False)
def getTranscriptFunction():
    print("Im getting Transcript")
    with open("resources/converted_speech", 'r') as speech_file:
        sentences = speech_file.readlines()
    if notDemo:
        sentences = speech_sample.speech_recognize_continuous_from_file()
    return jsonify(results=[Line(sentence).serialize() for sentence in sentences])

@app.route("/getSummary")
@cross_origin(support_credentials=False)
def getSummaryFunction():
    print("Im getting summary")
    summary = generate_MoM.calculate_summary()
    return jsonify(results=[Summary(k, v).serialize() for k, v in summary.items()])


@app.route("/getMail")
@cross_origin(support_credentials=False)
def getMail():
    print("Im getting mail")
    summary = generate_MoM.calculate_summary()
    emailHelper.sendMail(summary["General Summary"], to)
    return "mail success"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1706)