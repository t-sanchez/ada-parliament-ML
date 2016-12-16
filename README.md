# ada-parliament-ML
(ADA - CS 401)

## Abstract
The motivation of this project is to use the free information of the [Swiss parliament](https://www.parlament.ch/en/services/freedom-of-information-act), that are available from the *Freedom of Information Act* :

> The Freedom of Information Act came into force on 1 July 2006. It is intended to promote transparency with regard to the 
> purpose, organisation and activities of the federal administration, while guaranteeing access to official documents produced 
> after 1 July 2006. 

We will try to model the topics that are discussed at the Parilament, but more specifically will try to establish a voting profile of each political party, trying to predict their voting on a new subject that would be submitted to then.

## Data description
The textual form of the data we will use is available [here](https://www.parlament.ch/en/ratsbetrieb/suche-amtliches-bulletin) : it contains all the bulletins of the Swiss parliament. However, we got access to an API to make the scraping easier, the metadata are available on [this page](https://ws.parlament.ch/odata.svc/$metadata).

The available data contain a set of votes, each on with following fields :
### About the voting person :
- Id
- First name
- Last name
- Canton
- Parliament group

### About the voting subject :
- Business title
- Bill title

### About the vote :
- Decision
- Vote end
- Meaning of the 'Yes'
- Meaning of the 'No'

### About the discussion around the vote :
- What was said
- The speaker
- The time is was said
- The vote to which it is related

Note that some additional fields are also present but are either irrelevant in our study, or duplicating information from already existent fields.

## Feasibility and Risks
### Data scraping
The original data on the website are in pdf format which are very hard to process. We asked to a certain Daniel Schweizer for more accesible data and he provided us a metadata containing all the data of interest. Then using the online tool [XOData](http://pragmatiqa.com/xodata/#) from PragmatiQa, we are able to find the structure of the requests in order to write a python script that parses and formats the relevant fields, and then stores them into a csv file.

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
Having the results from both Topic Modelling and Sentiment Analysis, we perform a Machine Learning task, trying to predict what a certain deputee will vote on a given topic, using the informations we previously obtained. The few trials we did with different approaches, detailed in the `03-ML` were quite inconclusive, and we hence shifted to another task : simply establishing a voting profile, which is more of a Data Analysis task, instead of predicting the future votes.

### Voting profile
Described in the `04-VotingProfile` folder, we perform some Exploratory Data Analysis, trying to extract useful information from the *Voting* results, along with the Topic we modelled.

### Visualization
Using the d3.js framework, we work on visualising our Data. The details are in the `05-Viz` folder.

### License
The License of the data is available [here](https://www.parlament.ch/en/services/open-data-webservices). We can use it under some sensible restrictions (not alter it, indicate the date of the download, ...)
## Deliverables
The final result will take the form of an online website presenting different interactive visualisations of the results we obtain. The website will mostly be developped by [this team](https://github.com/jmuth/parliament-viz.ch) (Joachim Muth, Gael Lederrey and Jonas Racine), and we will provide them with more processed data. 
## Timeplan
- **November 6th, 2016:** Start of the project -> *done*
- **November 13th, 2016:** Data scraping and parsing of a first usable dataset -> *done*
- **December 4th, 2016:** Extraction of the topic of the objects, determining if it is positive or not; machine learning -> *done, machine learning inconclusive*
- **December 18th, 2016:** Voting profile of each party/deputee 
- **Mid-December 2016:** Checkpoint
- **January 1st, 2017:** Extension of the database and refinement of the model
- **January 31th, 2017:** Final deadline
