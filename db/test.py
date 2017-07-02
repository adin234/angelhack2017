from nltk.corpus import wordnet as wn
dog = wn.synset('pork.n.01')
cat = wn.synset('porkchop.n.01')

print(dog.path_similarity(cat))