report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/XBSHomepage-PoC_XBS_Homepage_0_sectionsection--textsection--text-doublefadeslightel__show_0_laptop.png",
        "test": "../bitmaps_test/20221220-154605/XBSHomepage-PoC_XBS_Homepage_0_sectionsection--textsection--text-doublefadeslightel__show_0_laptop.png",
        "selector": "section.section--text.section--text-double.fades.light.el__show",
        "fileName": "XBSHomepage-PoC_XBS_Homepage_0_sectionsection--textsection--text-doublefadeslightel__show_0_laptop.png",
        "label": "XBS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://crossborder.ai/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "laptop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 3.4969860406091366,
          "misMatchPercentage": "3.50",
          "analysisTime": 31
        },
        "diffImage": "../bitmaps_test/20221220-154605/failed_diff_XBSHomepage-PoC_XBS_Homepage_0_sectionsection--textsection--text-doublefadeslightel__show_0_laptop.png"
      },
      "status": "fail"
    }
  ],
  "id": "XBS Homepage - PoC"
});