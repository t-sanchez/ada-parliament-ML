# 03 - Machine Learning 
Starting from the data we processed with the NLP, we have access to a dataset with the following fields :
- k-entries corresponding to the probability for a *Voting* topic to belong to any of k topics.
- the *FirstName* and the *LastName* of the person who voted. *N.B.* At the moment, we did not save the political party to which they belong.

We want to predict the *Decision* taken by the person : 

|**1** | **2** | **3**      | **4**   | **5**               |                **7**                      |
|------|-------|------------|---------|---------------------|-------------------------------------------|
| Yes  | No    | Abstention | Excused | Did not participate | The president of the session does not vote|


These are all the options possible, we will restrain ourselves to predicting the cases **1**, **2** and **3**.

The question we have to tackle now is the algorithm that would be best suited for this problem. What we want to do is, given the probability to belong of a topic of a vote, we want to predict what each person/party will vote. We will train our algorithm on each of the deputee to see, given a combination of probabilities of each topic, what he will predict. This might not work very well, due to the fact of considering only one user and also due to the fact that even if we know that a votation is talking about a topic, it might be in a *positive* or *negative* fashion, which we could try to determine.

We could also try to train a person on what he voted, and in a minor way, what his party voted.
