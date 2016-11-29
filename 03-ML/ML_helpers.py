#=================================================================================================================
# Helpers file for the Machine Learning routine from 01-ML.ipynb
#=================================================================================================================
import sklearn
import sklearn.ensemble
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, train_test_split, cross_val_predict, learning_curve
import matplotlib.pyplot as plt
import numpy as np


def cross_validation(X,Y,cv_param = 20, max_depth = None): 
    """
        Cross_validation takes as input a dataset X and the labels Y and performs the cv_param-fold cross validation.
        It uses a random forest classifier in order to do so and plots the cross-validation score, the f1-score
        as well as the confusion matrix.
	@return Y_predicted : the predicted outcome from our model.
    """
    # 1. Creates the classifier that we will use 
    forest = RandomForestClassifier(max_depth = max_depth)
    # 2. Predicts the output of the classification after cv_param-fold cross-validation
    Y_predicted = cross_val_predict(forest, X, Y, cv=cv_param)
    
    # 3. Print the results : scores, 
    print('Cross Validation result :', cross_val_score(forest,X,Y,cv = cv_param).mean(),
        '\nF1 score result :',sklearn.metrics.f1_score(Y, Y_predicted,average='micro'))
    
    print_confusion_matrix(sklearn.metrics.confusion_matrix(Y,Y_predicted))
    
    return Y_predicted



def plot_feature_importances(X, Y, columns,plot_flag = 1, max_depth = None):
    """
        plot_feature_importances displays the importance of each feature into determining the output of our problem. 
        @param plot_flag : a boolean which can be turned on or off for the plotting for the display of the results.
    """
    forest = RandomForestClassifier(max_depth = max_depth)
    forest = forest.fit(X,Y)
    importances = forest.feature_importances_
    std = np.std([tree.feature_importances_ for tree in forest.estimators_],axis=0)
    indices = np.argsort(importances)[::-1]
    # Print the feature ranking
    print("Feature ranking:")

    if(plot_flag):    
        for f in range(X.shape[1]):
            print("%d. feature %d - %s (%f)" % (f + 1, indices[f],  columns[indices[f]], importances[indices[f]]))
            
        # Plot the feature importances of the forest
        plt.figure()
        plt.title("Feature importances")
        plt.bar(range(X.shape[1]), importances[indices], color="r", yerr=std[indices], align="center")
        plt.xticks(range(X.shape[1]), indices)
        plt.xlim([-1, X.shape[1]])
        plt.show()
    return indices,importances



def plot_learning_curve(estimator,X,Y,title,cv=20):
    """
        Custom plotting routine to plot the training and testing scores against the number of data considered.
        This takes an estimator and a Dataset as inputs, along with their labels, and the k-folds of cross validation
        and simply plots them with their standard deviation added as colour on the plot. 
    """
    plt.figure()
    plt.title(title)
    plt.xlabel("Training examples")
    plt.ylabel("Score")
    train_sizes, train_scores, test_scores = learning_curve(estimator, X, Y, cv=cv, train_sizes=np.linspace(0.2,1,20))
    train_scores_mean = np.mean(train_scores, axis=1)
    train_scores_std = np.std(train_scores, axis=1)
    test_scores_mean = np.mean(test_scores, axis=1)
    test_scores_std = np.std(test_scores, axis=1)
    plt.grid()

    plt.fill_between(train_sizes, train_scores_mean - train_scores_std,
                    train_scores_mean + train_scores_std, alpha=0.1, color="r")
    plt.fill_between(train_sizes, test_scores_mean - test_scores_std,
                    test_scores_mean + test_scores_std, alpha=0.1, color="g")
    plt.plot(train_sizes, train_scores_mean, 'o-', color="r",
            label="Training score")
    plt.plot(train_sizes, test_scores_mean, 'o-', color="g",
            label="Cross-validation score")
    plt.legend(loc="best")
    plt.show()

#=================================================================================================================
#=================================================================================================================
# VISUALISATION FUNCTIONS ONLY
#=================================================================================================================
#=================================================================================================================

def print_confusion_matrix(conf_matrix):
    """
        Prints in textual way the entries of the confusion matrix conf_matrix and allows us to visualise it in a 
        more elegant way than when displaying it simply with print. It makes the understanding of it more intuitive.
    """
    print('\n\t\t\tDISPLAYING THE CONFUSION MATRIX\n')
    print('\tPredicted : ',end='\t' )
    features = conf_matrix.shape[0]
    for i in range(0,features):
        print(i,end='\t')
    print('TOTAL')
    print('\n Reality : ',end='\t')
    for i in range(0,features):
        print(i,'||',end='\t')
        for j in range(0,features):
            print(conf_matrix[i,j],end='\t')
        print(sum(conf_matrix[i,:]),end='\n\t\t')
    print('\nTOTALS : \t  ||',end='\t')
    for j in range(0,features):
        print(sum(conf_matrix[:,j]),end='\t')
    print(sum(sum(conf_matrix)))

#================================================================================================================= 

def plot_fig(data_1,data_2,title_,xlabel_,ylabel_):
    """
        Custom plotting routine to plot our data the way we want 
        (does not provide anything extremely useful)
    """
    
    fig = plt.figure()
    ax = fig.add_subplot(111)    # The big subplot
    ax1 = fig.add_subplot(211)
    ax2 = fig.add_subplot(212)

    # Turn off axis lines and ticks of the big subplot
    ax.spines['top'].set_color('none')
    ax.spines['bottom'].set_color('none')
    ax.spines['left'].set_color('none')
    ax.spines['right'].set_color('none')
    ax.tick_params(labelcolor='w', top='off', bottom='off', left='off', right='off')

    ax1.plot(np.linspace(1,20,20), data_1, 'o-', color="r",label="CV score")
    ax2.plot(np.linspace(1,20,20), data_2, 'o-', color="g",label="Training score ")
    ax1.legend(loc="best")
    ax2.legend(loc="best")
    ax.set_title(title_)
    ax.set_xlabel(xlabel_)
    ax.set_ylabel(ylabel_)
    plt.show()

