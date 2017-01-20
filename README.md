# Swiss Parliament Voting Visualisation
## Applied Data Analysis Project 
`ada-parliament-ML` is the repository for the Applied Data Analysis course (ADA - CS 401) from EPFL, for the team composed with *Martin Barry*, *Paul Rolland* and *Thomas Sanchez*. This specifically contains everything related to the team project that has to be carried on.

## Abstract
The motivation of this project is to use the free information of the [Swiss parliament](https://www.parlament.ch/en/services/freedom-of-information-act), that are available from the *Freedom of Information Act* :

> The Freedom of Information Act came into force on 1 July 2006. It is intended to promote transparency with regard to the 
> purpose, organisation and activities of the federal administration, while guaranteeing access to official documents produced 
> after 1 July 2006. 

We will try to model the topics that are discussed at the Parilament, but more specifically will try to establish a voting profile of each political party, trying to *predict their votes* on a new subject that would be submitted to then. Moreover, we attempt at creating a simple and interactive *visualisation* of the votes that take place at the parliament, mainly following two approaches:
- Consider a single law, and see how all the deputies voted on it.
- Consider a single deputee, and see how he voted on the laws.

## Data description
The textual form of the data we will use is available [here](https://www.parlament.ch/en/ratsbetrieb/suche-amtliches-bulletin): it contains all the bulletins of the Swiss parliament. However, we got access to an API to make the scraping easier, the metadata are available on [this page](https://ws.parlament.ch/odata.svc/$metadata).

There are different data files at our disposal, and we list below some important fields that are contained in those, so the reader can get an idea on the quantity of available data (Note that this list is not exhaustive).
### About each of the deputies voting:
| Contains        | Field Name                      |
|-----------------|---------------------------------|
| ID              | `ID`                            |
| Name            | `FirstName`, `LastName`         |
| Canton          | `Canton`, `CantonID`            |
| Political Party | `ParlGroupCode`, `ParlGroupName`|

### About the votes:
| Contains                               | Field Name                        |
|----------------------------------------|-----------------------------------|
| Law (Bill)                             | `BillTitle`                       |
| Business (Subject Treated)             | `BusinessTitle`, `BusinessNumber` |
| Aspect of the law on which the vote is | `Subject`                         |
| Meaning of the 'Yes'/'No' vote         | `MeaningYes`, `MeaningNo`         |
| Decision of the deputee                | `Decision`, `DecisionText`        |
| Time at which the vote ended           | `VoteEnd`                         |


### About the discussion around the vote (from the transcripts):
| Contains                               | Field Name          |
|----------------------------------------|---------------------|
| Name of the speaker                    | `SpeakerFullName`   |
| Language in which he spoke             | `LanguageOfText`    |
| Time at which he spoke                 | `Start`             |
| Content of what he said                | `Text`              |
| Vote to which it is related            | `VoteId`            |

## Feasibility and Risks
### Data scraping
Te most publicly available data on the Swiss Parliament website were presented in a PDF format, which makes it harder to process (one such example can be found on [this page](https://www.parlament.ch/en/ratsbetrieb/amtliches-bulletin/amtliches-bulletin-die-verhandlungen?SubjectId=38398)). We then contacted the Swiss Parliament and a certain Daniel Schweizer provided us with the metadata file, which enabled us to get access to the informations we needed. Then, using the online tool [XOData](http://pragmatiqa.com/xodata/#) from PragmatiQa, we are able to find the structure of the requests, in order to write a python script that parses and formats the relevant fields, and then stores them into csv files.

This step is more exhaustively described in the `01-Scraping` folder, which contains everything related to the scraping of the Parliament website.

### Voting prediction
The first aim of our project was to see whether making a voting prediction from the discussions that happen in the chambers (the transcripts) and the previous votes of each deputee was possible. We arrived to the conclusion that our simplistic approach was not sufficient to accurately predict what a deputee would most likely vote on a future law. We will detail further the approach we took to try solving this problem and why it did not work very well. 


### Visualisation of the votes
The part of of the project on the voting prediction being very inconclusive, that is why we shifted towards a visualisation of the votes that happen in the chambers. Indeed, this is very feasible from the data we have, and the only visualisation that we found online relating to the visualisation of the votes on the national council, called *[Qui a voté comment au conseil national](https://www.parlament.ch/fr/ratsbetrieb/abstimmungen/qui-a-vot-comment-au-conseil-national)* (In English : *Who voted how at the National Council*), is very complete but does not allow for a quick visualisation of all the available data on a deputee.

The main challenge here is to provide a visualisation which is simple to understand, while not relying on too many of our assumptions or computations, as each of those introduce a bias due to our understanding of politics. This is why we must present the rawest data possible, while still making them useful to the people who have more expertise in political sciences, and hence the visualisation must represent the data as faithfully as possible.

### License
The License of the data is available [here](https://www.parlament.ch/en/services/open-data-webservices). We can use it under some sensible restrictions (not alter it, indicate the date of the download, ...). 

## Description of the results
### Data scraping
Described more exhaustively in the the `01-Scraping` folder, this first fundamental step retrieves all the needed data from the Parliament website, formats it into `.csv` files and saves them into the `datas` folder. This step allows already for some preprocessing of the data, by focusing on the fields that are most relevant to our analysis. As the quantity of data available is quite large and goes on a wide range of topics, simply scraping everything would be complicated and yield to a lot of useless data.


### Topic modelling
After having scraped the data we needed from the Parliament website, we will focus on our primary task: establishing the thematic of each discussion that happens at the parliament and of each vote that taken. It would be too simple to have a clear *topic* attribute in the data, so we will need to use *Natural Language Processing* tools to attempt at making a clear topic modelling. We will train our model on the `Text` field of the transcripts, which contains all the discussion that take place in the chambers. This is done through the [Gensim](https://radimrehurek.com/gensim/index.html) library, which is using the [Latent Dirichlet Allocation (LDA) model](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation). 

Moreover, after having successfully extracted the topic from the vote, we need to format our data into a usable dataset that we will use with a machine learning algorithm. Using our trained model, we will associate each `BillTitle` with its closest topics: there will be a percentage associated to each topic that we have found in the first part, and the law should be talking about the topics in which it has the highest percentage. This quantifies the strings into numbers, which make the data usable into a machine learning algorithm

This work is done in the `02-NLP` folder. 

### Sentiment Analysis
But the *Topic Modelling* part is not sufficient to accurately predict the outcome of the vote. Indeed, we will need to know the *polarity* of the law, i.e. whether an article about immigration would encourage it, or if it aims a restraining immigration. This polarity ranges between -1 and +1 (-1 meaning a very negative text, +1 a very positive one). This process is called *Sentiment Analysis*, and allows us to extract even more information from the small text of law that we are given. Ideally, the outcome of this section would allow us to find whether a law is against, or for a given topic. What we did is described in the `02.5-Sentiment` folder. 

### Machine Learning
Having the results from both Topic Modelling and Sentiment Analysis, we perform a Machine Learning task, trying to predict what a certain deputee will vote on a given topic, using the informations we previously obtained. The few trials we did with different approaches, detailed in the `03-ML` were quite inconclusive, and we hence shifted to another task: simply establishing a voting profile, which is more of a Data Analysis task, instead of predicting the future votes. Moreover, we created a visualisation of those voting profiles, allowing us to see quickly how a deputee votes.

The fact that this part was quite unsuccessful can be explained because of the intrinsic complexity of the computations that a text of law must go through to become a usable data for a machine learning task. Indeed, first, we need to correctly extract his topic, which is an unsupervised learning task: we set the number of topics that there should be, the algorithm outputs some clusters, and we name the topic from the words contained in the clusters. This is already a first layer which depends on our interpretation of the results. Secondly, the sentiment analysis has to accurately model whether a text is for or against a given topic. Otherwise, even having the topic available, the prediction would become random, as there should be no correlation between a topic and the vote that is made by someone. As we weren't able to correctly extract the informations from each of the Bills, we weren't either able to predict the outcomes of the votes on other laws, as the modelling we made of the text of law was not sufficiently good.

### Voting profile
Moving away from Machine Learning, we performed some Exploratory Data Analysis, trying to extract useful information from the *Voting* results, along with the Topic we modelled, as we found them to be quite accurate in themselves (only the combination between topics and polarity was really inconclusive). This step is described in the `04-VotingProfile` folder. Using the most useful facts we find from analysing the data, we found the data we would like to visualise, which will be the topic of the next section.

The idea we want to follow is going from a very general overview of the profile of a person towards how he votes at the Parliament, in a useful and clear manner. This requires first to format the data in a good way, and then, developping visualisation tools. This visualisation will show, not exhaustively:
- How the deputee voted at each vote.
- Whether he voted the same way his party did.
- How often is he present/absent.

The second main point of view would be to establish a visualisation for how a law was voted throughout time, the different modifications it underwent, the shifts between the chambers, ... This is also done in the same folder.

### Visualization
Using the d3.js framework, we work on visualising our Data. The details are in the `05-Viz` folder.

## Deliverables
The final result will take the form of an online website presenting different interactive visualisations of the results we obtain. The website will mostly be developped by [this team](https://github.com/jmuth/parliament-viz.ch) (Joachim Muth, Gael Lederrey and Jonas Racine), and we will provide them with more processed data. 
## Timeplan
- **November 6th, 2016:** Start of the project -> *done*
- **November 13th, 2016:** Data scraping and parsing of a first usable dataset -> *done*
- **December 4th, 2016:** Extraction of the topic of the objects, determining if it is positive or not; machine learning -> *done, machine learning inconclusive*
- **December 18th, 2016:** Voting profile of each party/deputee -> *done*
- **Mid-December 2016:** Checkpoint -> *done*
- **[ADDED]** Visualisation of the voting profile of each deputee, as well as each law
- **[ADDED]** Interactive and interesting way of visualising the connections between the member of the parliament and the laws (using some of the NLP we previously did).
- **[ADDED]** Aggregation at a *Session* rate of the votes of one deputee, to get an overall visualisation of how he voted over time. 
- **January 23st, 2017:** Extension of the database and visualisation of the voting profile of each deputee.
- **January 31th, 2017:** Final deadline
