exports.default = {
  title: "Hierarchical Axis",
  key: "Hierarchical Axis",
  index: 3,
  view: "feature",
  usecases: [
    {
      title: "Hierarchical Category Axis",
      description: "Shows a bar chart with a hierarchical category axis created using two fields, year and quarter.",
      model: {
        snippet: {
          "plots": [
            {
              "type": "Bar",
              "encodings": {
                "values": [
                  {
                    "field": "Sales"
                  }
                ],
                "category": {
                  "field": "Year > Quarter"
                },
                "color": {
                  "field": "Quarter"
                },
                "tooltip": [
                  {
                    "field": "Sales"
                  }
                ]
              }
            }
          ]
        },
        fullModel: {
          "plots": [
            {
              "type": "Bar",
              "encodings": {
                "values": [
                  {
                    "field": "Sales"
                  }
                ],
                "category": {
                  "field": "Year > Quarter"
                },
                "color": {
                  "field": "Quarter"
                },
                "tooltip": [
                  {
                    "field": "Sales"
                  }
                ]
              }
            }
          ],
          "config": {
            "palette": [
              "#04864F",
              "#1473BC",
              "#F79503",
              "#C52D36",
              "#F9F389",
              "#15ADE9",
              "#0E5F46",
              "#FFF73B"
            ]
          },
          "data": {
            "name": "sample",
            "dateFormats": false,
            "values": [
              {
                "Sales": 4590,
                "download": 3779,
                "Quarter": "Q1",
                "Year": "2008"
              },
              {
                "Sales": 3466,
                "download": 5261,
                "Quarter": "Q2",
                "Year": "2008"
              },
              {
                "Sales": 9207,
                "download": 6211,
                "Quarter": "Q3",
                "Year": "2008"
              },
              {
                "Sales": 7938,
                "download": 5773,
                "Quarter": "Q4",
                "Year": "2008"
              },
              {
                "Sales": 3719,
                "download": 6862,
                "Quarter": "Q1",
                "Year": "2009"
              },
              {
                "Sales": 7900,
                "download": 837,
                "Quarter": "Q2",
                "Year": "2009"
              },
              {
                "Sales": 2918,
                "download": 1456,
                "Quarter": "Q3",
                "Year": "2009"
              },
              {
                "Sales": 3386,
                "download": 3923,
                "Quarter": "Q4",
                "Year": "2009"
              },
              {
                "Sales": 6749,
                "download": 7840,
                "Quarter": "Q1",
                "Year": "2010"
              },
              {
                "Sales": 8522,
                "download": 505,
                "Quarter": "Q2",
                "Year": "2010"
              },
              {
                "Sales": 4926,
                "download": 6214,
                "Quarter": "Q3",
                "Year": "2010"
              },
              {
                "Sales": 7066,
                "download": 2777,
                "Quarter": "Q4",
                "Year": "2010"
              },
              {
                "Sales": 4804,
                "download": 1087,
                "Quarter": "Q1",
                "Year": "2011"
              },
              {
                "Sales": 9973,
                "download": 5320,
                "Quarter": "Q2",
                "Year": "2011"
              },
              {
                "Sales": 1190,
                "download": 6557,
                "Quarter": "Q3",
                "Year": "2011"
              },
              {
                "Sales": 9757,
                "download": 7144,
                "Quarter": "Q4",
                "Year": "2011"
              },
              {
                "Sales": 103,
                "download": 2308,
                "Quarter": "Q1",
                "Year": "2012"
              },
              {
                "Sales": 3187,
                "download": 1634,
                "Quarter": "Q2",
                "Year": "2012"
              },
              {
                "Sales": 9224,
                "download": 1721,
                "Quarter": "Q3",
                "Year": "2012"
              },
              {
                "Sales": 3177,
                "download": 26,
                "Quarter": "Q4",
                "Year": "2012"
              },
              {
                "Sales": 2238,
                "download": 6796,
                "Quarter": "Q1",
                "Year": "2013"
              },
              {
                "Sales": 8762,
                "download": 3394,
                "Quarter": "Q2",
                "Year": "2013"
              }
            ]
          }
        }
      }
    },
    {
      title: "Hierarchical Detail Grouping",
      description: "Shows a sunburst chart created using a hierarchical detail grouping of two fields, year and quarter.",
      model: {
        snippet: {
          "plots": [
            {
              "type": "Bar",
              "encodings": {
                "values": [
                  {
                    "field": "Sales"
                  }
                ],
                "details": [
                  {
                    "field": "Year > Quarter",
                    "group": "Stack"
                  }
                ],
                "color": {
                  "field": "Year > Quarter"
                }
              }
            }
          ]
        },
        fullModel: {
          "plots": [
            {
              "name": "p1",
              "type": "Bar",
              "encodings": {
                "values": [
                  {
                    "field": "Sales"
                  }
                ],
                "details": [
                  {
                    "field": "Year > Quarter",
                    "group": "Stack"
                  }
                ],
                "color": {
                  "field": "Year > Quarter"
                },
                "tooltip": [
                  {
                    "field": "Sales"
                  }
                ]
              },
              "config": {
                "axisMode": "Radial",
                "style": {
                  "stroke": "White",
                  "strokeWidth": 2
                }
              }
            }
          ],
          "config": {
            "palette": [
              "#04864F",
              "#1473BC",
              "#F79503",
              "#C52D36",
              "#F9F389",
              "#15ADE9",
              "#0E5F46",
              "#FFF73B"
            ],
            "plotAreas": [
              {
                "axes": [
                  {
                    "plots": [
                      "p1"
                    ],
                    "type": "X",
                    "position": "None"
                  },
                  {
                    "plots": [
                      "p1"
                    ],
                    "scale": {
                      "type": "Percentage"
                    },
                    "type": "Y",
                    "position": "None"
                  }
                ]
              }
            ]
          },
          "data": {
            "name": "sample",
            "dateFormats": false,
            "values": [
              {
                "Sales": 4590,
                "download": 3779,
                "Quarter": "Q1",
                "Year": "2008"
              },
              {
                "Sales": 3466,
                "download": 5261,
                "Quarter": "Q2",
                "Year": "2008"
              },
              {
                "Sales": 9207,
                "download": 6211,
                "Quarter": "Q3",
                "Year": "2008"
              },
              {
                "Sales": 7938,
                "download": 5773,
                "Quarter": "Q4",
                "Year": "2008"
              },
              {
                "Sales": 3719,
                "download": 6862,
                "Quarter": "Q1",
                "Year": "2009"
              },
              {
                "Sales": 7900,
                "download": 837,
                "Quarter": "Q2",
                "Year": "2009"
              },
              {
                "Sales": 2918,
                "download": 1456,
                "Quarter": "Q3",
                "Year": "2009"
              },
              {
                "Sales": 3386,
                "download": 3923,
                "Quarter": "Q4",
                "Year": "2009"
              },
              {
                "Sales": 6749,
                "download": 7840,
                "Quarter": "Q1",
                "Year": "2010"
              },
              {
                "Sales": 8522,
                "download": 505,
                "Quarter": "Q2",
                "Year": "2010"
              },
              {
                "Sales": 4926,
                "download": 6214,
                "Quarter": "Q3",
                "Year": "2010"
              },
              {
                "Sales": 7066,
                "download": 2777,
                "Quarter": "Q4",
                "Year": "2010"
              },
              {
                "Sales": 4804,
                "download": 1087,
                "Quarter": "Q1",
                "Year": "2011"
              },
              {
                "Sales": 9973,
                "download": 5320,
                "Quarter": "Q2",
                "Year": "2011"
              },
              {
                "Sales": 1190,
                "download": 6557,
                "Quarter": "Q3",
                "Year": "2011"
              },
              {
                "Sales": 9757,
                "download": 7144,
                "Quarter": "Q4",
                "Year": "2011"
              },
              {
                "Sales": 103,
                "download": 2308,
                "Quarter": "Q1",
                "Year": "2012"
              },
              {
                "Sales": 3187,
                "download": 1634,
                "Quarter": "Q2",
                "Year": "2012"
              },
              {
                "Sales": 9224,
                "download": 1721,
                "Quarter": "Q3",
                "Year": "2012"
              },
              {
                "Sales": 3177,
                "download": 26,
                "Quarter": "Q4",
                "Year": "2012"
              },
              {
                "Sales": 2238,
                "download": 6796,
                "Quarter": "Q1",
                "Year": "2013"
              },
              {
                "Sales": 8762,
                "download": 3394,
                "Quarter": "Q2",
                "Year": "2013"
              }
            ]
          }
        }
      }
    }
  ]
}