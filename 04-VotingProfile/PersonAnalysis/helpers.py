import pandas as pd
import numpy as np
import glob
import os

VOTE_DICT  = {1:'Yes', 2:'No', 3:'Abstention', 5:'Absent', 6:'Excused', 7:'President'}

def load_vote_df():
    """
    Loads ad formats the Vote dataframe, keeping only the relevant fields and converting the time into proper dates.
    """
    vote_df = pd.read_csv('../../datas/scrap/Vote/legiid_37-50.csv',index_col=0)
    print('Entries in the DataFrame',vote_df.shape)
    vote_df = vote_df[['VoteEnd','BillTitle','BusinessTitle','Subject','MeaningNo','MeaningYes','BusinessShortNumber','ID','IdLegislativePeriod','IdSession',
                  ]]
    vote_df['VoteEnd'] = vote_df['VoteEnd'].apply(pd.to_datetime).apply(lambda x: x.date())
    vote_df.sort_values('VoteEnd',ascending=True)
    return vote_df


def load_voting():
    """
        Loads the Voting DataFrame and formats it to get the correct name of parties and tags, 
        as well as only considering the fields we actually need.  
    """
    
    # 1. Load the Voting files and concatenate them as well as the session dataframe to identify the sessions
    dataset_tmp = []
    path = '../../datas/scrap/Voting'
    allFiles = glob.glob(os.path.join(path, 'Session*.csv'))

    for file_ in allFiles:
        data_tmp = pd.read_csv(file_,index_col=0)
        dataset_tmp += [data_tmp] 
    voting_df = pd.concat(dataset_tmp)

    print('Entries in the DataFrame',voting_df.shape)
    
    voting_df.reset_index(inplace=True)
    
        # 2. Update the names of the parties
    parties_name_dict = {'Groupe écologiste':'Parti écologiste suisse (Les Verts)', 'Groupe socialiste':'Parti socialiste', 
        "Groupe vert'libéral":'Parti vert-libéral', 'Groupe radical-démocratique':'Parti libéral-radical',
        'Groupe des Paysans, Artisans et Bourgeois':'Union démocratique du centre',
        'Groupe conservateur-catholique':'Parti démocrate-chrétien', 
        'Groupe BD':'Parti Bourgeois-Démocratique', 'Non inscrit':'Non inscrit'}
    parties_dict = {'G':'PES', 'S':'PS', 'GL':'PVL', 'RL':'PLR', 
                     'V':'UDC', 'CE':'PDC', 'BD':'PBD', 'C':'PDC', '-':'Other', 'CEg':'PDC'}
   
    
    voting_df['ParlGroupName'].replace(pd.Series(parties_name_dict), inplace=True)
    voting_df['ParlGroupCode'].replace(pd.Series(parties_dict), inplace=True)
    voting_df['Decision'].replace(pd.Series(VOTE_DICT),inplace=True)
    
    # 3. Process some supplementary fields
    voting_df.insert(1,'Name', voting_df['FirstName'] + ' ' + voting_df['LastName'])
    voting_df['VoteEnd'] = voting_df['VoteEnd'].apply(pd.to_datetime).apply(lambda x: x.date())
    
    # Put the BusinessTitle as BillTitle when the BillTitle is unavailable
    voting_df.loc[voting_df.BillTitle.isnull(),'BillTitle'] =  voting_df.loc[
    voting_df.BillTitle.isnull(),'BusinessTitle']

    
    # 4. Keep only the relevant fields    
    voting_df = voting_df[['Name','BillTitle', 'Decision','BusinessShortNumber','ParlGroupName', 'ParlGroupCode','IdVote','IdSession','VoteEnd']]
    
    return voting_df

def format_voting_session(voting_df):
    """
        Formats the Voting DataFrame, appending to it the session-related entries.
    """
    # Append session related fields to the voting_df
    session_df = pd.read_csv('../../datas/scrap/Session/Legiid_37-50.csv',index_col=0)
    session_df.set_index('ID',inplace=True)
    session_df['Date']=session_df['StartDate'].apply(pd.to_datetime).apply(lambda x: x.date())
    session_df_name = session_df[['SessionName','Date']]  


    voting_df = voting_df.join(session_df_name, on='IdSession')
    return voting_df

def split_df_dict(df, field):
    """
        Splits the input df along a certain field into multiple dictionaries which links each unique
        entry of the field to the entries in the dataframe
        @param df: the dataframe that we want to split into a dict.
        @param field: the field along which we want to split the dataframe
        @return df_dict: a dict which has as key the unique entries of field, and as item all the entries
                            with the same key as a dataframe.
    """
    # Retrieve first all the unique Name entries
    unique_field = df[field].unique()
    print('Number of unique entries in',field,':',len(unique_field))
    #Create a dictionary of DataFrames which stores all the info relative to a single deputee
    df_dict = {elem : pd.DataFrame for elem in unique_field}

    for key in df_dict.keys():
        df_deputee = df.loc[df[field] == key]
        df_deputee = df_deputee.drop('Name',1)
        df_dict[key] = df_deputee
    
    return df_dict
    
def export_session_vote_csv(directory, deputee, df,file_):
    """
        Computes the session level aggregation for a deputee and then stores in the directory given as input.
        Requires the name of the deputee, its associated dataframe
    """
    df_grouped = df.groupby(['IdSession','SessionName','Date'])

    count_yes = lambda x: np.sum(x==VOTE_DICT[1]); count_no = lambda x: np.sum(x==VOTE_DICT[2]); 
    count_abstention = lambda x: np.sum(x==VOTE_DICT[3]); count_absent = lambda x: np.sum(x==VOTE_DICT[5]);
    count_excused = lambda x: np.sum(x==VOTE_DICT[6]); count_president = lambda x: np.sum(x==VOTE_DICT[7]);
    count_total = lambda x: len(x);
    # There is a unique session name and year as we group by session -> We want to keep it and found
    # this kind of dirty way to do it.
    name_session = lambda x: x.unique()[0]; year_session = lambda x: x.unique()[0]

    df = df_grouped.agg({'Decision':{'Yes': count_yes, 'No': count_no,'Abstention': count_abstention,
                    'Excused':count_excused, 'Absent':count_absent, 'President':count_president, 'Total':count_total}})

    df.columns = df.columns.droplevel(0)
    df = df.reset_index().set_index('IdSession')
    df = df[['Yes','No','Abstention','Absent','Excused','President','SessionName','Date']]

    df.to_csv(directory+deputee+file_)
    