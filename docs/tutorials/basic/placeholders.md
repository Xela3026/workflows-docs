---
title: Placeholders
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Placeholders

<div className="dubheader">Goal</div>

This tutorial will teach you how to use [placeholders](../../workflows.md#placeholders). They are functionally the same as variables. You can use them to store and reference data throughout a workflow. The two types of placeholders this tutorial will use are called `{{store}}` and `{{payload}}`. `{{store}}` is a constant data storage in the workflow. `{{payload}}` is data received from the API caller.

The end goal is for the API caller to send our workflow any `"name"`, and receive back a message that includes that name: `"My name is [insert-name]"`.


<br/>

<div className="dubheader">Prerequisites</div>

- Tutorial 1: Hello, World!

<br/>

## The Workflow

<div className="dubheader">Sample Input</div>

<br/>

```jsx
{
    "name": "Alex"
}
```

<br/>


<div className="dubheader">Desired Output</div>

<br/>

```jsx title="Placeholders"
{
    "message": "My name is Alex"
}
```

<br/>


<div className="dubheader">Explanation</div>

The API caller will send a payload to the workflow with body `{"name": "anything-here"}`. In the first step, an empty condition will be activated. A Return to Caller action will be activated underneath that condition. This return action will combine the string stored in the workflow (a sentence prefix `"My name is "`) and the string received from the API caller (the name). It will then send this concatenated string back to the API caller.


<br/>

<div className="dubheader">Walk-through</div>

**1.** Create a new workflow and store the sentence prefix `"My name is "` within it. This can be achieved by finding the workflow's properties, and inserting the prefix into the `"store"` object under an appropriate key like `"prefix"`.

<CustomisableImage src="/img/placeholders-store.png" alt="Storing the Prefix" width="500"/>

<br/>

**2.** Create a new step with an empty condition. 

<CustomisableImage src="/img/placeholders-empty-condition.png" alt="Empty Condition" width="300"/>

<br/>

**3.** Add a new Return to Caller action to the empty condition. The `"body"` should include a `"message"` property that will be the concatenated string that is rerturned to the API caller. The two values we want to combine are `{{store.prefix}}` (sentence prefix stored in the workflow `"My name is "`) and `{{payload.name}}` (the name received from the API caller). This should combine into the full property `"message": "{{store.prefix}}{{payload.name}}"`.

<CustomisableImage src="/img/placeholders-return.png" alt="Return Concatenated String" width="500"/>

<br/>

**4.** Save the workflow. To test the workflow, we need to give it a payload to use. This payload must include the name we want the workflow to display. For this tutorial, we will set `"name": "Alex"` to get the desired output from the start. However, you can make `"name"` whatever you want and get a different output. Once you've added a payload, you can test the workflow.

<CustomisableImage src="/img/placeholders-test.png" alt="Testing" width="400"/>

<br/>


:::info Important
If you were sending a request to the workflow externally, the 'payload' would just become the body of your POST request.
:::

<br/>

<div className="dubheader">Full Workflow JSON</div>

```jsx
[
  {
    "id": null,
    "description": "Concatenating placeholders",
    "name": "First Step",
    "eval": [
      {
        "conditionCombiner": "&&",
        "group": null,
        "conditions": [],
        "name": "Empty Condition",
        "actions": [
          {
            "body": {
              "message": "{{store.prefix}}{{payload.name}}"
            },
            "nextStep": [],
            "type": "return"
          }
        ]
      }
    ],
    "workflowId": null,
    "fetch": {}
  }
]
```