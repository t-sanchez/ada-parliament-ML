# 04 - Voting Profile
This folder aims at analysing the voting profiles of each people. The main goal is to detect the political parties from the votes.

## 1. TopicAnalysis.ipynb
We perform some analysis on votation based on topic modelling results, e.g. topic evolution over time as well as statistical tests to see whether some votations about some topics are more likely to be accepted than others.

## 2. PartyAnalysis.ipynb

Using the data from the `voting\_with\_topics.csv` file we obtained with the NLP, we want to see whether we can extract some meaningful, useful information from it. We specifically try to study the deviation from the mean vote of a party, establishing whether someone's profile is close to the one of the party he's in. We do that by displaying the distance to the *average yes percentage* of a party for all the members of this party. We also try a few things using the topics, but those data are kind of biased due to the NLP process it went through. We hence cannot get reliable conclusions from it.

## 3. PersonAnalysis folder
Using the raw data from the `Vote` and `Voting` folders of `scrap`, we aggregate the information at different levels. First of all, we simply count for each person for each session what were his votes (yes/no/abstention/absent/excused/president) and prepare the data for the visualisation with d3.js (this is the most aggregated level we will use).

Secondly, we want to take the data for each deputee and export it, in order to get the results that each person gave to each vote (this is the most detailled view one can get for a person).

Finally, we will also group our data by votes, in order to follow how a full law was voted throughout the different chambers (N.B. At the moment, we haven't found a field that gave whether a law was accepted without going through the whole `Voting` file. If there are none, we should create a DataFrame which includes whether each law was accepted).

## 4. Clustering folder
Using the data from `voting\_with\_topics.csv`, as well as the raw data, we perform some clustering on different levels:
1. Having the vote of each deputee, we find the 3 deputees which have the closest voting pattern to a given deputee. Then, in the viz folder, we will display the resulting network,
2. Having the vote of each deputee on a law, we find the closest laws to a given law by taking the ones which have been voted similarly by the deputees, and compare see how the topic influences on the vote.
