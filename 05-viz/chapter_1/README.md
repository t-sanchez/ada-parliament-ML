# 05-Visualisation
The part of vizualisation was not a direct aim of our project, though after realizing the difficulty of apply machine learning on our datas we decided to use vizualisation as a new data treatement.
## I - Description of the Folder
`05-viz` is the repository for the entire vizualisation of the project it is composed of javascript/HTML files. These are sadly not deployed on a website, hence only available locally. We used [Webstorm](https://www.jetbrains.com/webstorm/) to access our website, which we advise you to install in order to run the website (Then import *chapter_1* as a project, open and run *entry.html* and freely navigate in the website). Have a look at the poster (*swiss_parliament_voting.pdf*), which describes the aim of each visualization extensively.


## II - Division of the files

### 1. entry.html
Runs the home page of the website.

### 2. votation_viz.js/html
Run the vizualisation of the distance of votation of each deputy (compute a matrix of distance between the votes). The corresponding notebooks are the ones from `04-VotingProfile/Clustering`.

### 3. votation_sub.js/html
Run the vizualisation of the clustering of the different laws (application of NLP). The corresponding notebooks are the ones from `04-VotingProfile/Clustering`.

### 4. viz_person.js/html
- **Dependencies: tables.js, deputee_info.js**; *tables.js* is responsible for the interactive table of the page. It also depends from the folder `DataTables-1.10.13`. 
- Run all the information concerning a deputy, party, group, voted law etc...  The corresponding notebooks are the ones from `04-VotingProfile/PersonAnalysis`.

### 5. bills.js/html
Run the description of a given law, as well as all the modifications it went through The corresponding notebooks are the ones from `04-VotingProfile/PersonAnalysis`.


## III - Required Data
You can find follow the google drive links for the necessary data to run the vizualisations:

- [viz_data](https://drive.google.com/open?id=0B59kcXdstMisdkN6NG5maVRkUVE)
- [pictures](https://drive.google.com/open?id=0B59kcXdstMisaVZsYU4yUkpxcm8)

In order to launch without troubles put both folders directly in the `chapter_1` folder.

- **N.B.** the other folders are either created when running the project, or dependencies of some other scripts.
