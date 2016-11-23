# 02 - Natural Language Processing (NLP)

In this step, we train our NLP model on the *Transcript* data, and try to find as accurately as possible the topics that are treated in the parliament (we will need to determine by hand, from the bag of words, whether every topic make sense). We also need to vary the number of topics from one test to another, to find the optimal number of topics that we would need to get a meaningful result for each of the objects that are voted. The only file here `01-nlp_Gensim`.

## 01 - NLP with Gensim
This file performs what we have described above, using to achieve it the [Gensim](https://radimrehurek.com/gensim/) library. We perform several preprocessing of the data in order to achieve accurate results. Some necessary steps are to exclude the most common words, which would not help determining the subject which is discussed. This includes the vocabulary specific to the parliament that brings nothing, like *Conseil fédéral*, ... This is some kind of iterative process, where we remove the meaningless words from the bag of words we obtain after having applied the algorithm. The results, as we just said, is a bag of words which describes a subject according to the algorithm (i.e. those words appear often together).

Note that at the moment, the NLP is only done in French, and we will apply the same approach for German later on, and see whether we can combine both to obtain a much higher accuracy.
