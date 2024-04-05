---
title: Workflows
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';

# Workflows

logic-based automated series of API calls
(Yabbr API calls?)

Comprised of various 'steps' and 'conditions', uses JSON and API calls to send, interpret, and make decisions based on data

A workflow can be run manually using the power button or by making a post request to the destination of the workflow (/workflow/start)
IMPORTANT: IT MUST BE THE START ENDPOINT

## Setup

To create a new workflow, navigate to the workflows section on the sidebar:

<CustomisableImage src="/img/workflows-sidebar.png" alt="Workflows Sidebar Nav" width="500"/>

Then, click on '+ New Workflow':

<CustomisableImage src="/img/workflows-new.png" alt="New Workflow" width="500"/>

Clicking that button will open this menu:

<CustomisableImage src="/img/workflows-new-menu.png" alt="New Workflow Menu" width="500"/>

Give your new workflow a name under 'Workflow Name'. This will be used to help identify your workflow within your workspace. Finally, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">Create</Tag> to finalise the initialisation of your new workflow.

## Configuration

Your workflow will start empty. It will look like this:

<CustomisableImage src="/img/workflows-config.png" alt="Empty Workflow" width="700"/>

Each button on this toolbar will help you start creating and customising your workflow. From top to bottom and left to right, these buttons are:
- **Edit/Pencil Icon**: WIP
- **Power Button**: runs the workflow once.
- **Upload Button**: WIP
- **Download Button**: WIP
- **Add (+) Button**: Adds a new step to the workflow.
- **Save Icon**: View all recent changes to the workflow. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">PUBLISH 1 CHANGES</Tag> to save and publish these changes.
- **Active**: WIP
- **Unassigned**: New steps that have not been allocated a location in the workflow will appear here.
- **Logs**: WIP
- **Question Mark**: WIP
- **Lock Button**:  WIP

### Steps and Workflow Logic

When you create a new step in your workflow, the following menu will appear.

<CustomisableImage src="/img/new-step-menu.png" alt="New Step JSON" width="500"/>

All of the logic in the workflows is encoded as JSON. To configure a piece of JSON logic in your workflow:

1. Edit the JSON
2. Check that the formatting is correct by clicking the <Tag colour="#FFFFFF" borderColour="#1582d8" fontColour="#1582d8">VALIDATE</Tag> button in the bottom right.
2. Ensure the program says 'Valid JSON' in the bottom left. Otherwise, format your JSON correctly and validate until 'Valid JSON' appears.
3. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">UPDATE DRAFT</Tag> to save the changes.
4. At later stages, you can also click <Tag colour="#ff5252" borderColour="#ff5252" fontColour="#FFFFFF">REMOVE</Tag> to delete the step from the workflow.

:::warning Warning
Deleting a step from your workflow will also delete any steps that follow it.
:::

When creating a new step, you need to specify the 'description' and 'name' property:
- **description**: a short explanation of what the step is doing.
- **name**: the name of the step. This is used to identify steps within your workflow.

Your new step will appear below the toolbar and should look something like this:

<CustomisableImage src="/img/new-step.png" alt="New Step" width="300"/>

:::note Note
If you create a new step and it does not appear here, it may be stored underneath the 'Unassigned' tab in the toolbar.
:::

The '&#123;...&#125;' button will display an overview of the JSON for the entire step. The cloud download button is for the [fetch](#fetch) function in your step. The file add button is for the [stream](#stream) function in your step. The '+' button will add a new [condition](#conditions) to your step. 

#### Passing Data

A workflow automation revolves around the flow of data, API requests, and data evaluations. To maintain the flow of data, your properties can refer to 'variables'. These variables are indicated by double curly braces: &#123;&#123;example&#125;&#125;. This variable is most frequently JSON. To access the value of certain properties of this JSON, use dot notation (eg &#123;&#123;example.property_name&#125;&#125;).

Some common variables are:
- **payload**: this is the data that has been passed to this step. The step may have received this data from a POST request or a previous step. 
- **fetched**: this is the data received from the [fetch](#fetch) function in your step. &#123;&#123;fetched.status&#125;&#125; will return the HTTP status code of your request. &#123;&#123;fetched.data&#125;&#125; is the body of the data.
- **CREDENTIAL**: this is the data present in your [Credential Vault](./credential-vault.md).

An example of variables in action is below. The program will evaluate "&#123;&#123;fetched.status&#125;&#125;" as the HTTP status code of an earlier fetch function, and thus store this in the "value1" property.:

```jsx title="Example Variable JSON"
{
  "conditionCombiner": "&&",
  "group": null,
  "conditions": [
    {
      "value2": 200,
      "value1": "{{fetched.status}}",
      "operator": "=="
    }
  ],
  "name": ""
}
```

Data to use within your workflow will usually come from two main sources: API requests and files. To get data from an API request, use the [Fetch](#fetch) function. To get data from a file, use the [Stream](#stream) function.

:::note Note
When a POST request is made to the start endpoint of the workflow, the body of the request will be the payload for the first step of the workflow.
:::

[comment]: <> (check the wording of this whole section, especially the Note. Also do the same for #Workflows and ##Activating a Workflow)

#### Fetch

This function will make an API request and store the body of the response in &#123;&#123;fetched.data&#125;&#125;. When creating a new fetch request, the following JSON will appear:

```jsx title="fetch JSON"
{
  "type": "https",
  "verb": "POST",
  "url": "api.yabbr.io/2019-01-23/example",
  "headers": {
    "example-api-key": "apiKeyValue"
  },
  "body": {
    "examplePropertyOne": "valueOne",
    "examplePropertyTwo": "propertyTwo"
  },
  "nextStep": []
}
```

Here is an explanation of what each property does. Remember that this step is essentially just an API request:
- **type**: the type of protocol to use for the request.
- **verb**: the HTTP request method.
- **url**: the API endpoint to send the request to.
- **headers**: the headers of your API request.
- **body**: the body of your API request.
- **nextStep**: WIP

Any other necessary properties follow standard API request standards.

#### Stream

```jsx title="stream JSON"
{
  "skipLines": 1,
  "url": "{{fetched.data.file.url}}",
  "fileType": "csv",
  "delimiter": ",",
  "includeEmpty": false
}
```

#### Conditions

Conditions compare sets of data, and executes different actions depending on the outcome of that comparison. For example, it may check if a certain data value from an API request in the previous step is equal to a certain target value. Upon creating a new condition, you will be met with the following JSON:

```jsx title="eval-meta JSON"
{
  "conditionCombiner": "&&",
  "group": null,
  "conditions": [
    {
      "value2": 200,
      "value1": "{{example.property}}",
      "operator": "=="
    }
  ],
  "name": ""
}
```

Here is an explanation of what each property does:
- **conditionCombiner**: if you have multiple conditions, this is the logical operator used to combine them into one condition. "&&" is an AND logical operator (all conditions must be met), and "||" is an OR logical operator (at least one condition must be met).
- **group**: WIP
- **conditions**: the data comparisons/conditions. This is an array of objects. Each condition is a separate object. To add a new condition, add a new object within this array. All objects must be separated by commas.
    - **value2**: one value being compared.
    - **value1**: another value being compared.
    - **operator**: the comparison operator between value1 and value2 (eg ==, !=, &#60;=, &#62;=, &#60;, &#62;, in, !in, etc.)
- **name**: the name of the condition. Used to identify conditions within a step.


## Activating a Workflow

A workflow will be activated if someone makes a POST request to the start endpoint of the workflow
Otherwise you can activate it manually using the power button to test it with test data.
IMPORTANT: IT MUST BE THE START ENDPOINT
WIP

