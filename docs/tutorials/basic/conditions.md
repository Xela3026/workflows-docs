---
title: Conditions
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Conditions


<div className="dubheader">Goal</div>

This tutorial will teach you how to use [conditions](../../workflows.md#conditions). It is a statement of logic that will execute actions based on its outcome. You can use them to make decisions about data. In this tutorial, you will learn the basics of making a condition, how to use condition groups, and how conditions are evaluated. You will also learn how to use the "Maths" placeholder to evaluate a mathematical expression.

The end goal is for the API caller to send our workflow any two numbers `"num1"` and `"num2"`, and receive back a message that tells us what the "size" of their sum is. We will store the different sizes within our workflow (`{{store}}`):
- **x &#60; 10:** "Small"
- **10 &#60;= x &#60;= 20:** "Medium"
- **x &#62; 20:** "Large"


<br/>

<div className="dubheader">Prerequisites</div>

- Tutorial 1: Hello, World!
- Tutorial 2: Placeholders

<br/>

## The Workflow

<div className="dubheader">Sample Input</div>

<br/>

```jsx title="Conditions"
{
    "num1": 8,
    "num2": 5
}
```

<br/>


<div className="dubheader">Desired Output</div>

<br/>

```jsx title="Conditions"
{
    "size": "Medium"
}
```

<br/>

**Breakdown**:

- 8 + 5 = 13
- 10 &#60;= 13 &#60;= 20
- Therefore our desired output is `"Medium"`

<br/>


<div className="dubheader">Workflow Explanation</div>



<br/>

<div className="dubheader">Walk-through</div>




<br/>

<div className="dubheader">Full Workflow JSON</div>