import pandas as pd
import numpy as np

metObjectsUrl = 'https://media.githubusercontent.com/media/metmuseum/openaccess/master/MetObjects.csv'
metObjectsCSV = '/Users/ryanbest/Dropbox/ryanabest.github.io/ms1-2018/data-exploration/first-p5-viz/assets/MetObjects.csv'
metObjectsStatic5000 = '/Users/ryanbest/Dropbox/ryanabest.github.io/ms1-2018/data-exploration/first-p5-viz/assets/MetObjects5000.csv'
metObjectsImagesLinks = '/Users/ryanbest/Dropbox/ryanabest.github.io/ms1-2018/data-exploration/first-p5-viz/assets/MMAImageURLS.xslx'

metObjects = pd.DataFrame.from_csv(metObjectsCSV,index_col=3)

# print metObjects.columns.values
print metObjects.count()
# print metObjects.loc[11417]
# print metObjects[(metObjects['Title']=='Washington Crossing the Delaware') & (metObjects['Is Public Domain'])]
# print metObjects['Credit Line'].value_counts()


# theBurdickCollection = metObjects.loc[metObjects['Credit Line'] == 'The Jefferson R. Burdick Collection, Gift of Jefferson R. Burdick']

# print theBurdickCollection['Artist Display Name'].value_counts()
