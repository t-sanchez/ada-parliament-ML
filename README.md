# ada-parliament-ML
(ADA - CS 401)

## Abstract
The motivation of this project is to use the free information of the [Swiss parliament](https://www.parlament.ch/en/services/freedom-of-information-act), that are available from the *Freedom of Information Act* :

> The Freedom of Information Act came into force on 1 July 2006. It is intended to promote transparency with regard to the 
> purpose, organisation and activities of the federal administration, while guaranteeing access to official documents produced 
> after 1 July 2006. 

We will try to model the topics that are discussed at the Parilament, but more specifically will try to establish a voting profile of each political party, trying to predict their voting on a new subject that would be submitted to then.

## Data description
The textual form of the data we will use is available [here](https://www.parlament.ch/en/ratsbetrieb/suche-amtliches-bulletin) : it contains all the bulletins of the Swiss parliament. However, we got access to an API to make the scraping easier, 
## Feasibility and Risks
### Data scraping
### Topic modelling 
The official bulletins do not contain any clear *topic* attribute. Our first task will be to establish the thematic of each object discussed at the parliament. To this end, we will use NLP tools. Note that we will need to establish as well how the object is presented, e.g. if voting yes to an article about immigration wants to encourage immigration in Switzerland of wants to restrict it. 
### Voting profile
If time allows, after establishing the topic of the object that is voted, we will construct a voting profile for each of the members of the parliament, as well as the parties. We will then implemented an algorithm which will attempt to predict the outcome of vote on a given matter for each party.

## Deliverables
The final result will take the form of an online website presenting different interactive visualisations of the results we obtain. The website will mostly be developped by this [team](https://github.com/jmuth/parliament-viz.ch/blob/master/README.md). 

## Timeplan
- **November 6th, 2016:** Start of the project
- **November 13th, 2016:** Data scraping and parsing of a first usable dataset
- **December 4th, 2016:** Extraction of the topic of the objects, determining if it is positive or not. 
- **December 18th, 2016:** Voting profile of each party
- **Mid-December 2016:** Checkpoint
- **January 1st, 2017:** Extension of the database and refinement of the model
- **January 31th, 2017:** Final deadline
