---
title: Workflows
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';

# Workflows

Comprised of various 'steps' and 'conditions', uses JSON and API calls to send, interpret, and make decisions based on data

A workflow can be run manually using the power button or by making a post request to the destination of the workflow (/workflow/start)
IMPORTANT: IT MUST BE THE START ENDPOINT

request sender -> workflow

request sender (+data) -> step 1 fetch data -> step 1 make decision based on data -> store data or send to a new step






Activated by a POST API request to the start endpoint of the workflow. The body of that request is the payload of the first step of the workflow.

A workflow:
1. collects data
2. evaluates data
3. performs actions based on evaluation

Explain what a condition is, what a step is, what a payload is, what an instance is, how everything is in JSON, etc.

Everytime workflow is activated, it creates an instance of the workflow.

A workflow goes throw a sequence of steps. A step is comprised of data collection, evaluation, and action.

A condition is an evaluation done on data to determine what actions should be taken.



when a POST request is made, it activates the workflow. The workflow will then usually return some data back to the caller of the request.



Do like a general overview of the process here. - 1. collect data. 2. evaluate data. 3. perform actions based on evaluation.

Make a note about how steps stop at the end. The next step can only be run using an exec Key. read more here.

<br/>

## Initialisation

To create a new workflow, navigate to the workflows section on the sidebar:

<CustomisableImage src="/img/workflows-sidebar.png" alt="Workflows Sidebar Nav" width="500"/>

Then, click on '+ New Workflow':

<CustomisableImage src="/img/workflows-new.png" alt="New Workflow" width="500"/>

Clicking that button will open this menu:

<CustomisableImage src="/img/workflows-new-menu.png" alt="New Workflow Menu" width="500"/>

Give your new workflow a name under 'Workflow Name'. This will be used to help identify your workflow within your workspace. Finally, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">Create</Tag> to finalise the initialisation of your new workflow.

<br/>

## Configuration

All of the logic in the workflows is encoded as JSON. To configure a piece of JSON logic in your workflow:

1. Edit the JSON
2. Check that the formatting is correct by clicking the <Tag colour="#FFFFFF" borderColour="#1582d8" fontColour="#1582d8">VALIDATE</Tag> button in the bottom right.
2. Ensure the program says 'Valid JSON' in the bottom left. Otherwise, format your JSON correctly and validate until 'Valid JSON' appears.
3. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">UPDATE DRAFT</Tag> to save the changes.
4. At later stages, you can also click <Tag colour="#ff5252" borderColour="#ff5252" fontColour="#FFFFFF">REMOVE</Tag> to delete the step from the workflow.

<br/>

:::warning Warning
Deleting a step from your workflow will also delete any steps that follow it.
:::

<br/><br/><br/>

Your workflow will start empty. It will look like this:

<CustomisableImage src="/img/workflows-config.png" alt="Empty Workflow" width="700"/>

Each button on this toolbar will help you start creating and customising your workflow. From top to bottom and left to right, these buttons are:

<br/>

<u>Edit/Pencil Icon</u>: edit the properties of the workflow. These properties are global within the workflow. These properties are:
- **credentials**: the credentials from the [Credential Vault](./credential-vault.md) that are used in the workflow. Learn more about credentials [here](./credential-vault.md).
- **logLevel**: the level of detail in the logs. The possible values are:
  - `"off"`: no logs.
  - `"error"`: only errors are logged.
  - `"warn"`: errors and warnings are logged.
  - `"light"`: errors, warnings, and elementary information is logged.
  - `"moderate"`: errors, warnings, and some specific information about actions, groups, and steps.
  - `"debug"`: logs everything. 
