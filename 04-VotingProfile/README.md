#04 - Voting Profile
This folder aims at analysing the voting profiles of each people. The main goal is to detect the political parties from the votes.

## 1. TopicAnalysis.ipynb
We perform some analysis on votation based on topic modelling results, e.g. topic evolution over time as well as statistical tests to see whether some votations about some topics are more likely to be accepted than others.

## 2. DistanceComputationPeople.ipynb
The aim of this notebook is to compute the voting profiles for each person, ie analyze what each person in the parliament voted for each votation. Then we investigate the voting similarities between each person by representing people by vectors based on their votes, and model vote similarities by distances between their corresponding vectors, We finally obtain and save a distance matrix containing all distances between each people.

## 3. DistanceComputationSunjects.ipynb
This notebook performs the same task as `DistanceComputation.ipynb` but for the topics, i.e. it computes the distance matrix for each votation subjects based on the topic modelling results.

## 4. Clustering.ipynb
We finally try to apply an unsupervised learning algorithm to the votation profiles of every people in order to detect clusters, and observe whether they match with the political partites. To do so, we first create a network with people as nodes, and connect each node to their $k$ (e.g 3) nearest neighbours based on the matrix distance computed previously. The ML algorithm is a spectral clustering algorithm which uses the adjacency matrix of this network.

## 5. PartyAnalysis.ipynb

Using the data from the `voting\_with\_topics.csv` file we obtained with the NLP, we want to see whether we can extract some meaningful, useful information from it. We specifically try to study the deviation from the mean vote of a party, establishing whether someone's profile is close to the one of the party he's in. We do that by displaying the distance to the *average yes percentage* of a party for all the members of this party. We also try a few things using the topics, but those data are kind of biased due to the NLP process it went through. We hence cannot get reliable conclusions from it.

## 6. PersonAnalysis folder

Using the raw data from the `Vote` and `Voting` folders of `scrap`, we aggregate the information at different levels. First of all, we simply count for each person for each session what were his votes (yes/no/abstention/absent/excused/president) and prepare the data for the visualisation with d3.js (this is the most aggregated level we will use).

Secondly, we want to take the data for each deputee and export it, in order to get the results that each person gave to each vote (this is the most detailled view one can get for a person).

Finally, we will also group our data by votes, in order to follow how a full law was voted throughout the different chambers (N.B. At the moment, we haven't found a field that gave whether a law was accepted without going through the whole `Voting` file. If there are none, we should create a DataFrame which includes whether each law was accepted).


