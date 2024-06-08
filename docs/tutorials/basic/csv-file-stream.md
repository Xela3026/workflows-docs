---
title: CSV File Stream
sidebar_position: 7
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# CSV File Stream

<div className="dubheader">Goal</div>

This tutorial will teach you how to stream a CSV file and how to stream multiple lines of a file at once. It works by iterating over every line in the file and running an action. The step will store some information about this loop in its `{{memory}}`. This skill is useful for reading any file. 

You will learn about:
- the `stream` property
- iterating over a file
- streaming a CSV file
- the Save to Instance action
- more about `{{memory}}`

The final goal is to read a CSV file with some information about colours and return all the colours that contain some red.



<br/>

<div className="dubheader">Prerequisites</div>

- Tutorial 1: Hello, World!
- Tutorial 2: Placeholders
- Tutorial 3: Conditions
- Tutorial 5: TXT File Stream
- elementary knowledge of the CSV file type
- understanding of loops

<br/>

## The Workflow

<div className="dubheader">Desired Output</div>

<br/>

```jsx
{
    "containsRed": [
      "White",
      "Silver",
      "Gray",
      "Red",
      "Maroon",
      "Yellow",
      "Olive",
      "Fuchsia",
      "Purple"
    ]
}
```

<br/>


<div className="dubheader">Explanation</div>

When the workflow is activated, the first step will follow a link to a CSV file stored online. It will take the contents of the file, and read it row by row (line by line). Each row contains information about a different colour. The three columns contain the colours' name (Name), hex code (HEX), and rgb values (RGB).

The step will iterate over every row in the file. So, the step will read a colour, evaluate it, then loop to a new colour.

If the current colour being read (`{{memory.record}}`) contains any red in its RGB values (`{{memory.record.RGB}}`), then the colour's name (`{{memory.record.Name}}`) will be saved to an array that is stored within the instance (`{{instance.colours}}`). This data store does not exist by default, and is initialised when data is first stored there. 

The step can check if there is any red in the RGB using the `!in` operator (does not include). It can simply check if `"{{memory.record.RGB}}" !in "rgb(0,"`. This translates to: the colour's RGB does not have zero red.

At the same time, the step will check if every line in the file has been read. If so, it will output all stored instance data (`{{instance.colours}}` -> all the colours containing red).

:::info Info
When it says the file is read "row by row", this means that the step is looped. 
:::

[comment]: <> (word on this explanation, especially about the looping - its dodgy. WIP)


<br/>

<div className="dubheader">Walk-through</div>



<br/>



<div className="dubheader">Full Workflow JSON</div>

```jsx

```
