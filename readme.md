
# Washington Population and Educational Attainment
This map can be used to view population and educatioanl statistics about different counties in Washington state. Click on a county to view:

  -  Its population broken down by age group and gender
  -  The percentage of the population by educational achievement category (e.g. bachelor's degree, high school diploma)
  -  The median income per educational achievment category.

## Data Domain
We were highly interested in geographic data and elements of the US Census. Using a map is an intuitive way to filter multidimensional data when applicable. Furthermore, it is an ideal medium for encouraging civic awareness as people can relate abstract data to physical areas that they are familiar with. We combined geojson and topojson files from J. Goodall's [US Maps Repo](https://github.com/jgoodall/us-maps) with data from the [2013 US Census American Community Survey on Educational Attainment](http://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_13_5YR_S1501&src=pt).


## Storyboard
  1. Map of Washington with county outlines displayed. County tiles are clickable.
  2. When a county is selected, the user is presented with data on county population, educational attainments, and median income levels by education category. These statistics can be viewed in aggregate, or split by gender.
  3. When the user selects a second county, she can see a comparison between the two counties.


### Changes between final version and storyboard
  -  Not all graphics can be toggled between gender and total population views. 
  -  Comparing two counties is not yet implemented.

## Development Process
  - __Graeme Britz:__ Was heavily involved with early iterations of development and setting up project architecture. He was primarily responsible for displaying and rendering the maps, finding and processing the geo-data, processing the educational data, and getting the graph components to talk to eachother. He also is the main author for this writeup.
  - __Rama Gokhale:__ Found the educational dataset for us to use and developed two of the three graphs seen when clicking on a county. She also drew the storyboard images.
  - __Johnson Goh:__ Helped find the geo-data and was involved with early iterations of development and exploration. He developed the income graphic seen when clicking on a county and made some improvements to the map interface.



## Usage


## Authors
Graeme Britz (grbritz@uw.edu)
Rama Gokhale (ramag@uw.edu)
Johnson Goh (johnson9@uw.edu)