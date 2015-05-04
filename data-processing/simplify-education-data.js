var _ = require('underscore');
var fs = require('fs');
var converter = require('json-2-csv');


fs.readFile('../public/datasets/reference/wa-education-data.json', function(err, fileContents) {
  if (err) throw Error(err);
  var documents = JSON.parse(fileContents);  

  documents = _.map(documents, function(document) {
    return {
      countyId : document.Id2,
      countyName : document.Geography.split(',')[0],
      total : {
        population : [
          {
            "id" : "18-24",
            "value" : document["Total; Estimate; Population 18 to 24 years"]
          },

          {
            "id" : "25-34",
            "value" : document["Total; Estimate; Population 25 to 34 years"]
          },

          {
            "id" : "35-44",
            "value" : document["Total; Estimate; Population 35 to 44 years"]
          },

          {
            "id" : "45-64",
            "value" : document["Total; Estimate; Population 45 to 64 years"]
          },

          {
            "id" : "65+",
            "value" : document["Total; Estimate; Population 65 years and over"]
          }
        ],
        education : [
          {
            "id" : "<9th",
            "value" : document["Total; Estimate; Population 25 years and over - Less than 9th grade"]
          },

          {
            "id" : "9th-12th",
            "value" : document["Total; Estimate; Population 25 years and over - 9th to 12th grade, no diploma"]
          },

          {
            "id" : "high-school-diploma",
            "value" : document["Total; Estimate; Population 25 years and over - High school graduate (includes equivalency)"]
          },

          {
            "id" : "some-college",
            "value" : document["Total; Estimate; Population 25 years and over - Some college, no degree"]
          },

          {
            "id" : "associates",
            "value" : document["Total; Estimate; Population 25 years and over - Associate's degree"]
          },

          {
            "id" : "bachelors",
            "value" : document["Total; Estimate; Population 25 years and over - Bachelor's degree"]
          },

          {
            "id" : "graduate",
            "value" : document["Total; Estimate; Population 25 years and over - Graduate or professional degree"]
          }
        ],
        income : [
          {
            "id": "all-categories",
             "value": document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings"]
          },
          {
            "id": "less-than-highschool",
            "value" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Less than high school graduate"]
          },
          {
            "id": "highschool-graduate",
            "value" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - High school graduate (includes equivalency)"]
          },
          {
            "id": "some-college-or-associates",
            "value" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Some college or associate's degree"]
          },
          {
            "id": "bachelors",
            "value" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Bachelor's degree"]
          },
          {
            "id": "graduate-or-professional",
            "value" : document["Total; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Graduate or professional degree"]
          }
        ]
      },
      female : {
        population : [
          {
            "id" : "18-24",
            "value" : document["Female; Estimate; Population 18 to 24 years"]
          },

          {
            "id" : "25-34",
            "value" : document["Female; Estimate; Population 25 to 34 years"]
          },

          {
            "id" : "35-44",
            "value" : document["Female; Estimate; Population 35 to 44 years"]
          },

          {
            "id" : "45-64",
            "value" : document["Female; Estimate; Population 45 to 64 years"]
          },

          {
            "id" : "65+",
            "value" : document["Female; Estimate; Population 65 years and over"]
          }
        ],
        education : [
          {
            "id" : "<9th",
            "value" : document["Female; Estimate; Population 25 years and over - Less than 9th grade"]
          },

          {
            "id" : "9th-12th",
            "value" : document["Female; Estimate; Population 25 years and over - 9th to 12th grade, no diploma"]
          },

          {
            "id" : "high-school-diploma",
            "value" : document["Female; Estimate; Population 25 years and over - High school graduate (includes equivalency)"]
          },

          {
            "id" : "some-college",
            "value" : document["Female; Estimate; Population 25 years and over - Some college, no degree"]
          },

          {
            "id" : "associates",
            "value" : document["Female; Estimate; Population 25 years and over - Associate's degree"]
          },

          {
            "id" : "bachelors",
            "value" : document["Female; Estimate; Population 25 years and over - Bachelor's degree"]
          },

          {
            "id" : "graduate",
            "value" : document["Female; Estimate; Population 25 years and over - Graduate or professional degree"]
          }
        ],
        income : [
          {
            "id" : "all-categories",
          "value" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings"]
          },
          {
            "id" : "less-than-highschool",
          "value" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Less than high school graduate"]
          },
          {
            "id" : "highschool-graduate",
          "value" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - High school graduate (includes equivalency)"]
          },
          {
            "id" : "some-college-or-associates",
          "value" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Some college or associate's degree"]
          },
          {
            "id" : "bachelors",
          "value" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Bachelor's degree"]
          },
          {
            "id" : "graduate-or-professional",
          "value" : document["Female; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Graduate or professional degree"]
          }
        ] 
      },
      male : {
        population : [
          {
            "id" : "18-24",
            "value" : document["Male; Estimate; Population 18 to 24 years"]
          },

          {
            "id" : "25-34",
            "value" : document["Male; Estimate; Population 25 to 34 years"]
          },

          {
            "id" : "35-44",
            "value" : document["Male; Estimate; Population 35 to 44 years"]
          },

          {
            "id" : "45-64",
            "value" : document["Male; Estimate; Population 45 to 64 years"]
          },

          {
            "id" : "65+",
            "value" : document["Male; Estimate; Population 65 years and over"]
          }
        ],
        education : [
          {
            "id" : "<9th",
            "value" : document["Male; Estimate; Population 25 years and over - Less than 9th grade"]
          },

          {
            "id" : "9th-12th",
            "value" : document["Male; Estimate; Population 25 years and over - 9th to 12th grade, no diploma"]
          },

          {
            "id" : "high-school-diploma",
            "value" : document["Male; Estimate; Population 25 years and over - High school graduate (includes equivalency)"]
          },

          {
            "id" : "some-college",
            "value" : document["Male; Estimate; Population 25 years and over - Some college, no degree"]
          },

          {
            "id" : "associates",
            "value" : document["Male; Estimate; Population 25 years and over - Associate's degree"]
          },

          {
            "id" : "bachelors",
            "value" : document["Male; Estimate; Population 25 years and over - Bachelor's degree"]
          },

          {
            "id" : "graduate",
            "value" : document["Male; Estimate; Population 25 years and over - Graduate or professional degree"]
          }
        ],
        income : [
         {
            "id" : "all-categories",
            "value" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings"]
          },
          {
            "id" : "less-than-highschool",
            "value" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Less than high school graduate"]
          },
          {
            "id" : "highschool-graduate",
            "value" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - High school graduate (includes equivalency)"]
          },
          {
            "id" : "some-college-or-associates",
            "value" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Some college or associate's degree"]
          },
          {
            "id" : "bachelors",
            "value" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Bachelor's degree"]
          },
          {
            "id" : "graduate-or-professional",
            "value" : document["Male; Estimate; MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2013 INFLATION-ADJUSTED DOLLARS) - Population 25 years and over with earnings - Graduate or professional degree"]
          }
        ] 
      }
    };
  });
  writeToFile('../public/datasets/reference/wa-education-data-simple.json', documents);
});
function writeToFile(filepath, object) {
  fs.writeFile(filepath, JSON.stringify(object), function(err) {
    if (err) throw Error(err);
  });
}

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