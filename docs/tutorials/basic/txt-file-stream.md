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

This tutorial will teach you how to use [file streaming](../../workflows.md#stream). It reads a file line by line and stores that information. The <BrandName/> API lets you upload and store files onto it. So, file streaming is useful for retrieving the information from these files (e.g. customer information). You could then use that to send out a campaign using another <BrandName/> endpoint.

You will learn the basics of file streaming and file reading. You will also learn how to use a new condition operator `"in"`, how to use non-grouped conditions, and how to use condition modifiers.

When a file has multiple lines, file streaming becomes a bit more complicated. That will be left for the next tutorial. For now, the goal is to read a TXT file from online, return the third sentence of the file, and determine if the first sentence contains the phrase `"lorem ipsum dolor"`. The TXT file will only consist of one line with multiple sentences.



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
    "line3": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
}

```

<br/>


<div className="dubheader">Explanation</div>





<br/>

<div className="dubheader">Walk-through</div>


<br/>

<div className="dubheader">Full Workflow JSON</div>

```jsx

```
