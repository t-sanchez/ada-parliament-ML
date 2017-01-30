# Clustering

## 1. DistanceComputationPeople.ipynb
The aim of this notebook is to compute the voting profiles for each person, ie analyze what each person in the parliament voted for each votation. Then we investigate the voting similarities between each person by representing people by vectors based on their votes, and model vote similarities by distances between their corresponding vectors, We finally obtain and save a distance matrix containing all distances between each people.

## 2. DistanceComputationSubjects.ipynb
This notebook performs the same task as `DistanceComputation.ipynb` but for the topics, i.e. it computes the distance matrix for each votation subjects based on the topic modelling results.

## 3. Clustering.ipynb
We finally try to apply an unsupervised learning algorithm to the votation profiles of every people in order to detect clusters, and observe whether they match with the political partites. To do so, we first create a network with people as nodes, and connect each node to their $k$ (e.g 3) nearest neighbours based on the matrix distance computed previously. The ML algorithm is a spectral clustering algorithm which uses the adjacency matrix of this network.

## 4. Votation Analysis.ipynb
Computes how a deputee voted on each of the topics, to see if we can extract some correlation.

## 5. Link Maker.ipynb
Having the distance Matrix between the deputees, we compute which deputees are the closest, and explicit the edges between a deputee and his 3 closest neighbours. We format the result in order to make it practical for a visualisation using *d3.js*.
