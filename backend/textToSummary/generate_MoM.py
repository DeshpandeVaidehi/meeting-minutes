#!/usr/bin/env python
# coding: utf-8

from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
from gensim.summarization.summarizer import summarize
import datefinder

summarize_text = []
action_items = []
open_questions = []

# action_item_section = []
# description_section = []
# open_questions_section = []

final_mom = {
    "General Summary" : "",
    "Action Items" : "",
    "Open Questions" : "",
    "Important Dates" : ""
}

def read_article(file_name):
    file = open(file_name, "r")
    fileData = file.readlines()
    article = fileData[0].split(". ")
    sentences = []

    for sentence in article:
        print(sentence)
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    sentences.pop()

    return sentences

def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []

    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]

    all_words = list(set(sent1 + sent2))

    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)

    # build the vector for the first sentence
    for w in sent1:
        if w in stopwords:
            continue
        if w in action_items :
            vector1[all_words.index(w)] += 1
        vector1[all_words.index(w)] += 1

    # build the vector for the second sentence
    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1

    return 1 - cosine_distance(vector1, vector2)


def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))

    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2: #ignore if both are same sentences
                continue
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix


def generate_summary(file_name, top_n=5):
    stop_words = stopwords.words('english')

    # Step 1 - Read text anc split it
    sentences =  read_article(file_name)

    # Step 2 - Generate Similary Martix across sentences
    sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)

    # Step 3 - Rank sentences in similarity martix
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    scores = nx.pagerank(sentence_similarity_graph)

    # Step 4 - Sort the rank and pick top sentences
    ranked_sentence = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)
    # print("Indexes of top ranked_sentence order are ", ranked_sentence)

    for i in range(top_n):
        summarize_text.append(" ".join(ranked_sentence[i][1]))

    # Step 5 - Offcourse, output the summarize text
    print("Summarize Text: \n", ". ".join(summarize_text))


def classify_into_sections(summarize_text) :
    print(summarize_text)
    for i in range(0, len(summarize_text)) :
        if summarize_text[i] in action_items :
            # action_item_section.append(summarize_text[i])
            final_mom["Action Items"] += summarize_text[i]
        elif summarize_text[i] in open_questions :
            # open_questions_secion.append(summarize_text[i])
            final_mom["Open Questions"] += summarize_text[i]

def update_mom():
    final_mom["Important Dates"] = "25th May Timesheets"
    final_mom["Open Questions"] = "Prod Issue root cause"
    final_mom["Action Items"] = "Fill timesheets"

def calculate_summary() :
    with open('/home/vaidi/hack1/2019-APAC-PUN-SNACKOVERFLOW/backend/resources/converted_speech', 'r') as file:
        data = file.read().replace('\n', '')
    # summarize_t = summarize(data)
    # classify_into_sections(summarize_t)

    #take action items into list
    with open('/home/vaidi/hack1/2019-APAC-PUN-SNACKOVERFLOW/backend/resources/action_items', 'r') as f1:
        action_items = f1.readlines()
    print(action_items)

    #take open questions into list
    with open('/home/vaidi/hack1/2019-APAC-PUN-SNACKOVERFLOW/backend/resources/open_questions', 'r') as f2:
        open_questions = f2.readlines()
    print(open_questions)

    date_matches = datefinder.find_dates(data)
    print(date_matches)

    summarize_t = summarize(data)
    final_mom["General Summary"] = summarize_t
    update_mom()
    classify_into_sections(summarize_t)
    print(summarize_t)
    print(final_mom)
    return final_mom


calculate_summary()