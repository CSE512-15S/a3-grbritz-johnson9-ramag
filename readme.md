
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
  - __Graeme Britz:__ Was heavily involved with early iterations of development and setting up project architecture. He was primarily responsible for displaying and rendering the maps, finding and processing the geo-data, processing the educational data, and getting the graph components to talk to eachother. He also is the main author for this writeup. _Estimated time worked, 20-25 hours_
  - __Rama Gokhale:__ Found the educational dataset for us to use and developed two of the three graphs seen when clicking on a county. She also drew the storyboard images. _Estimated time worked, 17-20 hours_
  - __Johnson Goh:__ Helped find the geo-data and was involved with early iterations of development and exploration. He developed the income graphic seen when clicking on a county and made some improvements to the map interface. _Estimated time worked, 10-15 hours_

#### Inspecting different components
This project was built as a front-end heavy express.js application. In case the reader is not familiar with express.js, this means that the main parts of interest would be found in the `public` folder and in the `views` folder. Additionally, the `data-processing` folder contains scripts used to transform datasets. The datasets of interest can be found in `public/datasets/reference` and `public/datasets/topojson`.

## Usage
This project can be seen live [here](https://datavis-hw3.herokuapp.com/). If that link is down for some reason, below are instructions for building locally.

  1. Clone this repository into your local folder.
  2. Run `npm install && bower install`
  3. Run `grunt`
  4. The application should now be available at `localhost:3000`


### Dependencies
  -  node.js and npm
  -  bower.js
  -  grunt.js

__Note:__ Each of these tools should be available on your shell path to work with the instructions above.


## Authors
  - Graeme Britz (grbritz@uw.edu)
  - Rama Gokhale (ramag@uw.edu)
  - Johnson Goh (johnson9@uw.edu)