---
title: Fetch Requests
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Fetch Requests


<div className="dubheader">Goal</div>

This tutorial will teach you how to use [fetch requests](../../workflows.md#fetch). It is an API request that is sent at the beginning of a step, and then the returned data is stored in the `{{fetched}}` placeholder. You can use them to retrieve data from any destination if you have the right authentication.

[comment]: <> (Potential addition - You could even retrieve information from another workflow using its URL, or retrieve information about your workspace using the Yabbr API. WIP)

This tutorial will be using a public weather API called [Open Meteo](https://open-meteo.com/). The final workflow should notify the API caller if there is a threat of violent rain. If there is no threat of violent rain, it should say that the weather is safe.



<br/>

<div className="dubheader">Prerequisites</div>

- Tutorial 1: Hello, World!
- Tutorial 2: Placeholders
- Tutorial 3: Conditions
- Elementary understanding of APIs

<br/>

## The Workflow

<div className="dubheader">Desired Output</div>

<br/>

```jsx
// When the weather is dangerous

{
    "message": "Dangerous weather: Violent Rain. Be cautious."
}

// When the weather is not dangerous

{
    "message": "Safe weather"
}

```

<br/>


<div className="dubheader">Explanation</div>

An API caller activates the workflow. The first step will send a GET request to the weather API and retrieve the weather code. If the weather code indicates dangerous weather (code 82), the workflow will return a warning to the caller. Otherwise, the workflow will just say that the weather is safe.



<br/>

<div className="dubheader">Walk-through</div>

**1.** Create a new workflow and a new step. In this step, create a new fetch request.

<CustomisableImage src="/img/fetch-fetch.png" alt="New Fetch Request" width="400"/>

<br/>

**2.** In the fetch request, we want to retrieve the weather code from the Open Meteo API. See the documentation [here](https://open-meteo.com/en/docs). You can customise your own API URL using that documentation, or just use the one in this tutorial. The API URL used here will retrieve the current weather code in Brisbane. 
- we are using a GET request to retrive this data. So, `"verb"` will be `"GET"`.
- the request does not require authentication. So, `"headers"` will be empty.
- we are making a HTTPS request. So, `"type"` will be `"https"`.
- the GET request does not require a body. So, `"body"` will be empty.
- the `"url"` will be our API endpoint. Note that the workflow will automatically insert `"https://"` at the start of the URL. Thus, it is omitted from our URL string.

```jsx title="Fetch Request"
{
  "verb": "GET",
  "headers": {},
  "type": "https",
  "body": {},
  "url": "api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=weather_code"
}
```

<br/>

**3.** Create a new condition. Give it a `"group"` name like `"rainy"` to create a condition group. This condition will check to see if the weather code is dangerous. You can see what each weather code means below, but for this tutorial we will say that weather code 82 is dangerous. To retrieve the weather code from our request, we need to use the placeholder `{{fetched.data.current.weather_code}}`. We are checking if this value is equivalent to 82.

```jsx title="Violent Weather Condition"
{
  "name": "Violent Rain",
  "conditionCombiner": "&&",
  "conditions": [
    {
      "value2": "82",
      "value1": "{{fetched.data.current.weather_code}}",
      "operator": "=="
    }
  ],
  "group": "rainy"
}
```

<br/>

<CustomisableImage src="/img/fetch-weather-codes.png" alt="Weather Codes" width="500"/>

**4.** The second condition will belong to the same `"rainy"` group, but it will be empty. This is the `else` statement that will execute when the weather code is not 82.

```jsx title="Safe Weather Condition"
{
  "name": "Safe",
  "conditionCombiner": "&&",
  "conditions": [],
  "group": "rainy"
}
```

<br/>

**5.** Return the appropriate message for each condition.

```jsx title="Return Actions"
// Violent Condition
{
  "body": {
    "message": "Dangerous weather: Violent Rain. Be cautious."
  }
}

// Safe condition
{
  "body": {
    "message": "Safe weather"
  }
}
```

<br/>

**6.** The workflow is done. Test it out. You can also play around with different weather codes, weather data, and conditions. You could try returning some of the fetched data.







[comment]: <> (note at the end that you can use Scheduled Events to repeat this workflow every day to check if the weather is dangerous and then send a message to customers. WIP)



<br/>

<div className="dubheader">Full Workflow JSON</div>

```jsx
[
  {
    "id": null,
    "eval": [
      {
        "name": "Violent Rain",
        "conditionCombiner": "&&",
        "conditions": [
          {
            "value2": "82",
            "value1": "{{fetched.data.current.weather_code}}",
            "operator": "=="
          }
        ],
        "actions": [
          {
            "body": {
              "message": "Dangerous weather: Violent Rain. Be cautious."
            },
            "type": "return"
          }
        ],
        "group": "rainy"
      },
      {
        "name": "Safe",
        "conditionCombiner": "&&",
        "conditions": [],
        "actions": [
          {
            "body": {
              "message": "Safe weather"
            },
            "type": "return"
          }
        ],
        "group": "rainy"
      }
    ],
    "fetch": {
      "action": {
        "verb": "GET",
        "headers": {},
        "type": "https",
        "body": {},
        "url": "api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=weather_code"
      }
    },
    "created": "2024-05-24T11:16:17.164Z",
    "description": "Checks the threat level of the current weather.",
    "lastUpdated": "2024-06-01T05:09:52.130Z",
    "name": "Check the Weather",
    "workflowId": null
  }
]
```
