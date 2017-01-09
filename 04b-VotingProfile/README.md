This folders contains some attempts at formatting and extracting the information from the voting fields. 


## 1. PartyAnalysis.ipynb

Using the data from the `voting\_with\_topics.csv` file we obtained with the NLP, we want to see whether we can extract some meaningful, useful information from it. We specifically try to study the deviation from the mean vote of a party, establishing whether someone's profile is close to the one of the party he's in. We do that by displaying the distance to the *average yes percentage* of a party for all the members of this party. We also try a few things using the topics, but those data are kind of biased due to the NLP process it went through. We hence cannot get reliable conclusions from it.

## 2. PersonAnalysis folder

Using the raw data from the `Vote` and `Voting` folders of `scrap`, we aggregate the information at different levels. First of all, we simply count for each person for each session what were his votes (yes/no/abstention/absent/excused/president) and prepare the data for the visualisation with d3.js (this is the most aggregated level we will use).

Secondly, we want to take the data for each deputee and export it, in order to get the results that each person gave to each vote (this is the most detailled view one can get for a person).

Finally, we will also group our data by votes, in order to follow how a full law was voted throughout the different chambers (N.B. At the moment, we haven't found a field that gave whether a law was accepted without going through the whole `Voting` file. If there are none, we should create a DataFrame which includes whether each law was accepted).


