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

request sender -> workflow

request sender (+data) -> step 1 fetch data -> step 1 make decision based on data -> store data or send to a new step

<br/>

## Setup

To create a new workflow, navigate to the workflows section on the sidebar:

<CustomisableImage src="/img/workflows-sidebar.png" alt="Workflows Sidebar Nav" width="500"/>

Then, click on '+ New Workflow':

<CustomisableImage src="/img/workflows-new.png" alt="New Workflow" width="500"/>

Clicking that button will open this menu:

<CustomisableImage src="/img/workflows-new-menu.png" alt="New Workflow Menu" width="500"/>

Give your new workflow a name under 'Workflow Name'. This will be used to help identify your workflow within your workspace. Finally, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">Create</Tag> to finalise the initialisation of your new workflow.

<br/>

## Configuration

Your workflow will start empty. It will look like this:

<CustomisableImage src="/img/workflows-config.png" alt="Empty Workflow" width="700"/>

Each button on this toolbar will help you start creating and customising your workflow. From top to bottom and left to right, these buttons are:
- **Edit/Pencil Icon**: WIP (edit the properties of the workflow? eg timezone?)
- **Power Button**: runs the workflow once.
- **Upload Button**: WIP (i think this is the 'store' Alex is referring to)
- **Download Button**: WIP
- **Add (+) Button**: Adds a new step to the workflow.
- **Save Icon**: View all recent changes to the workflow. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">PUBLISH 1 CHANGES</Tag> to save and publish these changes.
- **Active**: WIP
- **Unassigned**: New steps that have not been allocated a location in the workflow will appear here.
- **Logs**: WIP
- **Question Mark**: WIP
- **Lock Button**:  WIP

:::caution CAUTION
Any changes made to a workflow will be lost if you do not save them.
:::

<br/>

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

<br/><br/>

When creating a new step, you need to specify the 'description' and 'name' property:
- **description**: a short explanation of what the step is doing.
- **name**: the name of the step. This is used to identify steps within your workflow.

Your new step will appear below the toolbar and should look something like this:

<CustomisableImage src="/img/new-step.png" alt="New Step" width="300"/>

:::note Note
If you create a new step and it does not appear here, it may be stored underneath the 'Unassigned' tab in the toolbar.
:::

