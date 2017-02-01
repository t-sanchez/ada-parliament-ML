# Person Analysis

## 1. SplitDeputee.ipynb
Splits the voting DataFrame by each deputee and formats the data for a visualisation at two different levels:
1. Aggregated at a session level: We sum all the votes of the deputee (yes/no/abstention/excused/absent/president) during a session and plot a histogram using the record of his votes. This allows us to quickly check how often the deputee was present, and have a glimpse at the way he votes.
2. Not aggregated at all: in addition of recording the vote of the deputee on a bill, we also record how the rest of the deputees votes, and how his party voted. This allow us to quickly see whether the deputee voted like his party (i.e. like the majority of the party), what he votes, ... 

## 2. SplitVoteVoting.ipynb
Splits the Vote and Voting DataFrames by each bill and outputs 2 folders and one file. The output is found in the `datas/analysis` folder and has the following architecture:
1. `map\_bill\_id.csv`: Maps the name of a law to a unique ID.
2. `bill\_link` folder: For each of the IDs of each law, contains all the times it was voted, as well as the ID associated to the vote taken, in order to be able to retrieve the detailed vote.
3. `bill\_voting` folder: Contains the detailled vote for every law, indexed by the ID that is found in the `bill\_link` folder.

## 3. Dict_to_json.ipynb
Little file to dump some dicts containing links between the parties name in the files and the real ones, the meaning of the votes.