- **timezone**: the default timezone the workflow will use for the [date substitutor](#other-substitutions).
- **initialStep**: the ID of the first step that will be run when the workflow is activated. To see the ID of a step, click the `{...}` button on the step and find the `"id"` property.
- **store**: information stored manually within the workflow. It is an object, so data is stored in key-value pairs. Use this to store any constants you wish to reference throughout your workflow. To learn how to access this information, see [placeholders](#placeholders).
- **name**: the title of your workflow.
- **tags**: a tag is an extra identifier you can place onto a workflow. Usually, it identifies the categories that the workflow belongs to. This property is an array. To add a tag, insert the tag as a string into the array. You can add multiple tags, but they must be distinct items in the array. An example tag property on a workflow may look like `"tag": ["Communications", "Bot", "Management"]`.


<br/>

:::caution Caution
The `"debug"` logLevel can impact performance and could possibly log sensitive information.
:::

<br/><br/>

<u>Power Button</u>: runs the workflow with test data. Used for testing the workflow. Learn more [here](#testing-the-workflow).

<br/><br/>

<u>Upload Button</u>: upload steps into workflow. Delete the curly braces that are present by default. Steps must be uploaded in a single array. Under the `{...}` button at the top of individual steps, you will find the JSON object that represents one step. Insert this object as an item within the array you are uploading. The formatting should be identical to that found in the "Download" Button adjacent to this button. Your upload should look something like this:
```jsx title="Step-Upload Formatting"
[
  {
    step_1_goes_here
  },
  {
    step_2_goes_here
  }
]
```

These steps will automatically be sent to the "Unassigned" tab. You may also need to refresh to see them.

<br/><br/>

<u>Download Button</u>: an overview of the JSON of the entire workflow. It is an array where each item is the JSON of a single step. Formatted as above.

<br/><br/>

<u>Add (+) Button</u>: Adds a new step to the workflow. Learn more about steps [here](#steps-and-workflow-logic).

<br/><br/>

<u>Save Icon</u>: View all recent changes to the workflow. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">PUBLISH 1 CHANGES</Tag> to save and publish these changes.

<br/>

:::caution CAUTION
Any changes made to a workflow will be lost if you do not save them.
:::

<br/><br/>

<u>Active</u>: All steps that are currently being used within the workflow.

<br/><br/>

<u>Unassigned</u>: All steps that are **not** currently being used within the workflow. New steps that have not been allocated a location in the workflow will appear here.

<br/><br/>

<u>Logs</u>: Records the details of every instance. Learn more about the logs [here](#logs).

<br/><br/>

<u>Question Mark</u>: the workflow will try to determine where it is being triggered and activated from. It will display those locations here. If it cannot find any, it will display a question mark.

<br/><br/>

<u>Lock Button</u>: toggles the security of the workflow. If it is 'unlocked', then the workflow can be activated without Yabbr API authentication. If it is 'locked', then a Yabbr API authentication is required to activate the workflow.

<br/><br/>



<br/>

### Steps and Workflow Logic

When you create a new step in your workflow, the following menu will appear.

<CustomisableImage src="/img/new-step-menu.png" alt="New Step JSON" width="500"/>



<br/><br/>

When creating a new step, you need to specify the 'description' and 'name' property:
- **description**: a short explanation of what the step is doing.
- **name**: the name of the step. This is used to identify steps within your workflow.

Your new step will appear below the toolbar and should look something like this:

<CustomisableImage src="/img/new-step.png" alt="New Step" width="300"/>

:::note Note
If you create a new step and it does not appear here, it may be stored underneath the 'Unassigned' tab in the toolbar.
:::

The `{...}` button will display an overview of the JSON for the entire step (including the ID of the step). The cloud download button is for the [fetch](#fetch) request in your step. The file add button is for the [stream](#stream) function in your step. The '+' button will add a new [condition](#conditions) to your step.

:::info Important
A step will usually follow the same format comprised of three stages. It will gather data (fetch and stream), evaluate the data (condition), and then make decisions based on the evaluation (actions).
:::

<br/>

#### Placeholders

A workflow automation revolves around the flow of data, API requests, and data evaluations. To maintain the flow of data, your properties can refer to 'placeholders'. These placeholders are indicated by double curly braces: `{{example}}`. Placeholders point to a value that is defined elsewhere. For example, the `{{fetched.status}}` placeholder points to the HTTP status code of a step's fetch request.

:::info IMPORTANT
When placeholders point to objects, to access the values of the object's properties, use dot notation (eg `{{example.property_name}}`).
:::

<br/><br/>

These placeholders can point to two different types of data stores - static and dynamic. Static data stores do not change; they are predetermined. Dynamic data stores will change depending on the outcomes of steps in the workflow. There are two static data stores and seven dynamic data stores you can use in a workflow:

<br/>

<u>Static Data Stores:</u>
- `{{store}}`: data added into the 'store' of the workflow. Read about the Edit Button in [Configuration](#configuration) for more details about the store.
- `{{CREDENTIAL}}`: data stored in your [Credential Vault](./credential-vault.md). This is most commonly API keys or environment data.

<br/>

<u>Dynamic Data Stores:</u>
- `{{payload}}`: data that has been passed to a step. The step may have received this data from a POST request or a previous step. 
- `{{fetched}}`: data received from the response of the [fetch](#fetch) request in a step. Formatted as  `{ status: xxx, data:{} }`. `{{fetched.status}}` will return the HTTP status code of the request. `{{fetched.data}}` is the body of the data. Learn more about fetching [here](#fetch).
- `{{http}}`: data received from the response of a http request. Formatted as  `{ status: xxx, data:{} }`. A HTTP request is slightly different from a fetched request because it is an [action](#actions).
- `{{memory}}`: data stored within the current step. Data is usually stored here via [file streaming](#stream).
- `{{instance}}`*: data stored in the current instance. By default, this data store is empty. Data can be stored here using the "Save to Instance" [action](#actions).
- `{{execKeys}}`: an execution key generated in a step. Learn more about execution keys [here](#execution-keys).
- `{{instanceKey}}`: the ID of the current instance of the workflow.

:::info Important
`{{payload}}`, `{{fetched}}`, and `{{memory}}` are local to a step. They are cleared at the end of a step.
:::

<br/>

If the value of a placeholder cannot be found, it will return the placeholder name as a string. However, this will also prevent the JSON from being evaluated. To override this failsafe and evaluate the JSON anyways, add the `“permitUndefinedExecution”: true` property to the JSON.

<br/>

:::note Note
The payload for the first step of a workflow is the body of the POST request to the workflow.
:::

<br/>

[comment]: <> (could make an interactive placeholder example here.)

Consider the example below. The "value1" property has value "`{{fetched.status}}`". 

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
A math expression takes the form `M{maths_goes_here}`. For example, the expression `M{2 * (1 + 3)}` would be a subtitute for 8. This substitution supports the standard maths operations: +, -, *, /, **, %.

<u>Random Integer:</u>
A random integer can be expressed as `R{lower_bound,upper_bound}`. In the workflow, this expression will be evaluated as a random integer from the lower bound to the upper bound. If not given, the default lower bound is 0, and the default upper bound is 100.

<u>Random Boolean:</u>
A random boolean expression will be randomly evaluated as either true or false. The chance of it being true or false can be also be defined. The full expression for a random boolean is `RB{chance_of_true}` where chance_of_true is the likelihood on a scale from 0 to 1 that the expression is evaluated as true. The complement of that chance is the chance the expression is evaluated as false.

<u>Date:</u>
In general, `D{}` is a substitute for a date value. The default value is an ISO string of the current time. The default timezone used is the timezone property of the workflow (to see this timezone go to the workflow header and click on the pencil icon). You can customise the date value by adding 'rules'. A rule goes inside the curly braces. It follows the format "rule_name=rule_value". Multiple rules are joined using '^'. 
The rules are:
- **date**: the actual time you want to reference in ISO format.
- **rule**: modifies the date by a set amount. It takes three values in the form "rule=operator,amount,time_unit". The operator is how the rule is changing the date (add/subtract). Then, the rule changes the date by the amount of time units. For example, "rule=1,add,hour" will add one hour to the date.
- **timezone**: the timezone you want the date to appear in. It should be formatted as "Country/City".
- **format**: the display format for the date. For example, "DD/MM/YYYY" will convert ISO format "2024-09-06T18:42:25" into "06/09/2024".

Here is an example of all the rules in action:

`D{date={{instance.instanceCreated}}^rule=add,1,day^timezone=Australia/Brisbane^format=YYYYMMDD}`

This will be evaluated as the time when the workflow started running in Brisbane, plus a day, in the format YYYYMMDD.

:::tip TIP
You can combine forms of subtitution. For example, you could perform mathematical operations on a placeholder value: `M{{{payload.price}} * 0.95}`.
:::

#### Fetch

This function will make an API request. The response will be stored in the form `{ status: xxx, data:{} }` where the data object is the body of the API response. This data store can be referenced elsewhere in the step using the  `{{fetched}}` placeholder.

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
- **nextStep**: learn more [here](#execution-keys).

Any other necessary properties follow standard API request standards.

#### Stream

The file streaming function will extract information from a file to use within a step. This process is slightly different for different file types. The only file types currently supported are 'txt' and 'csv'.

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
- **skipLines**: the program will skip this many lines before it starts reading the file. For example `"skipLines": 1` will start reading the file on the 2<sup>nd</sup> line.
- **url**: the destination of the file.
- **fileType**: the type of file you are using.
- **delimiter**:  if the data is extracted and stored as an array, this will be the character that separates each piece of data.
- **includeEmpty**: whether to include empty lines when recording data from the file. `true` will include empty lines, `false` will ignore empty lines. Empty cells in a CSV file will never be ignored.
- **headerIndex**: (optional) will use the first line of a CSV file as column titles. This will allow you to refer to column titles instead of column indexes when retrieving data. WIP

Once you have extracted the data, you need a way of accessing it. The data is stored differently depending on the file type, so the access methods will be different for each. Generally, all the data is stored in `{{memory.record}}`.

<u>txt</u>: returns `{{memory.record}}` as an array. Each line of the file is stored as a whole string. Each of these strings is stored in the array and separated by the "delimiter" defined earlier. An example txt file with "delimiter": ",":

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
To reference a specific line in the file, use dot notation followed by the index of the line. For example, `{{memory.record.2}}` would return the third line of the file.
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
- **group**: the group that the condition belongs to. Groups are collections of conditions. Two conditions belong to the same group if their `"group"` value is the same. Conditions are evaluated from left to right in a step. If multiple conditions are satisfied but belong to the same group, only the first satisfied condition will be run. In other words, conditions in the same group act as a chain of `else if` statements.
- **conditions**: the data comparisons/conditions. This is an array of objects. Each condition is a separate object. To add a new condition, add a new object within this array. All objects must be separated by commas.
    - **value2**: one value being compared.
    - **value1**: another value being compared.
    - **operator**: the comparison operator between value1 and value2 (see [here](#operators) for a list of all available operators and their function)
    - **modifiers**: optionally add some modifiers onto the `"value1"` and `"value2"` properties. They are useful for altering any unknown input formats. This is an object with properties `"value1"` and `"value2"`. The value of these properties is the modifier to apply to them within the condition.
      - **value1**: the modifiers to apply to `"value1"` in the condition. This is an array of strings, with each string being a modifier. The only modifiers currently supported are "uppercase" and "lowercase". These convert `"value1"` into all uppercase characters and all lowercase characters respectively.
      - **value2**: the same as `"value1"`, except applied to `"value2"`.
      - an example modifier object may look like `"modifiers": {"value1": ['lowercase'], "value2": ['uppercase']}`. This will convert `"value1"` into all lowercase characters and `"value2"` into all uppercase characters in the condition.
- **name**: the name of the condition. Used to identify conditions within a step.

:::info Important
All satisfied conditions are executed, unless they are a part of a group. To create a condition that will always be true, make the `"conditions"` property an empty array.
::: 

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

##### HTTPS Request

Creates an API request. It is functionally identical to the earlier [fetch](#fetch) request. The data from this request is stored under `{{http}}` instead. `{{http}}` data is not cleared at the end of a step and will hold its value until overwritten. 

If multiple HTTP requests are made in a workflow, then only the data from the latest request will be stored. To store multiple HTTP requests, you need to name them. To name a HTTP request, insert the `"name"` property into its JSON. The value of that property will be the name of your request. Then, to access that request's data, format your placeholder like "`{{http.request_name}}`". This action also supports the `"nextStep"` property. Learn more about it [here](#execution-keys).

##### Return to Caller

Sends data to the sender of the POST request that activated the workflow. The JSON for this action is:

```jsx title="action-return"
{
  "body": {
    "examplePropertyOne": "valueOne",
    "examplePropertyTwo": "propertyTwo"
  },
  "nextStep": []
}
```

The `"body"` object is the data being sent. You can put any JSON data inside this object. Learn more about the `"nextStep"` property [here](#execution-keys).

##### Save to Instance

The JSON for the Save to Instance action consists of a single property `"store"`. This property is a two-dimensional array. Each item in the `"store"` array is a set of instructions on how and what data to save. These instructions take the form of another array. This instructional array has two mandatory items and a third optional item. So, your JSON should look something like this:

```jsx title="eval-meta"
{
  "store": [
    [
      "location1",
      "data1",
      {"flags1"}
    ],
    [
      "location2",
      "data2",
      {"flags2"}
    ]
  ]
}
```

The first item in this array is the location to store the data in. The location should be formatted as dot notation `"example.property_name"`. The only data stores permitted as locations here are instance and memory - anything else will be ignored. You can also create new properties within the data stores to save the data into here. For example, since the instance data store by default is empty, saving a piece of data to `"instance.storedValue"` will create a new property `"storedValue"` within the instance object data store, and then save your data into that new property. 

The second item in the array is the data you are saving.

The third item is an object. Within this object, you can create some "flags" to give the program some extra instructions on how you want the data to be saved. This object can have the following properties:




- `"push"`: boolean. Adds data as an element within the array of the property. Will only work if the data storage location is an array. If the data storage location does not exist, it will create it as an array. If this flag is false, it is functionally the same as the flag not existing.
- `"spread"`: boolean. Adds data as an array within the array of the property. Will only work if both the data and the data storage location is an array.  If the data storage location does not exist, it will create it as an array. If this flag is false, it is functionally the same as the flag not existing.
- `"remove"`: boolean. Removes a property from an object. The first item in the array is the property to be removed, and the second item in the array can be anything, but must exist. For example:

```jsx title="Remove Flag"
{
  "store": [
    [
      "instance.example",
      "Anything Goes Here",
      {
        "remove": true
      }
    ]
  ]
}
```

In this example, the `instance` data store will lose the `example` property. If the `"remove"` flag is false, it is functionally the same as the flag not existing.

- `"split"`: splits a string into an array. It will split the string at the value of this property. For example, if you had `"split": "."`, each item in the resultant array would be separated at the location of any periods in the original string. Consider the following example:

```jsx title="Split Flag"
{
  "store": [
    [
      "instance.example",
      "Example 1. Example 2. Example 3.",
      {
        "split": "."
      }
    ]
  ]
}
```

Here, the value of `{{instance.example}}` would be `["Example 1", " Example 2", " Example 3"]`.

:::info Important
The character that you are splitting on is not included in the resultant array.
:::

- `"slice"`: returns a small chunk from the middle of a string or array. The value of this property takes the form `[lower_bound, upper_bound]`, where the lower bound is the index of the start of the chunk, and the upper_bound is the index of the end of the chunk. The upper bound is not included in the sliced string. Consider the following example:

```jsx title="Slice Flag"
{
  "store": [
    [
      "instance.example",
      [0, 1, 2, 3, 4, 5, 6],
      {
        "slice": [2,5]
      }
    ]
  ]
}
```

Here, the value of `{{instance.example}}` would be `[2, 3, 4]`.

- `"truncate"`: returns the beginning of a string and adds a suffix. This flag is an object with properties `"length"` and `"extension"`. `"length"` is an integer value that indicates how many characters will be in the final string. `"extension"` is a string that will be appended to the end of the truncated string. Its default value is `"..."`. It should be noted that the `"length"` property includes the length of the `"extension"` string. So, consider the following example:

```jsx title="Truncate Flag"
{
  "store": [
    [
      "instance.example",
      "Elephants are wonderful creatures that can do amazing things.",
      {
        "truncate": {
          "length": 30,
          "extension": "---"
        }
      }
    ]
  ]
}
```

Here, the value of `{{instance.example}}` would be `"Elephants are wonderful cre---"`.

- `"join"`: returns an array as a string. Each item in the array is joined to the next using the value of this property. Consider the following example:

```jsx title="Join Flag"
{
  "store": [
    [
      "instance.example",
      ['one', 'two', 'three', 'four'],
      {
        "join": " and "
      }
    ]
  ]
}
```

Here, the value of `{{instance.example}}` would be `"one and two and three and four"`.

- `"replace"`: replaces certain characters with a new character. This flag is an object with the properties `"search"`, `"modifiers"`, and `"replacer"`. It works by running a regex search on a string and then replacing all matched text with the replacement string. `"search"` is a regex pattern of the text you are searching for (eg `"[0-9]{3,}-[0-9]+"`). `"modifiers"` are the regex modifiers on the pattern (eg `"gim"`). `"replacer"` is the string you are replacing the matched text with. Consider the following example:

```jsx title="Replace Flag"
{
  "store": [
    [
      "instance.example",
      "The African Elephants are wonderful creatures that can do amazing things.",
      {
        "replace": {
          "search": "t",
          "modifiers": "gi",
          "replacer": "w"
        }
      }
    ]
  ]
}
```

Here, the value of `{{instance.example}}` would be `"whe African Elephanws are wonderful creawures whaw can do amazing whings."`.

- `"parse"`: convert a string into a different data type. This property only currently supports the value `"json"` which will convert a string of a JSON object into a JSON object.
- `"increment"`: increases an existing number by the given amount. For example, `"increment: 2"` adds two to the data stored at the targetted storage location. The second item in the saving-instructions array can be anything, but it must exist. The target saving location must already exist for this flag to work. Consider the following example:

```jsx title="Increment Flag"
{
  "store": [
    [
      "instance.example",
      "Anything Goes Here",
      {
        "increment": 2
      }
    ]
  ]
}
```

If the previous value of `{{instance.example}}` was 5, then its new value will be 7. If `{{instance.example}}` has no previous value, then this expression will fail.


:::tip TIP
- You can use placeholders here like `{{payload}}` or `{{fetched}}` to save data generated earlier in the step.
- Saving data to a step's `{{memory}}` data store is useful when you are repeating the step and running it multiple times. The memory data store will survive the duration of the step, and then get wiped once the step finishes looping and goes to the a new step.
:::


##### Repeat Eval

Restarts the step with a new payload. The new payload is the JSON defined in this action. Selecting this action will present you with a blank object. The data within this object will be sent back to the start of the step as the payload.

##### Execute Step

Passes a new payload to the next step. It is functionally the same as the 'Return to Caller' JSON. The `"body"` of this action is the payload of the next step.

:::info important
Whilst the "Return to Caller" action will send the data to the API caller by default, and then use the `"nextStep"` property if specified, the "Execute Step" action has no default functionality. Without the `"nextStep"` property, it will not do anything. Learn more about this property [here](#execution-keys).
:::

##### Stream To

WIP

#### Execution Keys

Once a workflow gets to the end of a step, it stops. In order to get to a new step, you need to use an execution key. Execution keys are unique encrypted strings that point to a step in a workflow. An execution key can only be generated within the workflow. A new execution key is generated in every instance of the workflow.

When an API caller makes a POST request using an execution key, the workflow will start back up. It will start at the step within the workflow that the execution key pointed to. It will also continue the exact same instance that the execution key was created in. This means all instance data will be the same, including the instance's ID.

Imagine it as this: A step generates an execution key pointing to the next step, and then the step ends. The workflow is now in a temporary stasis. Once an API caller makes a request using the execution key, the instance of the workflow resumes from where it left off, just at a new destination.

The URL for this execution key POST request should be formatted as `https://{{insert-workflow-url}}/execute/{{insert-execution-key}}`.

An execution key can be created with a fetch request, HTTPS Request action, Return to Caller action, or Execute Step action. To create the execution key, click on the '+' button that appears underneath one of the previous functions:

<CustomisableImage src="/img/new-exec-key.png" alt="New Execution Key" width="200"/>

An execution key has a name and a destination. Its name is used to reference it later in the step. Its destination is the step that it points to. Creating a new execution key will give you the following menu:

<CustomisableImage src="/img/exec-key-menu.png" alt="New Execution Key Menu" width="300"/>

Here you can give the key a name (Key Name) and a destination (Step). You can either select a pre-existing step from the drop-down menu as your destination, or create a new step for the execution key to point to. Then, to generate the key, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">ADD KEY</Tag>. It should appear as a small yellow attachment icon.

<CustomisableImage src="/img/exec-key-symbol.png" alt="xecution Key Symbol" width="200"/>

:::info Important
Even though the UI shows the execution key being generated **after** the action, in reality, the execution key is generated **before** the action. So, in the above example, the HTTPS request could reference the execution key below it.
:::

To remove an execution key, just click on its yellow icon and click <Tag colour="#ff5252" borderColour="#ff5252" fontColour="#FFFFFF">REMOVE</Tag>. You can generate multiple execution keys with one action.

To reference an execution key within your workflow, you can use the `{{execKeys}}` data store. Each execution key will have a name. Thus, to reference a specific execution key, format a placeholder like so: `{{execKeys.name}}`, where "name" is the name of the execution key. Thus, an example execution key URL may look like `https://{{CREDENTIALS.comapny-name.workflow-url}}/execute/{{execKeys.next}}`. This request will look for the "workflow-url" property in the "company-name" credential vault and replace that first placeholder with it. Then, it will search for any execution keys generated with the name "next", and replace that second placeholder with it. Then, it will send the full request to continue the workflow at the new destination.

Since execution keys can only be generated by the workflow, for an external destination to access an execution key, the workflow must send it out using a HTTP or fetch request. Then, this external destination can send a request back to the workflow using the execution key to continue the workflow at any time.

If an execution key is generated with an "Execute Step" action, then the POST request with the execution key will be run internally, where the body of the request is the data specified in the `"body"` property of the "Execute Step" action. Essentially, this means that if an execution key is generated with the "Execute Step" action, then the next specified step will be automatically run. WIP WIP WIP WIP 


:::info Important
Execution keys only last for 90 days. 90 days after an execution key has been generated, you will no longer be able to use it to continue a workflow.
:::


##### nextStep Property

The `"nextStep"` property is an array. The property can be used in fetch requests, and also HTTPS Request, Return to Caller, and Execute Step actions. This property is another way other than execution keys to get to another step (in reality, this property still uses execution keys behind the scene).

Ok looking more into this by trial and error, and I have no idea how it works. It looks like just generating an execution key will automatically execute it?? And the "nextStep" property looks like it gives me an error, it shows an attachment symbol with a slash through it, and the symbol is red. It also deletes the "nextStep" property from the JSON whenever I try to add it. WIP WIP WIP WIP

## Testing the Workflow

To test your workflow, you can get your machine to act as the caller of the POST request to the workflow. The testing menu will look like this (the IDs have been redacted):

<CustomisableImage src="/img/workflows-testing.png" alt="Workflows Testing Menu" width="800"/>

The configurable JSON under 'Start' will be the body of your request. This will be the `{{payload}}` data store for the first step. Once you have configured the body of your request, click 'Test' to send the request and activate the workflow. It will go through its steps and logic, and then will send data back to the caller (you) when it is completed. You can also configure this response in your workflow using the "Return to Caller" action. 

The returned data will appear under 'Response'. Here you can check to see if your workflow is functionining properly, returning the correct values, and if there are any logical errors. If there is a formatting error, the poorly formatted JSON will not be executed. If enough JSON is poorly formatted, the 'Response" data will be blank. WIP WIP WIP WIP

For a more detailed view of the functioning of your workflow, you can view the 'Logs'. This will document the execution of the workflow.

[comment]: <> (TO DO: finish this explanation, it's also kinda doodoo)

## Activating the Workflow

when running:
it is run asynchronously

when activating:
A workflow will be activated if someone makes a POST request to the start endpoint of the workflow
Otherwise you can activate it manually using the power button to test it with test data.
IMPORTANT: IT MUST BE THE START ENDPOINT
WIP

maybe talk about "nextStep" and execKeys here as well

look at idempotence from The Alex as well

## Logs





[comment]: <> (gotta work on the spacing here. It either seems cluttered or inconsistent)

[comment]: <> (maybe link some more things around - link the upload data/store function to the store placeholder. Link other placeholders as well like the http placeholder to the http request action.)

[comment]: <> (use the mini code blocks more often, especially for the placeholders or when referring to items in a codeblock)

[comment]: <> (fundamental questions. Does payload get overwritten? Or does it automatically change every step? Is it always the data from the previous step? If you don't define the payload in a previous step, what is it in the next step? Similar questions for fetched. Does fetched get erased at the end of a step? Or does it carry over to the next step until overwritten?)




[comment]: <> (the layout and formatting this page is slowly becoming more confusing and more cluttered. Once all the information is here I will have to move everything around so it's easy to follow.)




[comment]: <> (docs are great and all, but I should also really create like a Getting Started tutorial. Eg setting up your first workflow, setting up basic logic and requests etc. Saying Hello World, creating different things etc etc)

[comment]: <> (yeah Logan gave a thumbs up for this idea. A collection of basic workflows which demonstrate core concepts.)

[comment]: <> (condition modifiers need to be done still)

[comment]: <> (To Do: csv file streaming docs. Stream To action docs. Exec Keys docs. Activating the Workflow Docs. Testing the Workflow docs. Logs docs. The introduction to these docs. Fix formatting, spacing, make it less cluttered.)

[comment]: <> (found some more properties on other action tyes like HTTP Request and Execute Step - the delay property and the stream property. Learning more about those)