The '&#123;...&#125;' button will display an overview of the JSON for the entire step. The cloud download button is for the [fetch](#fetch) request in your step. The file add button is for the [stream](#stream) function in your step. The '+' button will add a new [condition](#conditions) to your step.

:::info Important
A step will usually follow the same format comprised of three stages. It will gather data (fetch and stream), evaluate the data (condition), and then make decisions based on the evaluation (actions).
:::

<br/>

#### Placeholders

A workflow automation revolves around the flow of data, API requests, and data evaluations. To maintain the flow of data, your properties can refer to 'placeholders'. These placeholders are indicated by double curly braces: &#123;&#123;example&#125;&#125;. Placeholders point to a value that is defined elsewhere. For example, the &#123;&#123;fetched.status&#125;&#125; placeholder points to the HTTP status code of a step's fetch request.

:::info IMPORTANT
When placeholders point to objects, to access the values of the object's properties, use dot notation (eg &#123;&#123;example.property_name&#125;&#125;).
:::

<br/><br/>

These placeholders can point to two different types of data stores - static and dynamic. Static data stores do not change; they are predetermined. Dynamic data stores will change depending on the outcomes of steps in the workflow. There are two static data stores and seven dynamic data stores you can use in a workflow:

<br/>

<u>Static Data Stores:</u>
- **store**: data added to the 'store' object in the workflow.
- **CREDENTIAL**: data stored in your [Credential Vault](./credential-vault.md). This is most commonly API keys or environment data.

<br/>

<u>Dynamic Data Stores:</u>
- **payload**: data that has been passed to a step. The step may have received this data from a POST request or a previous step. 
- **fetched**: data received from the response of the [fetch](#fetch) request in a step. Formatted as  &#123; status: xxx, data:&#123;&#125; &#125;. &#123;&#123;fetched.status&#125;&#125; will return the HTTP status code of the request. &#123;&#123;fetched.data&#125;&#125; is the body of the data. (is this global in a workflow like HTTP or is it local to a step? WIP)
- **http**: data received from the response of a http request. Formatted as  &#123; status: xxx, data:&#123;&#125; &#125;.
- **memory**: data stored within the current step. It is cleared once the step is completed. Learn more about memory [here](#stream). WIP
- **instance**: data stored in the current instance. This data store can change across steps. WIP - no idea what this means. (instance.instanceCreated)
- **execKeys**: an execKey generated in a step. WIP
- **instanceKey**: the current instance ID. WIP



<br/>

:::note Note
- If the value for a placeholder cannot be found, it will return the placeholder name as a string. WIP
- the payload for the first step of a workflow is the body of the POST request to the workflow.
:::

<br/>

[comment]: <> (could make an interactive placeholder example here.)

Consider the example below. The "value1" property has value "&#123;&#123;fetched.status&#125;&#125;". 

```jsx title="Example Placeholder JSON"
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

If the HTTP status code of the fetch request was 200, then the workflow will evaluate this JSON as:

```jsx title="Placeholder Evaluation"
{
  "conditionCombiner": "&&",
  "group": null,
  "conditions": [
    {
      "value2": 200,
      "value1": 200,
      "operator": "=="
    }
  ],
  "name": ""
}
```


[comment]: <> (check the wording of this whole sectione. Also do the same for #Workflows and ##Activating a Workflow)

#### Other Substitutions

While placeholders are subtitutes for data stores, a workflow can also have subsitutes for maths, random values, and dates.

<u>Math Expression:</u>
A math expression takes the form "M&#123;maths-goes-here&#125;". For example, the expression "M&#123;2 * (1 + 3)&#125;" would be a subtitute for 8. This substitution supports the standard maths operations: +, -, *, /, **, %.

<u>Random Integer:</u>
A random integer can be expressed as "R&#123;lower_bound,upper_bound&#125;". In the workflow, this expression will be evaluated as a random integer from the lower bound to the upper bound. If not given, the default lower bound is 0, and the default upper bound is 100.

<u>Random Boolean:</u>
A random boolean expression will be randomly evaluated as either true or false. The chance of it being true or false can be also be defined. The full expression for a random boolean is "RB&#123;chance_of_true&#125; where chance_of_true is the likelihood on a scale from 0 to 1 that the expression is evaluated as true. The complement of that chance is the chance the expression is evaluated as false.

<u>Date:</u>
In general, "D&#123;&#125;" is a substitute for a date value. The default value is an ISO string of the current time. The default timezone used is the timezone property of the workflow (to see this timezone go to the workflow header and click on the pencil icon). You can customise the date value by adding 'rules'. A rule goes inside the curly braces. It follows the format "rule_name=rule_value". Multiple rules are joined using '^'. 
The rules are:
- **date**: the actual time you want to reference in ISO format.
- **rule**: modifies the date by a set amount. It takes three values in the form "rule=operator,amount,time_unit". The operator is how the rule is changing the date (add/subtract). Then, the rule changes the date by the amount of time units. For example, "rule=1,add,hour" will add one hour to the date.
- **timezone**: the timezone you want the date to appear in. It should be formatted as "Country/City".
- **format**: the display format for the date. For example, "DD/MM/YYYY" will convert ISO format "2024-09-06T18:42:25" into "06/09/2024".

Here is an example of all the rules in action:

"D&#123;date=&#123;&#123;instance.instanceCreated&#125;&#125;^rule=add,1,day^timezone=Australia/Brisbane^format=YYYYMMDD&#125;"

This will be evaluated as the time when the workflow started running in Brisbane, plus a day, in the format YYYYMMDD.

:::tip TIP
You can combine forms of subtitution. For example, you could perform mathematical operations on a placeholder value: M&#123; &#123;&#123;payload.price&#125;&#125; * 0.95 &#125;.
:::

#### Fetch

This function will make an API request. The response will be stored in the form &#123; status: xxx, data:&#123;&#125; &#125; where the data object is the body of the API response. This data store can be referenced elsewhere in the step using the  &#123;&#123;fetched&#125;&#125; placeholder.

When creating a new fetch request, the following JSON will appear:

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
- **verb**: the HTTP request method (eg GET, POST, FETCH).
- **url**: the API endpoint to send the request to.
- **headers**: the headers of your API request.
- **body**: the body of your API request.
- **nextStep**: WIP

Any other necessary properties follow standard API request standards.

#### Stream

The stream function will extract information from a file to use within a step. This process is slightly different for different file types.

When you click to create a stream function in a step, the following JSON will appear:

```jsx title="stream JSON"
{
  "skipLines": 1,
  "url": "{{fetched.data.file.url}}",
  "fileType": "csv",
  "delimiter": ",",
  "includeEmpty": false,
  "headerIndex": 0
}
```

Here is an explanation of what each property does:
- **skipLines**: unsure WIP.
- **url**: the destination of the file.
- **fileType**: the type of file you are using.
- **delimiter**:  if the data is extracted and stored as an array, this will be the character that separates each piece of data.
- **includeEmpty**: unsure WIP
- **headerIndex**: (optional) will use the first line of a CSV file as column titles. This will allow you to refer to column titles instead of column indexes when retrieving data. WIP

Once you have extracted the data, you need a way of accessing it. The data is stored differently depending on the file type, so the access methods will be different for each. Generally, all the data is stored in &#123;&#123;memory.record&#125;&#125;.

<u>txt</u>: returns &#123;&#123;memory.record&#125;&#125; as an array. Each line of the file is stored as a whole string. Each of these strings is stored in the array and separated by the "delimiter" defined earlier. An example txt file with "delimiter": ",":

```txt
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 

Vivamus rhoncus magna congue ornare lacinia. 

Sed vitae orci vitae dolor ultrices ultricies.
```

Would be stored as the array:

```jsx
["Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

"Vivamus rhoncus magna congue ornare lacinia.",

"Sed vitae orci vitae dolor ultrices ultricies."]
```

:::tip TIP
To reference a specific line in the file, use dot notation followed by the index of the line. For example, &#123;&#123;memory.record.2&#125;&#125; would return the third line of the file.
:::

<u>csv</u>: WIP - I tried playing with it and it only ever gave me the last line



#### Conditions

Conditions compare sets of data, and executes different actions depending on the outcome of that comparison. For example, it may check if a certain data value from an API request is equal to a certain target value. Upon creating a new condition, you will be met with the following JSON:

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
    - **operator**: the comparison operator between value1 and value2 (see [here](#operators) for a list of all available operators and their function)
- **name**: the name of the condition. Used to identify conditions within a step.

##### Operators

The operators follow javascript conventions. For example "&#62;" can compare the value of two numbers or the alphabetic order of two strings.

The operators you can use within a condition are:
- **==**: value1 equals value2
- **!=**: value1 does not equal value2
- **&&**: value1 and value2 are both truthy 
- **||**: either value1 or value2 is truthy
- **&#62;**: value1 is greater than value2 (numerically for numbers, alphabetically for strings. Same applies for the next three operators)
- **&#60;**: value1 is less than value2
- **&#62;=**: value1 is greater than or equal to value2
- **&#60;=**: value1 is less than or equal to value2
- **sw**: value1 starts with value2 (string only)
- **ew**: value1 ends with value2 (string only)
- **!sw**: value1 does not start with value2 (string only)
- **!ew**: value1 does not end with value2 (string only)
- **in**: value1 includes value2 (string or arrays)
- **!in**: value1 does not include value2 (string or arrays)
- **fi**: value2 includes value1 / value1 found in value2 (string or arrays)
- **!fi**: value2 does not include value1 / value1 not found in value2 (string or arrays)
- **tr**: value1 is truthy
- **!tr**: value1 is not truthy

#### Actions

After creating a condition, an extra option will appear at the bottom of the step. This is where you add actions to your step. Each action is connected to a condition, and will only run if the condition is satisfied. Every condition in a step can have unique actions associated with it. Actions are also the final stage of a step. To add a new action to a condition, click on the '+' button and select the desired action type.

<CustomisableImage src="/img/new-action.png" alt="New Action" width="500"/>

Each type of action serves a unique purpose:

<u>HTTPS Request</u>: creates an API request. It is functionally identical to the earlier [fetch](#fetch) request. The data from this request is stored under &#123;&#123;http&#125;&#125; instead. &#123;&#123;http&#125;&#125; data is not cleared at the end of a step and will hold its value until changed. 

If multiple HTTP requests are made in a workflow, then only the data from the latest request will be stored. To store multiple HTTP requests, you need to name them. To name a HTTP request, insert the "name" property into its JSON. The value of that property will be the name of your request. Then, to access that request's data, format your placeholder like "&#123;&#123;http.request_name&#125;&#125;".

<u>Return to Caller</u>: sends data to the sender of the POST request that activated the workflow. The JSON for this action is:

```jsx title="action-return"
{
  "body": {
    "examplePropertyOne": "valueOne",
    "examplePropertyTwo": "propertyTwo"
  },
  "nextStep": []
}
```

nextStep WIP

The `"body"` object is the data being sent. You can put any JSON data inside this object.

<u>Save to Instance</u>: WIP

<u>Repeat Eval</u>: restarts the step with a new payload. The new payload is the JSON defined in this action. Selecting this action will present you with a blank object. The data within this object will be sent back to the start of the step as the payload.

<u>Execute Step</u>: passes a new payload to the next step. It is functionally the same as the 'Return to Caller' JSON. The `"body"` of this action is the payload of the next step.

<u>Stream To</u>: WIP

## Activating a Workflow

when running:
it is run asynchronously

when activating:
A workflow will be activated if someone makes a POST request to the start endpoint of the workflow
Otherwise you can activate it manually using the power button to test it with test data.
IMPORTANT: IT MUST BE THE START ENDPOINT
WIP







[comment]: <> (gotta work on the spacing here. It either seems cluttered or inconsistent)

[comment]: <> (maybe link some more things around - link the upload data/store function to the store placeholder. Link other placeholders as well like the http placeholder to the http request action.)

[comment]: <> (use the mini code blocks more often, especially for the placeholders or when referring to items in a codeblock)

[comment]: <> (fundamental questions. Does payload get overwritten? Or does it automatically change every step? Is it always the data from the previous step? If you don't define the payload in a previous step, what is it in the next step? Similar questions for fetched. Does fetched get erased at the end of a step? Or does it carry over to the next step until overwritten?)

