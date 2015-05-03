var _ = require('underscore');
var fs = require('fs');
var converter = require('json-2-csv');


fs.readFile('./public/datasets/reference/wa-education-data.json', function(err, fileContents) {
  if (err) throw Error(err);
  var documents = JSON.parse(fileContents);  

  documents = _.map(documents, function(document) {
    return {
      countyId : document.Id2,
      countyName : document.Geography.split(',')[0],
      total : {
        population : {
          "18-24" : document["Total; Estimate; Population 18 to 24 years"],
          "25-34" : document["Total; Estimate; Population 25 to 34 years"],
          "35-44" : document["Total; Estimate; Population 35 to 44 years"],
          "45-64" : document["Total; Estimate; Population 45 to 64 years"],
          "65+"   : document["Total; Estimate; Population 65 years and over"]
        },
        education : {
          "<9th" : document["Total; Estimate; Population 25 years and over - Less than 9th grade"],
          "9th-12th" : document["Total; Estimate; Population 25 years and over - 9th to 12th grade"],
          "high-school-diploma" : document["Total; Estimate; Population 25 years and over - High school graduate (includes equivalency)"],
          "some-college" : document["Total; Estimate; Population 25 years and over - Some college"],
          "associates" : document["Total; Estimate; Population 25 years and over - Associate's degree"],
          "bachelors" : document["Total; Estimate; Population 25 years and over - Bachelor's degree"],
          "graduate" : document["Total; Estimate; Population 25 years and over - Graduate or professional degree"]
        },
        income : {
          "less-than-highschool" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with"],
          "highschool-graduate" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 1"],
          "some-college-or-associates" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 2"],
          "bachelors" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 2"],
          "graduate-or-professional" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 3"],
        }
      },
      female : {
        population : {
          "18-24" : document["Female; Estimate; Population 18 to 24 years"],
          "25-34" : document["Female; Estimate; Population 25 to 34 years"],
          "35-44" : document["Female; Estimate; Population 35 to 44 years"],
          "45-64" : document["Female; Estimate; Population 45 to 64 years"],
          "65+"   : document["Female; Estimate; Population 65 years and over"]
        },
        education : {
          "<9th" : document["Female; Estimate; Population 25 years and over - Less than 9th grade"],
          "9th-12th" : document["Female; Estimate; Population 25 years and over - 9th to 12th grade"],
          "high-school-diploma" : document["Female; Estimate; Population 25 years and over - High school graduate (includes equivalency)"],
          "some-college" : document["Female; Estimate; Population 25 years and over - Some college"],
          "associates" : document["Female; Estimate; Population 25 years and over - Associate's degree"],
          "bachelors" : document["Female; Estimate; Population 25 years and over - Bachelor's degree"],
          "graduate" : document["Female; Estimate; Population 25 years and over - Graduate or professional degree"]
        },
        income : {
          "less-than-highschool" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with"],
          "highschool-graduate" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 1"],
          "some-college-or-associates" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 2"],
          "bachelors" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 2"],
          "graduate-or-professional" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 3"],
        }
          
      },
      male : {
        population: {
          "18-24" : document["Male; Estimate; Population 18 to 24 years"],
          "25-34" : document["Male; Estimate; Population 25 to 34 years"],
          "35-44" : document["Male; Estimate; Population 35 to 44 years"],
          "45-64" : document["Male; Estimate; Population 45 to 64 years"],
          "65+"   : document["Male; Estimate; Population 65 years and over"]
        },
        education : {
          "<9th" : document["Male; Estimate; Population 25 years and over - Less than 9th grade"],
          "9th-12th" : document["Male; Estimate; Population 25 years and over - 9th to 12th grade"]
          ,
          "high-school-diploma" : document["Male; Estimate; Population 25 years and over - High school graduate (includes equivalency)"],
          "some-college" : document["Male; Estimate; Population 25 years and over - Some college"],
          "associates" : document["Male; Estimate; Population 25 years and over - Associate's degree"],
          "bachelors" : document["Male; Estimate; Population 25 years and over - Bachelor's degree"],
          "graduate" : document["Male; Estimate; Population 25 years and over - Graduate or professional degree"]
        },
        income : {
          "less-than-highschool" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with"],
          "highschool-graduate" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 1"],
          "some-college-or-associates" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 2"],
          "bachelors" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 2"],
          "graduate-or-professional" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013NFLATION-ADJUSTED DOLLARS) - Population 25 years and over with 3"],
        } 
      }
    };
  });
  writeToFile('./public/datasets/reference/wa-education-data-simple.json', documents);
});

// fs.readFile('./public/datasets/reference/wa-education-data.json', function(err, fileContents) {
//   if (err) throw Error(err);
//   var documents = JSON.parse(fileContents);

//   documents = _.map(documents, function(document) {
//     document.Geography = document.Geography.split(',')[0];
//     return document;
//   });


//   converter.json2csv(documents, function(err, csv) {
//     if (err) { throw err};
    
//     fs.writeFile('./public/datasets/reference/wa-education-data.csv', csv, function(err) {
//       if (err) throw err;
//     })
//   });
// });
// 
// 
// fs.readFile('./public/datasets/education_data_by_county.json', function(err, fileContents) {
//     if (err) throw Error(err);
//     var waCounties = _.filter(JSON.parse(fileContents), function(county) {
//                         return county["Geography"].indexOf(", Washington") !== -1;
//                       });
//     writeToFile('./public/datasets/reference/wa-education-data.json', waCounties);
// })