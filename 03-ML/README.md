# 03 - Machine Learning 
Starting from the data we processed with the NLP, we have access to a dataset with the following fields :
- k-entries corresponding to the probability for a *Voting* topic to belong to any of k topics.
- the *FirstName* and the *LastName* of the person who voted. *N.B.* At the moment, we did not save the political party to which they belong.

We want to predict the *Decision* taken by the person : 

|**1** | **2** | **3**      |  **5**               | **6**   |                **7**                      |
|------|-------|------------|----------------------|---------|-------------------------------------------|
| Yes  | No    | Abstention | Did not participate  | Excused | The president of the session does not vote|


These are all the options possible, we will restrain ourselves to predicting the cases **1**, **2** and **3** (first, we consider only two classes, the **yes** and the **no** cases)

The question we have to tackle now is the algorithm that would be best suited for this problem. What we want to do is, given the probability to belong of a topic of a vote, we want to predict what each person/party will vote. We will train our algorithm on each of the deputee to see, given a combination of probabilities of each topic, what he will predict. This does not work very well, as the combination of the topic modelling and sentiment analysis is really inaccurate, and does not allow for a good training on the data at all, which will make the prediction task impossible. Note that the classifier acts totally like a "dumb" classifier, putting everything into the class which has the highest number of members.

As the data themselves are very inaccurate, even aggregating the votes at a party level would probably not make a large change in the accuracy of prediction, even if it reduces the variance that a single individual would have.

The file `01-ML.ipynb` implements the full prediction pipeline for one deputee, following the exercise 4 that we did during the course. We load the DataFrame, format it, then extract one deputee and see whether we're successfully able to predict the outcome of his voting from the topics we're given. 


