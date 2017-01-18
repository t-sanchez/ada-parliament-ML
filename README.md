# ada-parliament-ML
(ADA - CS 401)

## Abstract
The motivation of this project is to use the free information of the [Swiss parliament](https://www.parlament.ch/en/services/freedom-of-information-act), that are available from the *Freedom of Information Act* :

> The Freedom of Information Act came into force on 1 July 2006. It is intended to promote transparency with regard to the 
> purpose, organisation and activities of the federal administration, while guaranteeing access to official documents produced 
> after 1 July 2006. 

We will try to model the topics that are discussed at the Parilament, but more specifically will try to establish a voting profile of each political party, trying to *predict their votes* on a new subject that would be submitted to then. Moreover, we attempt at creating a simple and interactive visualisation of the votes that take place at the parliament, having *visualisation* about :
- A single law and how the deputies voted on it.
- A single deputee and how he voted on the laws.

## Data description
The textual form of the data we will use is available [here](https://www.parlament.ch/en/ratsbetrieb/suche-amtliches-bulletin) : it contains all the bulletins of the Swiss parliament. However, we got access to an API to make the scraping easier, the metadata are available on [this page](https://ws.parlament.ch/odata.svc/$metadata).

There are different available data files, and we list below some important fields that are contained in those.
### About each of the deputee voting:
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

Note that some additional fields are also present but are either irrelevant in our study, or duplicating information from already existent fields.

## Feasibility and Risks
### Data scraping
The original data on the website are in pdf format which are very hard to process. We asked to a certain Daniel Schweizer for more accesible data and he provided us a metadata to access all the data of interest. Then using the online tool [XOData](http://pragmatiqa.com/xodata/#) from PragmatiQa, we are able to find the structure of the requests in order to write a python script that parses and formats the relevant fields, and then stores them into a csv file.

The scraping is performed by the methods in the `01-Scraping` folder, which contains 3 notebooks.

### Voting prediction
This was the first aim in our project, but ended up not being very accurate (more on it in the `03-ML` folder). Indeed, this was resting on first the Natural Language Processing to assign to each `BillTitle` the correct field it was about, but this is not totally correct. Then, we needed a sentiment analysis to express whether a `BillTitle` was presented positively (e.g. *For a minimal salary*, or negatively *Against a minimal salary*), plus a way to rank the laws based on the topic they were containing as well as whether the formulation is positive and negative. This made the prediction rely on too many layers of computations and subjectivity, which made the prediction complicated

### Visualisation of the votes
The main challenge here is to provide a visualisation which is simple to understand, while not relying on too many of our assumptions or computations. We want to present the rawest data possible, as each of the assumption we take adds a bias to the visualisation at the output. This is why the largest effort of this part is put in thinking on how to present the most faithfully the available data.

### License
The License of the data is available [here](https://www.parlament.ch/en/services/open-data-webservices). We can use it under some sensible restrictions (not alter it, indicate the date of the download, ...)

## Description of the results
### Data scraping
The original data on the website are in pdf format which are very hard to process. We asked to a certain Daniel Schweizer for more accesible data and he provided us a metadata to access all the data of interest. Then using the online tool [XOData](http://pragmatiqa.com/xodata/#) from PragmatiQa, we are able to find the structure of the requests in order to write a python script that parses and formats the relevant fields, and then stores them into a csv file.

The scraping is performed by the methods in the `01-Scraping` folder, which contains 3 notebooks.

### Topic modelling 
The official bulletins do not contain any clear *topic* attribute. Our first task will be to establish the thematic of each object discussed at the parliament. To this end, we will use NLP tools. Note that we will need to establish as well how the object is presented, e.g. if voting yes to an article about immigration wants to encourage immigration in Switzerland of wants to restrict it. We will work from the *Transcript* field of the data we scraped from the parliament website, which contains the discussion around the vote.
To go into more depth, we use the Transcript class of the data from the parliament, which contains everything that is discussed during the sessions at the parliament. This gives us a consequent corpus of texts. After recovering them, we perform the topic modelling using the [Gensim](https://radimrehurek.com/gensim/index.html) library, using the [Latent Dirichlet Allocation (LDA) model](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation).

Our latest working implementation of Natural Language Processing with our dataset is in the `02-NLP` folder.

### Formatting the data for the machine learning 
After having successfully extracted the topic from the vote, we need to format our data into a usable dataset that we will use with our machine learning algorithm. It will associate each useful field of the voting data to the topics to which it is the closest. 

This is also done in the `02-NLP` folder, where we start to apply what we found to the title of the laws which are voted at the Parliament, namely the *BillTitle* and the *BusinessTitle* attributes of the *Vote* field. We will then use this multiclass classification (percentage of belonging to each class from each of the entries) to perform supervised machine learning.

### Sentiment Analysis

In addition to Topic Modelling, and in order to be able to more precisely understand a given *BillTitle* or *BusinessTitle*, we also perform Sentiment Analysis, in order to find whether a Topic is mentionned positively or negatively. Ideally, we would like to find whether a law which is votes is pro or against a certain topic. What we did is described in the `02.5-Sentiment` folder. 

### Machine Learning
Having the results from both Topic Modelling and Sentiment Analysis, we perform a Machine Learning task, trying to predict what a certain deputee will vote on a given topic, using the informations we previously obtained. The few trials we did with different approaches, detailed in the `03-ML` were quite inconclusive, and we hence shifted to another task: simply establishing a voting profile, which is more of a Data Analysis task, instead of predicting the future votes. Moreover, we developped the visualisation of those voting profiles.

### Voting profile
Described in the `04-VotingProfile` folder, we perform some Exploratory Data Analysis, trying to extract useful information from the *Voting* results, along with the Topic we modelled. We aim at formatting the data in a useful manner to display interactively the votes at different levels of aggregation. 

The idea we want to follow is going from a very general overview of the profile of a person towards what his vote was on each of the votes at the parliament, in a useful and clear manner. This requires first to format the data in a good way for this purpose and then developping visualisation tools. This contains, not exhaustively:
- How the deputee voted at each vote.
- Whether he voted the same way his party did.

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
- [ADDED] Visualisation of the voting profile of each deputee, as well as each law
- [ADDED] Interactive and interesting way of visualising the connections between the member of the parliament and the laws (using some of the NLP we previously did).
- [ADDED] Aggregation at a *Session* rate of the votes of one deputee, to get an overall visualisation of how he voted over time. 
- **January 23st, 2017:** Extension of the database and visualisation of the voting profile of each deputee.
- **January 31th, 2017:** Final deadline
