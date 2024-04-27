---
title: Workflows
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Workflows

<div className="dubheader">Overview</div>

A workflow is an automated set of tasks that are executed based on logic. A workflow is comprised of various 'steps'. Each step is a mini task that is executed. These steps are then sequenced together to automate a larger process. In general, a step has three phases:

[comment]: <> (I should include some example use-cases for workflows here - what are the capababilities, possibilities, what can it do?)

1. Data Collection
2. Evaluation of Data
3. Execution of Actions Based on Evaluation

Each of these phases has instructions on how to execute them. These instructions are all encoded in JSON. Learn how to use the JSON editor [here](#configuration).

The first phase collects data using a [fetch request](#fetch) or a [file stream](#stream). The second phase evaluates data using a set of conditions. A condition is an expression of logic, usually comparing two values. They are essentially 'if' statements. Each of the conditions will have associated "actions". If the condition is found to be true, then its actions are executed. This is the third phase of the step. These actions may include: making a HTTPS request, returning some data to the API caller, or navigating to a new step.



<br/>

<div className="dubheader">Activation</div>



A workflow is activated when a POST request is made to the workflow's start endpoint. The body of this request becomes the 'payload' for the first step in your workflow. The payload is a chunk of data that is passed between steps in a workflow. For example, Step 1 receives a payload from the POST request, processes this data, and then sends a new payload off to Step 2 to process. Learn more about this activation [here](#activating-the-workflow).

Once it is activated, it creates a new 'instance' of the workflow. An instance is a specific iteration of a workflow. For example, one instance may receive some data that triggers output A, and another instance of the same workflow may receive some data that triggers output B. Each instance executes the same workflow, but they are unique iterations of it.

Each instance of the workflow is stored in the [logs](#logs). These instances have their own ID (accessed via the logs or [placeholders](#placeholders)). You can store data within a specific instance so that it can only be accessed from within the same instance.

<br/>

<div className="dubheader">Execution</div>

Once the workflow gets to the end of a step, it actually stops and goes into a temporary stasis. A new step can only be reached by using an execution key. Learn more about execution keys [here](#execution-keys).


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

<div className="subheader">JSON Editor</div>

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

<br/>

<div className="subheader">Toolbar</div>

Your workflow will start empty. It will look like this:

<CustomisableImage src="/img/workflows-config.png" alt="Empty Workflow" width="700"/>

This menu is called the toolbar. Each button on this toolbar will help you start creating and customising your workflow. From top to bottom and left to right, these buttons are:

<br/>

<div className="dubheader">Pencil Icon</div>

Edit the properties of the workflow. These properties are global within the workflow. These properties are:
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

<br/>

<div className="dubheader">Power Button</div>

Runs the workflow with test data. Used for testing the workflow. Learn more [here](#testing-the-workflow).

<br/>

<div className="dubheader">Upload Button</div>

Upload steps into workflow. Delete the curly braces that are present by default. Steps must be uploaded in a single array. Under the `{...}` button at the top of individual steps, you will find the JSON object that represents one step. Insert this object as an item within the array you are uploading. The formatting should be identical to that found in the "Download" Button adjacent to this button. Your upload should look something like this:
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

<br/>

<div className="dubheader">Download Button</div>

An overview of the JSON of the entire workflow. It is an array where each item is the JSON of a single step. Formatted as above.

<br/>

<div className="dubheader">Add (+) Button</div>

Adds a new step to the workflow. Learn more about steps [here](#steps-and-workflow-logic).

<br/>

<div className="dubheader">Save Icon</div>

View all recent changes to the workflow. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">PUBLISH 1 CHANGES</Tag> to save and publish these changes.

<br/>

:::caution CAUTION
Any changes made to a workflow will be lost if you do not save them.
:::

<br/>

<div className="dubheader">Active</div> 

All steps that are currently being used within the workflow.

<br/>

<div className="dubheader">Unassigned</div> 

All steps that are **not** currently being used within the workflow. New steps that have not been allocated a location in the workflow will appear here.

<br/>

<div className="dubheader">Logs</div> 

Records the details of every instance. Learn more about the logs [here](#logs).

<br/>

<div className="dubheader">Question Mark</div> 

The workflow will try to determine where it is being triggered and activated from. It will display those locations here. If it cannot find any, it will display a question mark.

<br/>

<div className="dubheader">Lock Button</div> 

Toggles the security of the workflow. If it is 'unlocked', then the workflow can be activated without <BrandName/> API authentication. If it is 'locked', then a <BrandName/> API authentication is required to activate the workflow.

<br/>



### Steps and Workflow Logic

When you create a new step in your workflow, the following menu will appear.

<CustomisableImage src="/img/new-step-menu.png" alt="New Step JSON" width="500"/>



<br/>

When creating a new step, you need to specify the 'description' and 'name' property:
- **description**: a short explanation of what the step is doing.
- **name**: the name of the step. This is used to identify different steps within your workflow.

<br/>

Your new step will appear below the toolbar and should look something like this:

<CustomisableImage src="/img/new-step.png" alt="New Step" width="300"/>

<br/>

:::note Note
If you create a new step and it does not appear here, it may be stored underneath the 'Unassigned' tab in the toolbar.
:::

<br/>

The `{...}` button will display an overview of the JSON for the entire step (including the ID of the step). The cloud download button is for the [fetch](#fetch) request in your step. The file add button is for the [stream](#stream) function in your step. The '+' button will add a new [condition](#conditions) to your step.

<br/>

:::info Important
A step will usually follow the same format comprised of three stages. It will gather data (fetch and stream), evaluate the data (condition), and then make decisions based on the evaluation (actions).
:::

<br/>

#### Placeholders


A workflow automation revolves around the flow of data, API requests, and data evaluations. To maintain the flow of data, your properties can refer to 'placeholders'. These placeholders are indicated by double curly braces: `{{example}}`. Placeholders point to a value that is defined elsewhere. For example, the `{{fetched.status}}` placeholder points to the HTTP status code of a step's fetch request.

<br/>

:::info IMPORTANT
When placeholders point to objects, to access the values of the object's properties, use dot notation (eg `{{example.property_name}}`).
:::

<br/>

These placeholders can point to two different types of data stores - static and dynamic. Static data stores do not change; they are predetermined. Dynamic data stores will change depending on the outcomes of steps in the workflow. There are two static data stores and seven dynamic data stores you can use in a workflow:

<br/>

<div className="dubheader">Static Data Stores</div>

- `{{store}}`: data added into the 'store' of the workflow. Read about the Edit Button in [Configuration](#configuration) for more details about the store.
- `{{CREDENTIAL}}`: data stored in your [Credential Vault](./credential-vault.md). This is most commonly API keys or environment data.

<br/>

<div className="dubheader">Dynamic Data Stores</div>

- `{{payload}}`: data that has been passed to a step. The step may have received this data from a POST request or a previous step. 
- `{{fetched}}`: data received from the response of the [fetch](#fetch) request in a step. Formatted as  `{ status: xxx, data:{} }`. `{{fetched.status}}` will return the HTTP status code of the request. `{{fetched.data}}` is the body of the data. Learn more about fetching [here](#fetch).
- `{{http}}`: data received from the response of a http request. Formatted as  `{ status: xxx, data:{} }`. A HTTP request is slightly different from a fetched request because it is an [action](#actions).
- `{{memory}}`: data stored within the current step. Data is usually stored here via [file streaming](#stream).
- `{{instance}}`: data stored in the current instance. By default, this data store is empty. Data can be stored here using the "Save to Instance" [action](#actions).
- `{{execKeys}}`: an execution key generated in a step. Learn more about execution keys [here](#execution-keys).
- `{{instanceKey}}`: the ID of the current instance of the workflow.

<br/>

:::info Important
`{{payload}}`, `{{fetched}}`, and `{{memory}}` are local to a step. They are cleared at the end of a step.
:::



<br/>

[comment]: <> (could make an interactive placeholder example here.)

<div className="subheader">Example</div>

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

<br/>

<div className="subheader">Undefined Placeholders</div>

If the value of a placeholder cannot be found, it will return the placeholder name as a string. However, this will also prevent the JSON from being evaluated. To override this failsafe and evaluate the JSON anyways, add the `“permitUndefinedExecution”: true` property to the JSON.

<br/>

:::note Note
The payload for the first step of a workflow is the body of the POST request to the workflow.
:::

<br/>


[comment]: <> (check the wording of this whole section. Also do the same for #Workflows and ##Activating a Workflow)

#### Other Substitutions

While placeholders are subtitutes for data stores, a workflow can also have subsitutes for maths, random values, and dates.

<br/>

<div className="dubheader">Math Expression</div>
A math expression takes the form `M{maths_goes_here}`. For example, the expression `M{2 * (1 + 3)}` would be a subtitute for 8. This substitution supports the standard maths operations: +, -, *, /, **, %.

<br/>

<div className="dubheader">Random Integer</div>

A random integer can be expressed as `R{lower_bound,upper_bound}`. In the workflow, this expression will be evaluated as a random integer from the lower bound to the upper bound. If not given, the default lower bound is 0, and the default upper bound is 100.

<br/>

<div className="dubheader">Random Boolean</div>

A random boolean expression will be randomly evaluated as either true or false. The chance of it being true or false can be also be defined. The full expression for a random boolean is `RB{chance_of_true}` where chance_of_true is the likelihood on a scale from 0 to 1 that the expression is evaluated as true. The complement of that chance is the chance the expression is evaluated as false.

<br/>

<div className="dubheader">Date</div>

In general, `D{}` is a substitute for a date value. The default value is an ISO string of the current time. The default timezone used is the timezone property of the workflow (to see this timezone go to the workflow header and click on the pencil icon). You can customise the date value by adding 'rules'. A rule goes inside the curly braces. It follows the format "rule_name=rule_value". Multiple rules are joined using '^'. 
The rules are:
- **date**: the actual time you want to reference in ISO format.
- **rule**: modifies the date by a set amount. It takes three values in the form "rule=operator,amount,time_unit". The operator is how the rule is changing the date (add/subtract). Then, the rule changes the date by the amount of time units. For example, "rule=1,add,hour" will add one hour to the date.
- **timezone**: the timezone you want the date to appear in. It should be formatted as "Country/City".
- **format**: the display format for the date. For example, "DD/MM/YYYY" will convert ISO format "2024-09-06T18:42:25" into "06/09/2024".

Here is an example of all the rules in action:

`D{date={{instance.instanceCreated}}^rule=add,1,day^timezone=Australia/Brisbane^format=YYYYMMDD}`

This will be evaluated as the time when the workflow started running in Brisbane, plus a day, in the format YYYYMMDD.

<br/>

:::tip TIP
You can combine forms of subtitution. For example, you could perform mathematical operations on a placeholder value: `M{{{payload.price}} * 0.95}`.
:::

<br/>

#### Fetch

This function will make an API request. The response will be stored in the form `{ status: xxx, data:{} }` where the data object is the body of the API response. This data store can be referenced elsewhere in the step using the  `{{fetched}}` placeholder.

<br/>

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

[comment]: <> (Is it ok that I used the Yabbr name here in the url?)

<br/>

Explanations of the above properties:
- **type**: the type of protocol to use for the request.
- **verb**: the HTTP request method (eg GET, POST, FETCH).
- **url**: the API endpoint to send the request to.
- **headers**: the headers of your API request.
- **body**: the body of your API request.
- **nextStep**: learn more [here](#execution-keys).

Any other necessary properties follow standard API request standards.

<br/>

#### Stream

<div className="subheader">Extracting Data</div>

The file streaming function will extract information from a file to use within a step. This process is slightly different for different file types. The only file types currently supported are 'txt' and 'csv'.

<br/>

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

<br/>

Explanations of the above properties:
- **skipLines**: the program will skip this many lines before it starts reading the file. For example `"skipLines": 1` will start reading the file on the second line.
- **url**: the destination of the file.
- **fileType**: the type of file you are using.
- **delimiter**: when the data is extracted and stored as an array, this will be the character that separates each piece of data.
- **includeEmpty**: whether to include empty lines when recording data from the file. `true` will include empty lines, `false` will ignore empty lines. Empty cells in a CSV file will never be ignored.
- **headerIndex**: (optional) will use the first line of a CSV file as column titles. This will allow you to refer to column titles instead of column indexes when retrieving data.

<br/>

<div className="subheader">Accessing Data</div>

Once you have extracted the data, you need a way of accessing it. The data is stored differently depending on the file type, so the access methods will be different for each. Generally, all the data is stored in `{{memory.record}}`.

<br/>

<div className="dubheader">TXT</div>

Returns `{{memory.record}}` as an array. Each line of the file is stored as a whole string. Each of these strings is stored in the array and separated by the "delimiter" defined earlier. An example txt file with "delimiter": ",":

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

<br/>

:::tip TIP
To reference a specific line in the file, use dot notation followed by the index of the line. For example, `{{memory.record.2}}` would return the third line of the file.
:::

<br/>

<div className="dubheader">CSV</div>

CSV files are read line by line. `{{memory.record}}` is an array that represents one line of the CSV file. Each item in the array is a different column within that line. Since CSV files are only read and stored one line at a time, that means `{{memory.record}}` is constantly overwritten and only ever stores one line at a time. This means, if there are not other specifications, that `{{memory.record}}` will just be the last line of the file, and all other data will have been overwritten. 

To access individual columns within a line of stored data, you reference the index of the column using dot notation. For example , `{{memory.record.2}}` would return the value of the third column in the line. Alternately, adding `"headerIndex: 0` to your file stream JSON will use the first line of the CSV file as column headings. Then, you can reference these column headings instead of the column indices. For example, to access the value in the "email" column on the current line, you would reference `{{memory.record.email}}`.

<br/>

:::tip TIP
Since only one line is read and stored at a time, referencing a column within a line would be referencing an individual cell.
:::

<br/>

To perform an [action](#actions) on every line in a CSV file, you need to iterate over every line and run the action. To add this file iteration, you need to give the `"stream": true` property to an [Execute Step action](#execute-step). If an Execute Step action has this property, then it will run the next step for every line in the streamed file. 

Consider the following example - you have a step with a file stream and then an Execute Step action that looks like this:

```jsx title="Execute Step File Iteration"
{
  "body":
  {
    "value": "{{memory.record}}"
  },
  "stream": true
}
```

When this is run, it will send every line in the streamed file individually as the payload for the next step. So, the next step will be run once for every line in the streamed file. In each execution of this step, its payload will be a new line in the file.

To store an entire CSV file within <BrandName/> and the workflow, use the [Stream To](#stream-to) action.

<br/>


[comment]: <> (WIP - check the wording)




#### Conditions

Conditions compare sets of data, and executes different actions depending on the outcome of that comparison. For example, it may check if a certain data value from an API request is equal to a certain target value. 

<br/>

Upon creating a new condition, you will be met with the following JSON:

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

<br/>

Explanations of the above properties:
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

All satisfied conditions are executed, unless they are a part of a group. 

To create a condition that will always be true, make the `"conditions"` property an empty array.

<br/>

:::info Important
Conditions are asynchronous. This means they will all be evaluated simultaneously, regardless of order. To override this, add the `"synchronousEvaluation": true` property to the JSON of the overall step. You can find the overall step JSON under the `{...}` button. This will evaluate conditions from left to right.
::: 

<br/>

[comment]: <> (is the left to right evaluation thing here true? WIP)

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

<br/>

#### Actions

After creating a condition, an extra option will appear at the bottom of the step. This is where you add actions to your step. Each action is connected to a condition, and will only run if the condition is satisfied. Every condition in a step can have unique actions associated with it. Actions are also the final stage of a step. To add a new action to a condition, click on the '+' button and select the desired action type.

<CustomisableImage src="/img/new-action.png" alt="New Action" width="500"/>

Each type of action serves a unique purpose:

<br/>

##### HTTPS Request

Creates an API request. It is functionally identical to the earlier [fetch](#fetch) request. The data from this request is stored under `{{http}}` instead. `{{http}}` data is not cleared at the end of a step and will hold its value until overwritten. 

If multiple HTTP requests are made in a workflow, then only the data from the latest request will be stored. To store multiple HTTP requests, you need to name them. To name a HTTP request, insert the `"name"` property into its JSON. The value of that property will be the name of your request. Then, to access that request's data, format your placeholder like "`{{http.request_name}}`". This action also supports the `"nextStep"` property. Learn more about it [here](#execution-keys).

<br/>

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

<br/>

##### Save to Instance

The JSON for the Save to Instance action consists of a single property `"store"`. This property is a two-dimensional array. Each item in the `"store"` array is a set of instructions on how and what data to save. These instructions take the form of another array. This instructional array has two mandatory items and a third optional item. 

[comment]: <> (check the formatting at the beginning here. may need a subheader or dubheader)

<br/>

So, your JSON should look something like this:

```jsx title="eval-meta"
{
  "store": [
    [
      "location1",
      "data1",
      {
        "flagName": "flagValue"
      }
    ],
    [
      "location2",
      "data2",
      {
        "flagName": "flagValue"
      }
    ]
  ]
}
```

<br/>

The first item in this array is the location to store the data in. The location should be formatted as dot notation `"example.property_name"`. The only data stores permitted as locations here are instance and memory - anything else will be ignored. You can also create new properties within the data stores to save the data into here. For example, since the instance data store by default is empty, saving a piece of data to `"instance.storedValue"` will create a new property `"storedValue"` within the instance object data store, and then save your data into that new property. 

The second item in the array is the data you are saving. This does not have to be a string.

The third item is an object. Within this object, you can create some "flags" to give the program some extra instructions on how you want the data to be saved. This object can have the following properties:

<br/>

<div className="dubheader">"push"</div>

Boolean. If `true`: adds data as an element within the array of the property. Will only work if the data storage location is an array. If the data storage location does not exist, it will create it as an array. If this flag is false, it is functionally the same as the flag not existing.

[comment]: <> (review these explanations. They're bad. WIP)

<br/>

<div className="dubheader">"spread"</div>

Boolean. Adds data as an array within the array of the property. Will only work if both the data and the data storage location is an array.  If the data storage location does not exist, it will create it as an array. If this flag is false, it is functionally the same as the flag not existing.

<br/>

<div className="dubheader">"remove"</div>

Boolean. Removes a property from an object. The first item in the array is the property to be removed, and the second item in the array can be anything, but must exist. For example:

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

<br/>

<div className="dubheader">"split"</div>

Splits a string into an array. It will split the string at the value of this property. For example, if you had `"split": "."`, each item in the resultant array would be separated at the location of any periods in the original string. Consider the following example:

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

<br/>

:::info Important
The character that you are splitting on is not included in the resultant array.
:::

<br/>

<div className="dubheader">"slice"</div>

Returns a small chunk from the middle of a string or array. The value of this property takes the form `[lower_bound, upper_bound]`, where the lower bound is the index of the start of the chunk, and the upper_bound is the index of the end of the chunk. The upper bound is not included in the sliced string. Consider the following example:

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

<br/>

<div className="dubheader">"truncate"</div>

Returns the beginning of a string and adds a suffix. This flag is an object with properties `"length"` and `"extension"`. `"length"` is an integer value that indicates how many characters will be in the final string. `"extension"` is a string that will be appended to the end of the truncated string. Its default value is `"..."`. It should be noted that the `"length"` property includes the length of the `"extension"` string. So, consider the following example:

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

<br/>

<div className="dubheader">"join"</div>

Returns an array as a string. Each item in the array is joined to the next using the value of this property. Consider the following example:

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

<br/>

<div className="dubheader">"replace"</div>

Replaces certain characters with a new character. This flag is an object with the properties `"search"`, `"modifiers"`, and `"replacer"`. It works by running a regex search on a string and then replacing all matched text with the replacement string. `"search"` is a regex pattern of the text you are searching for (eg `"[0-9]{3,}-[0-9]+"`). `"modifiers"` are the regex modifiers on the pattern (eg `"gim"`). `"replacer"` is the string you are replacing the matched text with. Consider the following example:

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

<br/>

<div className="dubheader">"parse"</div>

Convert a string into a different data type. This property only currently supports the value `"json"` which will convert a string of a JSON object into a JSON object.

<br/>

<div className="dubheader">"increment"</div>

Increases an existing number by the given amount. For example, `"increment: 2"` adds two to the data stored at the targetted storage location. The second item in the saving-instructions array can be anything, but it must exist. The target saving location must already exist for this flag to work. Consider the following example:

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

<br/>

<div className="dubheader">"padStart"</div>

Add some text to the start of a string to inflate its length. This flag is an object with properties `"length"` and `"filler"`. `"length"` is the desired length of the string. `"filler"` is the characters repeatedly inserted at the beginning of the string until it reaches the required length. Consider the following example:

```jsx title="Pad Start Flag"
{
  "store": [
    [
      "instance.example",
      "42",
      {
        "padStart": {
          "length": "5",
          "filler": "0",
        }
      }
    ]
  ]
}
```

Here, the value of `{{instance.example}}` would be `"00042"`. This flag is useful when you need a specific length for a string. In this case a 5-digit number was needed.


<br/>

<div className="dubheader">"padEnd"</div>


This property is the same as the `"padStart"` property, except the filler text is added to the end of the string.

[comment]: <> (can you use integers here? or do they have to be strings? WIP)

<br/>


:::tip TIP
- You can use placeholders like `{{payload}}` or `{{fetched}}` to save data from earlier in the step.
- Saving data to a step's `{{memory}}` data store is useful when you are repeating the step multiple times. The memory data store will survive the duration of the step, and then get wiped once the step finishes looping and goes to the a new step.
:::

<br/>


##### Repeat Eval

Restarts the step with a new payload. The new payload is the JSON defined in this action. Selecting this action will present you with a blank object. The data within this object will be sent back to the start of the step as the payload.

<br/>

##### Execute Step

Passes a new payload to the next step. It is functionally the same as the 'Return to Caller' JSON. The `"body"` of this action is the payload of the next step. There is an extra property you can add here besides `"body"`. The `"delay"` property specifies the time interval (in seconds) to wait until the next step is started.

<br/>

:::info important
Whilst the "Return to Caller" action will send the data to the API caller by default, without needing to generate an execution key, the "Execute Step" action has no default functionality. Without an execution key, it will not do anything. Learn more about execution keys [here](#execution-keys).
:::

<br/>

##### Stream To

[comment]: <> (does it have to be a CSV file? WIP)

Stores a new CSV file within <BrandName/> that you can access within your workflow. This is mainly useful to either store some collated data permanently into a CSV file, or to modify the formatting of a streamed file and potentially insert new information.

<br/>

The JSON for this action is:

```jsx title="action-streamTo"
{
  "destination": "",
  "authHeaders": {},
  "header": "",
  "line": "",
}
```

<br/>

Explanations of the above properties:
- **destination**: the new file name. For example: `"my-file.csv"`.
- **authHeaders**: authorisation headers. These are the headers that you use in any <BrandName/> API requests to authorise the request. It is usually either tokens or an API key. This API authorisation process gives you permission to store your new file at one of the <BrandName/> API endpoints.
- **header**: the column titles of the new CSV file. This property is a string. Separate column titles using a comma. For example, to create the headings "Email", "Phone", and "Name", you would use `"header": "Email,Phone,Name"`. 
- **line**: the data you are writing into the file. This property is a string. Separate the data into columns using commas, and separate the data into rows/lines using `\n`. 
- **id**: (optional) an identifier for your file. This can be any miscellaneous string. You can use it to reference the file elsewhere in the workflow. 

<br/>

[comment]: <> (watch the formatting here, this dubheader might be a bit too small.)

<div className="dubheader">Example</div>

Consider the following CSV file:

<CustomisableImage src="/img/csv-file.png" alt="Example CSV File" width="500"/>

In order to recreate this with the Stream To action, you would use the following JSON (`"destination"` and `"authHeaders"` have been left out):

```jsx title="File Recreation"
{
  "header": "Email,First Name,Last Name",
  "line": "abc@example.com,John,Smith\ngef@example.com,Jane,Doe\nhij@example.com,Caden,Jones",
}
```

<br/>

<div className="dubheader">Iteration</div>

If you stream a CSV file earlier in a step, this action will automatically iterate over every line in the file. This means that the action will repeat for every line in the streamed file. Every time it repeats, the value of `{{memory.record}}` will be a new line in the CSV file. The iterations of this action will not **replace** the content already written to the file on every step. Every time the action is iterated over, it will **add** the data to the file.

[comment]: <> (is the only way to access the information in a file you have written using the Stream To action by streaming it back from the endpoint in a new step? Or can you access the lines of the file using its id or name? Is the above information accurate? WIP)

<br/>

<div className="dubheader">File Storage</div>

Once the Stream To action is completed, the entire file will be stored at one of the <BrandName/> API endpoints. You can access the file again by streaming it from the <BrandName/> API endpoints with a GET request and the file ID. 

There are two ways to access the file ID. If the file did not have the `"id"` property in its "Stream To" action, then you need to reference it by its name. To access the file ID using the file name, use `{{memory.nameCsvId}}` where `name.csv` is the name of the file. Alternately, if you gave your file an `"id"` property, you can reference the file's ID using `{{memory.nameId}}` where `"name"` was the value of the `"id"` property. 

[comment]: <> (is the above information accurate? WIP)

[comment]: <> (I don't like this whole explanation of Stream To, check over it. And check over the file streaming of CSV files whilst you're at it. WIP)

Using similar methods, you can reference the number of lines in a file. If there is no `"id"` property, you reference it with `{{memory.nameCsvLines}}` where  where `name.csv` is the name of the file. If there is an `"id"` property, you reference it with `{{memory.nameLines}}` where `"name"` is the value of the `"id"` property.

[comment]: <> (is this information accurate? WIP)

<br/>


#### Execution Keys

<div className="dubheader">Overview</div>

Once a workflow gets to the end of a step, it stops. In order to get to a new step, you need to use an execution key. Execution keys are unique encrypted strings that point to a step in a workflow. An execution key can only be generated within the workflow. A new execution key is generated in every instance of the workflow.

When an API caller makes a POST request using an execution key, the workflow will start back up. It will start at the step within the workflow that the execution key pointed to. The body of the POST request will become the payload fed into this new step. It will also continue the exact same instance that the execution key was created in. This means all instance data will be the same, including the instance's ID.



Imagine it as this: A step generates an execution key pointing to the next step, and then the step ends. The workflow is now in a temporary stasis. Once an API caller makes a request using the execution key, the instance of the workflow resumes from where it left off, just at a new destination, with a new payload.

The URL for the execution key POST request should be formatted as `https://{{insert-workflow-url}}/execute/{{insert-execution-key}}`.

Once an execution key has been used, it cannot be used again. 

<br/>

:::info Important
Execution keys only last for 90 days. 90 days after an execution key has been generated, you will no longer be able to use it to continue a workflow.
:::

<br/>

<div className="dubheader">Creating Keys</div>



An execution key can be created with a fetch request, HTTPS Request action, Return to Caller action, or Execute Step action. To create the execution key, click on the '+' button that appears underneath one of the previous functions:

<CustomisableImage src="/img/new-exec-key.png" alt="New Execution Key" width="200"/>

An execution key has a name and a destination. Its name is used to reference it later in the step. Its destination is the step that it points to. Creating a new execution key will give you the following menu:

<CustomisableImage src="/img/exec-key-menu.png" alt="New Execution Key Menu" width="300"/>

Here you can give the key a name (Key Name) and a destination (Step). You can either select a pre-existing step from the drop-down menu as your destination, or create a new step for the execution key to point to. Then, to generate the key, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">ADD KEY</Tag>. It should appear as a small yellow attachment icon.

<CustomisableImage src="/img/exec-key-symbol.png" alt="Execution Key Symbol" width="200"/>

<br/>

:::info Important
Even though the UI shows the execution key being generated **after** the action, in reality, the execution key is generated **before** the action. So, in the above example, the HTTPS request could reference the execution key below it.
:::

<br/>

To remove an execution key, just click on its yellow icon and click <Tag colour="#ff5252" borderColour="#ff5252" fontColour="#FFFFFF">REMOVE</Tag>. You can generate multiple execution keys with one action.

<br/>

<div className="dubheader">Referencing Keys</div>

To reference an execution key within your workflow, you can use the `{{execKeys}}` data store. Each execution key will have a name. Thus, to reference a specific execution key, format a placeholder like so: `{{execKeys.name}}`, where "name" is the name of the execution key. Thus, an example execution key URL may look like `https://{{CREDENTIAL.company-name.workflow-url}}/execute/{{execKeys.next}}`. This request will look for the "workflow-url" property in the "company-name" credential vault and replace that first placeholder with it. Then, it will search for any execution keys generated with the name "next", and replace that second placeholder with it. Then, it will send the full request to continue the workflow at the new destination.

Since execution keys can only be generated by the workflow, for an external destination to access an execution key, the workflow must send it out using a HTTP or fetch request. Then, this external destination can send a request back to the workflow using the execution key to continue the workflow at any time.

If an execution key is generated with an Execute Step action, then it will automatically use the execution key and run the next step internally. The `"body"` of the Execute Step action becomes the body of the internal POST request to execute the next step, and thus becomes the payload for the next step.

<br/>

:::caution Caution
Any steps that have been started/run internally by an "Execute Step" action are unable to communicate with the original caller of the API request, so the "Return to Caller" action becomes unusable.
:::

<br/>



##### nextStep Property

<div className="dubheader">Overview</div>

The `"nextStep"` property is another way of generating execution keys besides the '+' button in the UI. Any action that can generate an execution key can also have this property - fetch requests, HTTPS Request, Return to Caller, and Execute Step. 

The property is an array. Each item in the array is an object. Each of these objects provides instructions for the generation of an execution key. These instructions have two properties - `"name"` and `"id"`. `"name"` is the name of the execution key, and `"id"` is the ID of the step that the execution key is pointing to. Since you can generate multiple execution keys at once, you can include multiple objects in this array, each generating a different execution key. 

<br/>

<div className="dubheader">Example</div>

An example HTTPS request using this property may look like this:

```jsx title="HTTPS Request Using Exec Keys"
{
  "verb": "POST",
  "url": "example-url.com",
  "headers": {
    "api-key": "{{CREDENTIAL.company-name.api-key}}"
  },
  "body": {
    "executePathOne": "https://{{CREDENTIAL.company-name.workflow-url}}/execute/{{execKeys.firstOption}}",
    "executePathTwo": "https://{{CREDENTIAL.company-name.workflow-url}}/execute/{{execKeys.secondOption}}"
  }
  "nextStep":[
    {
      "name": "firstOption",
      "id": "1234"
    },
    {
      "name": "secondOption",
      "id": "5678"
    }
  ]
}
```

<br/>

The important properties to notice here are `"body"` and `"nextStep"`. The `"nextStep"` property is generating two execution keys to two different steps. Then, the HTTPS request is sending out the execution keys in the body of the request. The request is actually sending out the full API endpoint that needs to be requested in order to use the execution key to resume the workflow. `"example-url.com"` will receive both of these endpoints, and then can choose to make a POST request to one of them to resume the workflow at the new location.

<br/>

<div className="dubheader">Execute Step</div>

As discussed earlier, execution keys generated with the Execute Step action are automatically used internally to run the next step. The same principles apply here. If the Execute Step action has an execution key specified in the `"nextStep"` property, it will be automatically used internally.

So, you can either use the '+' button underneath the actions to generate an execution key, or you can generate them using the `"nextStep"` property; the methods are interchangeable.

<br/>

:::info Important
Once the JSON has been saved, the "nextStep" property will become invisible if you try and access the JSON again. Instead, the execution keys specified within the property will transform into the little yellow attachment icons below the action shown earlier. 

<CustomisableImage src="/img/exec-key-icon.png" alt="Execution Key Icon" width="200"/>

However, you can still find the original `"nextStep"` property in the overall step JSON under the `{...}` button. 
:::

<br/>

## Testing the Workflow

To test your workflow, you can get your machine to act as the caller of the POST request to the workflow. The testing menu is accessed by clicking the power button in the toolbar. The menu will look like this (the IDs have been redacted):

<CustomisableImage src="/img/workflows-testing.png" alt="Workflows Testing Menu" width="680"/>

<br/>

<div className="dubheader">Start</div>

The configurable JSON under 'Start' will be the body of your request. This will be the `{{payload}}` data store for the first step. Once you have configured the body of your request, click 'Test' to send the request and activate the workflow. It will go through its steps and logic, and then will send data back to the caller (you) when it is completed. You can also configure this response in your workflow using the "Return to Caller" action. 

<br/>

<div className="dubheader">Response</div>

The returned data will appear under 'Response'. Here you can check to see if your workflow is functionining properly, returning the correct values, and if there are any logical errors. If there is a formatting error, the poorly formatted JSON will not be executed. If enough JSON is poorly formatted, the 'Response" data will be blank. 

[comment]: <> (WIP WIP WIP WIP)

<br/>

<div className="dubheader">Logs</div>

For a more detailed view of the functioning of your workflow, you can view the [Logs](#logs). This will document the execution of the workflow. The level of detail in these logs is determined by the value of `"logLevel"` in your workflow's properties (under the pencil icon in the toolbar).

<br/>

### Logs

<div className="dubheader">Overview</div>

Depending on the `"logLevel"` property, a new set of logs is created for every new instance of the workflow. Logs record what happens in a workflow whilst it is running. For example, it may log the start of a step, the start of an action, the end of an action, the result of an action etc. This detailed documentation of the processes in your workflow is very useful in identifying any unwanted behaviour. 

For example, a log may show you that the result of your fetch request doesn't actually include all the data that you needed. By searching through the logs for each step and process, you can pinpoint any logical errors, formatting mistakes, incomplete requests and more.

[comment]: <> (- also shows errors WIP...)

<br/>

<div className="dubheader">Accessing the Logs</div>

These logs can either be accessed when testing your workflow, or by navigating to the <Tag colour="#f0f0f0" borderColour="#f0f0f0" fontColour="#000000">LOGS</Tag> tab in your toolbar. The <Tag colour="#f0f0f0" borderColour="#f0f0f0" fontColour="#000000">LOGS</Tag> tab will open a menu that looks like this (IDs have been redacted):

<CustomisableImage src="/img/logs.png" alt="Logs Menu" width="680"/>

<br/>

This menu will show you a list of every instance of the workflow ever run. You can click on the headers "ID", "Created", and "Last Updated" to sort the instances by that property. Clicking on a heading will toggle it between a sort of increasing order, decreasing order, and no order. By default, the instances are ordered with the most recent at the top, and oldest at the bottom. To view the logs of a particular instance, click on it. 

This view will be the same as what appears under the "Logs" section when testing the workflow and running an instance of it. The following example has `"logLevel": "debug"`:

<CustomisableImage src="/img/logs-menu.png" alt="Logs" width="680"/>

<br/>

<div className="dubheader">Using the Logs</div>

These logs are ordered with the first executed processes at the top, and the last executed processes at the bottom. Each record in this log has a "Timestamp" that records when the process was executed, and a "Message" which describes what process was executed. This menu alone should give a general overview of every process that happened during the instance of the workflow and in what order. However, you can see more information about each process.

To see the JSON of a specific process, click the '˅' button on the right of the process. To re-collapse the menu, click the arrow again.

The workflow may take a while to execute, especially if there are some intentional scheduling delays or execution key exports. To refresh the logs to see any new/recent processes, click the circular arrow in the far top right of the logs:



<CustomisableImage src="/img/logs-menu-refresh.png" alt="Refresh Logs" width="680"/>

<br/>

To quickly start a new instance of the workflow again with the same payload, click the other circular arrow below the refresh button:



<CustomisableImage src="/img/logs-menu-start.png" alt="Restart Workflow" width="680"/>

<br/>

## Activating the Workflow

To start a new instance of a workflow, you need to make a POST request to the workflow's start endpoint. That endpoint will look something like `https://{{workflow-url}}/start/{{workflow-id}}`. You can also find the start endpoint of your workflow in its testing menu (under the power button in the toolbar). It will be displayed under the "Start" section (the ID has been redacted):

<CustomisableImage src="/img/workflow-id.png" alt="Workflow Start Endpoint" width="680"/>

<br/>

When you make a POST request to this endpoint, it will start a new instance of the workflow, starting at the first step. The body of your POST request becomes the payload of this first step.

<br/>

<div className="dubheader">Keys</div>

You can also add a "key" to this request. The start endpoint with a key will look like `https://{{workflow-url}}/start/{{workflow-id}}/{{key-name}}`. The first request made using this key will execute normally. However, any future requests made using the same key will not be executed. Instead, the workflow will just return the same response it gave on its first execution with that key. For example, if the first execution of `https://{{workflow-url}}/start/{{workflow-id}}/onlyonce` returns `"success"`, then, regardless of any other factors (including payload), the second execution of `https://{{workflow-url}}/start/{{workflow-id}}/onlyonce` will also return `"success"`.

<br/>

:::info INFO
The ID of your workflow can be found on the workflows homepage. Learn more about this [here](#management).
:::

<br/>

## Management

The workflows homepage can be accessed by following the breadcrumbs at the top of the page, or selecting the Workflows icon on the sidebar:

<CustomisableImage src="/img/workflows-homepage.png" alt="Workflows Homepage Navigation" width="400"/>

<br/>

This homepage is where you find and manage all of your workflows. For each workflow, from left to right, it will display:
- the name of the workflow
- any tags on the workflow
- the ID of the workflow (used to activate the workflow in the URL of the API request)
- the delete button

To delete a workflow, click the delete button. A small menu will then appear where you need to confirm the name of the workflow you are deleting. Then click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">DELETE</Tag>.

<br/>

:::tip Tip
You can click on the headers "Name", "Tags", and "ID" to sort the workflows by that property. Clicking on a heading will toggle it between a sort of increasing order, decreasing order, and no order. By default, the workflows are ordered with the most recently created at the top, and oldest at the bottom.
:::

<br/>





[comment]: <> (gotta work on the spacing here. It either seems cluttered or inconsistent)

[comment]: <> (maybe link some more things around - link the upload data/store function to the store placeholder. Link other placeholders as well like the http placeholder to the http request action.)

[comment]: <> (use the mini code blocks more often, especially for the placeholders or when referring to items in a codeblock)

[comment]: <> (fundamental questions. Does payload get overwritten? Or does it automatically change every step? Is it always the data from the previous step? If you don't define the payload in a previous step, what is it in the next step? Similar questions for fetched. Does fetched get erased at the end of a step? Or does it carry over to the next step until overwritten?)




[comment]: <> (the layout and formatting this page is slowly becoming more confusing and more cluttered. Once all the information is here I will have to move everything around so it's easy to follow.)




[comment]: <> (docs are great and all, but I should also really create like a Getting Started tutorial. Eg setting up your first workflow, setting up basic logic and requests etc. Saying Hello World, creating different things etc etc)

[comment]: <> (yeah Logan gave a thumbs up for this idea. A collection of basic workflows which demonstrate core concepts.)

[comment]: <> (condition modifiers need to be done still)

[comment]: <> (To Do: csv file streaming docs. Stream To action docs. Exec Keys docs. Activating the Workflow Docs. Testing the Workflow docs. Logs docs. The introduction to these docs. Fix formatting, spacing, make it less cluttered. Delay property on Execute Step action)

[comment]: <> (found some more properties on other action tyes like HTTP Request and Execute Step - the delay property and the stream property. Learning more about those)




[comment]: <> (added a couple extra features to the CustomisableImage react component - 3d rotations that are responsive to moues movement, basically just a 3d tilting effect. Then also a glowing box shadow)







[comment]: <> (TODO 17/4/24: finish the intro to this page. determine whether the new expandable images are better. potentially see if you can make the headers look better and more natural. Add more negative space to this page, currently it is very cluttered and the formatting could use work. Have a quick skim to make sure all information is here and it is accurate. Can work on other pages eg credential vault, audits etc. Could start planning what tutorial workflows to include, and then building up the react components, workflows, and docs for them.)

[comment]: <> (yeah I have just realised when using a larger screen like my monitor that these expandable images are way too big, and can be grainy at times, and I don't think the glowing and moving effect helps either. I will need to re evaluate the design of these.)

[comment]: <> (On further inspection, the images in these docs seem to be just a lot grainier than the images in the yabbr app docs. This could be because I took the screenshots just on my laptop. May have to fix this in future.)

[comment]: <> (Ok nevermind, I tried to take a new screenshot on the monitor and super zoomed in, and it is better quality, but is still considerably grainier than the Yabbr App Docs images. Will need further inspection.)

[comment]: <> (ok I just decided to get rid of the extra features - glow and 3d tilting - it was tacky, too busy, and may have been making the images grainier. It looks better and cleaner without them. Note to self though - currently the code is only commented, delete that code when this is pushed to prod.)

[comment]: <> (Ok I've tried making a combination of the banners and headers. I use the banners to separate main sections, and then small sub sections of that main section can get individual headers that don't take up the full width of the page like the banners. However, large sections and new ideas will get banners. If the whole section can easily be seen and read at once, then it only needs a header.)

[comment]: <> (I probably need to split up this page into multiple pages - it is currently way too long. I think this thing about headers and banners is a good idea, I just need to monitor and evaluate its execution. On second thought - definitely need to split this up into at least like 10 pages. This thing is almost 10 000 words.)

[comment]: <> (it would be wise to get someone to look over this whole page to make sure the formatting with the banners and headers is cohesive, makes sense, and doesn't look bad. I am uncertain about its visual appeal in some sections - mainly the execution keys and nextStep section)






[comment]: <> (some of the images have red arrows and boxes. Some of these red elements have a shadow, some dont. May need to resolve this inconsistency.)

[comment]: <> (maybe I can put some images for each button in the toolbar. Currently I just providing one image and labelling each button with dubheaders.)

[comment]: <> (maybe I've just been looking at it for too long, but something about the whole docs just seems off. It doesn't look professional or like a real docs site. Something about the formatting idk just feels off.)







[comment]: <> (might add a glossary page so I can provide some common definitions used throughout the docs - instance, step, workflow, execution key, credentials, payload, toolbar etc.)

[comment]: <> (idk if I mentioned it but I fixed the blurry image problem. Remember to find other blurry images and fix them with the new strategy.)

[comment]: <> (In these docs and the Yabbr App docs, one thing I could work on to make them better is to create and explain more use cases for each feature. Why is the feature useful? What can you use it for?)

[comment]: <> (also just remembered, in the very beginning of this page, I screenshotted the JSON for a new step intsead of putting it in a codeblock. Need to resolve that.)
