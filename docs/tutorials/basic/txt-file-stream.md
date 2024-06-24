---
title: TXT File Stream
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# TXT File Stream


<div className="dubheader">Goal</div>

This tutorial will teach you how to use [file streaming](../../workflows.md#stream). It reads a file line by line and stores that information. The <BrandName type="name"/> API lets you upload and store files onto it. So, file streaming is useful for retrieving the information from your own uploaded files (e.g. customer information). You could then use that to send out a campaign using another <BrandName type="name"/> endpoint. Learn how to access files stored in <BrandName type="name"/> with [this tutorial](./api-file-stream). This tutorial will just focus on the basics.

You will learn the fundamentals of file streaming and file reading. You will also learn how to use a new condition operator `"in"`, how to use non-grouped conditions, and how to use condition modifiers.

When a file has multiple lines, file streaming becomes a bit more complicated. That will be left for the [next tutorial](./csv-file-stream). For now, the goal is to read a TXT file from online, return the third sentence of the file, and determine if the first sentence contains the phrase `"lorem ipsum dolor"`. The online TXT file will only consist of one line with multiple sentences to make it easier.



<br/>

<div className="dubheader">Prerequisites</div>

- Tutorial 1: Hello, World!
- Tutorial 2: Placeholders
- Tutorial 3: Conditions

<br/>

## The Workflow

<div className="dubheader">Desired Output</div>

<br/>

```jsx
{
    "containsLoremIpsum": true,
    "thirdSentence": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
}

```

<br/>


<div className="dubheader">Explanation</div>

When the workflow is activated, the first step will follow a link to a TXT file stored online. It will take the contents of the file, and read it line by line. For the purposes of this tutorial, there is only one line in the file. The workflow will take this line of text and split it into sentences. It will then store each sentence as an item within an array called `{{memory.record}}` (the step's temporary data storage). 

Then, the step will check if the first sentence (`{{memory.record.0}}`) includes the phrase 'lorem ipsum dolor'. If it does, it will return `containsLoremIpsum` as `true`. Otherwise, `containsLoremIpsum` will be returned as `false`. This `if... else...` logic occurs because the two conditions will be in a condition group.

Finally, the step will evaluate an empty condition (always true), and return the third sentence (`{{memory.record.2}}`) of the file. This step will not be in a condition group, so its execution is independent of the other conditions.


<br/>

<div className="dubheader">Walk-through</div>

**1.** Create a new workflow and a new step. In this step, create a new file stream.

<CustomisableImage src="/img/txt-file-stream.png" alt="New File Stream" width="400"/>

<br/>

**2.** In the file stream, we want to access an online TXT file: "https://casaguides.nrao.edu/images/9/92/Lorem.txt". This will be our `"url"`. We want to start reading the file from the first line, so we want to skip 0 lines: `"skipLines": 0`. We are streaming a txt file. This is our `"fileType"`. Finally, we want to split the line into each sentence. This can be achieved by splitting the string everytime we come across a period (`". "`). This will be our `"delimiter"`.

```jsx title="File Stream"
{
  "skipLines": 0,
  "includeEmpty": false,
  "url": "https://casaguides.nrao.edu/images/9/92/Lorem.txt",
  "fileType": "txt",
  "delimiter": ". "
}
```

:::info Important
The delimiter includes a space after the period to remove the space at the start of each sentence.
:::

<br/>

**3.** We need to create two conditions in a group to handle the true/false cases of `containsLoremIpsum`. This first condition will handle the true case. Create a new condition. Give it a `"group"` like `"lorem ipsum"`. We want to check if the first sentence of the file includes the string "lorem ipsum dolor". So, our `"value1"` will be the first sentence of the file: `{{memory.record.0}}`. Thus, `"value2"` will be the string `"lorem ipsum dolor"`. Since we want to check if `"value1"` includes `"value2"`, our `"operator"` will be `"in"` (the "includes" operator). 

```jsx title="Contains Lorem Ipsum"
{
  "name": "Contains Lorem Ipsum",
  "conditionCombiner": "&&",
  "conditions": [
    {
      "value2": "lorem ipsum dolor",
      "value1": "{{memory.record.0}}",
      "operator": "in"
    }
  ],
  "group": "lorem ipsum"
}
```

<br/>

**4.** We also want to make that condition case insensitive. We can do this by adding a modifier to `"value1"` to make the whole string lowercase.

```jsx title="Contains Lorem Ipsum"
{
  "name": "Contains Lorem Ipsum",
  "conditionCombiner": "&&",
  "conditions": [
    {
      "value2": "lorem ipsum dolor",
      "value1": "{{memory.record.0}}",
      "operator": "in",
      "modifiers": {
        "value1": [
          "lowercase"
        ]
      }
    }
  ],
  "group": "lorem ipsum"
}
```

<br/>

**5.** For the false case, we can just add a new empty condition in the same group. It will act as an `else` block in an if statement. 

```jsx title="Not Contains Lorem Ipsum"
{
  "name": "Not Contains Lorem Ipsum",
  "conditionCombiner": "&&",
  "conditions": [],
  "group": "lorem ipsum"
}
```

:::warning Caution
This condition **must** come after the condition for the true case. Workflows evaluates conditions from left to right. If this condition comes first, it will always be evaluated as true no matter the contents of the file.
:::

<br/>

**6.** Return the appropriate value of `containsLoremIpsum` for each true/false case in the condition group.

```jsx title="Returns"

// Contains Lorem Ipsum
{
  "body": {
    "containsLoremIpsum": true
  }
}

// Not Contains Lorem Ipsum
{
  "body": {
    "containsLoremIpsum": false
  }
}


```

<br/>

**7.** Create a third empty condition that is **not** part of a group. 

```jsx title="Empty"
{
  "name": "Empty",
  "conditionCombiner": "&&",
  "conditions": [],
  "group": null
}
```

**8.** Under this empty condition, return the third sentence in the file: `{{memory.record.2}}`.

```jsx title="Return Third Sentence"
{
  "body": {
    "thirdSentence": "{{memory.record.2}}"
  }
}
```

**9.** The workflow is done. Give it a test run and see if you get the desired output. See if you can make a similar workflow using a different online TXT file and checking for different properties.

<br/>



<div className="dubheader">Full Workflow JSON</div>

```jsx
[
  {
    "id": null,
    "eval": [
      {
        "name": "Contains Lorem Ipsum",
        "conditionCombiner": "&&",
        "conditions": [
          {
            "value2": "lorem ipsum dolor",
            "modifiers": {
              "value1": [
                "lowercase"
              ]
            },
            "value1": "{{memory.record.0}}",
            "operator": "in"
          }
        ],
        "actions": [
          {
            "body": {
              "containsLoremIpsum": true
            },
            "type": "return"
          }
        ],
        "group": "lorem ipsum"
      },
      {
        "name": "Empty",
        "conditionCombiner": "&&",
        "conditions": [],
        "actions": [
          {
            "body": {
              "thirdSentence": "{{memory.record.2}}"
            },
            "type": "return"
          }
        ],
        "group": null
      },
      {
        "name": "Not Contains Lorem Ipsum",
        "conditionCombiner": "&&",
        "conditions": [],
        "actions": [
          {
            "body": {
              "containsLoremIpsum": false
            },
            "type": "return"
          }
        ],
        "group": "lorem ipsum"
      }
    ],
    "fetch": {},
    "stream": {
      "skipLines": 0,
      "includeEmpty": false,
      "url": "https://casaguides.nrao.edu/images/9/92/Lorem.txt",
      "fileType": "txt",
      "delimiter": ". "
    },
    "created": "2024-06-01T07:14:26.168Z",
    "description": "Reading information from a txt file.",
    "lastUpdated": "2024-06-08T08:39:39.603Z",
    "name": "File Stream",
    "workflowId": null
  }
]
```
