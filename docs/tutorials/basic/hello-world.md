---
title: Hello, World!
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Hello, World!

<div className="dubheader">Goal</div>

This tutorial will give you the essential skills needed to effectively create, manage, and navigate Workflows. You'll learn how to create a step, add conditions, add actions, use the JSON editor, and test your workflows. By mastering these foundational aspects, you'll be able to lay the groundwork for any Workflows project.

When run, this workflow will output the value "Hello, World!". 

<br/>

<div className="dubheader">Prerequisites</div>

- basic understanding of JSON
- elementary programming and technical knowledge

<br/>

## The Workflow

<div className="dubheader">Desired Output</div>

<br/>

```jsx title="Hello, World!"
{
    "value": "Hello, World!"
}
```

<br/>


<div className="dubheader">Explanation</div>

The workflow will work like this: An API caller sends a POST request to the workflow (which will be simulated by our test). This activates the first step, where there is an empty condition. This empty condition will always evaluate as true, and then execute its actions. This action will be a "Return to Caller" action, which will send a response back to the API caller. In this case, we want this response to be `{"value": "Hello, World!"}`.

<br/>

<div className="dubheader">Walk-through</div>

**1.** Create a new Workflow and give it an appropriate name like "Hello World" or "My First Workflow".

<br/>

<CustomisableImage src="/img/hello-world-setup.png" alt="Create New Workflow" width="500"/>

**2.** In your new workflow, create a new step. This step will be returning the value "Hello, World!". Give it an appropriate name (`"name"`) and description (`"description"`) to match this functionality. 

<CustomisableImage src="/img/hello-world-step.png" alt="Creating the First Step" width="500"/>

<br/>

[comment]: <> (may need to make this ^ above image more accurate - put in some actual values for the description and name as an example.)

**3.** Add a condition. Make it empty by making the `"conditions"` array empty. Give it an appropriate name (`"name"`) like "Empty Condition".

<CustomisableImage src="/img/hello-world-condition.png" alt="Creating an Empty Condition" width="300"/>

<br/>

**4.** Add a new "Return to Caller" action to the empty condition.

<CustomisableImage src="/img/hello-world-action.png" alt="Adding the Return Action" width="500"/>

<br/>

**5.** Insert `"value": "Hello, World!"` into the `"body"` of the return action.

<CustomisableImage src="/img/hello-world-return.png" alt="Configuring the Return Action" width="350"/>

<br/>

**6.** Save your changes.

<CustomisableImage src="/img/hello-world-save.png" alt="Saving the Workflow" width="600"/>

<br/>

**7.** Test your workflow.

<CustomisableImage src="/img/hello-world-test.png" alt="Testing the Workflow" width="400"/>

<br/>

:::info INFO
The link that appears underneath "Start" (hidden by white in the image above) is the "start" API endpoint of this specific workflow. If an external caller where to send a POST request to that URL, it would activate the workflow and then receive `{"value": "Hello, World!"}` as a response.
:::

<br/>


<div className="dubheader">Full Workflow JSON</div>

```jsx
[
  {
    "id": null,
    "eval": [
      {
        "name": "Empty Condition",
        "conditionCombiner": "&&",
        "conditions": [],
        "actions": [
          {
            "body": {
              "value": "Hello, World!"
            },
            "type": "return",
            "nextStep": []
          }
        ],
        "group": null
      }
    ],
    "fetch": {},
    "name": "First Step",
    "lastUpdated": "2024-05-23T11:22:27.024Z",
    "description": "Returns Hello World to the caller",
    "created": "2024-05-23T11:22:27.024Z",
    "workflowId": null
  }
]
```

:::info Important
- this JSON does not include the values for `"id"` and `"workflowId"`. These are unique to your workflow.
- Read about the "Upload Button" and "Download Button" [here](../../workflows.md#configuration). It will show you how to utilise this Full Workflow JSON.
:::

