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

```jsx
{
    "num1": 8,
    "num2": 5
}
```

<br/>


<div className="dubheader">Desired Output</div>

<br/>

```jsx
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

The API caller will send the value of two numbers `"num1"` and `"num2"` to the workflow. In the first step, it will start evaluating a "group" of three conditions. 

- **Condition 1**: the sum of the two input numbers is less than the lower bound stored in the workflow (in our case `10`) -> `sum < 10`. This will return the string `"Small"` to the caller.
- **Condition 2**: the sum is between the upper and lower bounds (in our case `10` and `20`) -> `10 <= sum <= 20`. This will return the string `"Medium"` to the caller.
- **Condition 3**: always true. This will return the string `"Large"` to the caller. 

This works because all of the conditions belong to the same condition group. Functionally, this makes them a chain of `else if ` statements. So, it will evaluate each condition one by one. If the condition is true, it will execute its actions. If it is false, it will check the next condition in the group. Conditions are evaluated from left to right. Finally, when the workflow reaches **Condition 3**, we already know that **Condition 1** and **Condition 2** are false, so **Condition 3** must be true in our case. **Condition 3** is like an `else` statement.

If the conditions were not all in a group, then workflows would run them asynchronously. This means that **Condition 3** would always be evaluated as `true`, no matter the outcome of the other conditions. This functionality is useful to make independent conditions that can be simultaneously true.


<br/>

<div className="dubheader">Walk-through</div>

**1.** Create a new workflow and store the upper and lower bounds in it. See [Tutorial 2](./placeholders.md) for a reminder of how to do this.

```jsx title="Stored Bounds"
{
    "store": {
        "lower_bound": 10,
        "upper_bound": 20
    }
}
```

**2.** Create a new step with a new condition. This will be our first condition `sum < 10`. Give it an appropriate `"name"` for its functionality like `"Small"`. We also want to put it into a condition group using the `"group"` property. We will call this group `"Sizes"`. Leave the other properties for now, we will deal with them later.

```jsx title="First Condition"
{
  "conditionCombiner": "&&",
  "group": "Sizes",
  "conditions": [
    {
      "value2": 200,
      "value1": "{{example.property}}",
      "operator": "=="
    }
  ],
  "name": "Small"
}
```

**3.** To get the condition `sum < 10`, we first define our two values. 
- `"value1"` will be our sum. To compute a sum, we will use a new placeholder that evaluates maths expressions. Learn more about this [here](../../workflows.md#other-substitutions). We want a maths expression that adds the two numbers in our payload. The syntax for this is `M{ {{payload.num1}} + {{payload.num2}} }` (Ensure the outside curly braces don't touch the inside contents). 
- `"value2"` will be our stored lower bound of 10. We can access this with `{{store.lower_bound}}`. 
- Finally, we want `sum < 10`, which is `"value1" < "value2"`. So, our `"operator"` should be `"<"`.

```jsx title="First Condition Pt 2"
{
  "conditionCombiner": "&&",
  "group": "Sizes",
  "conditions": [
    {
      "value2": "{{store.lower_bound}}",
      "value1": "M{ {{payload.num1}} + {{payload.num2}} }",
      "operator": "<"
    }
  ],
  "name": "Small"
}
```

**4.** For the second condition `10 <= sum <= 20`, we will need two conditions: `sum >= 10` and `sum <= 20`. For this functionality, we will add a second condition object to the `"conditions"` array. The first condition object will evaluate `sum >= 10` and the second object will evaluate `sum <= 20`. We also want both of these conditions to be met simultaneously. We do this by setting `"conditionCombiner"` to `"&&"`. Remember that this condition must also belong to the same `"Sizes"` group as the first condition.

```jsx title="Second Condition"
{
  "name": "Medium",
  "conditionCombiner": "&&",
  "conditions": [
    {
      "value2": "{{store.lower_bound}}",
      "value1": "M{ {{payload.num1}} + {{payload.num2}} }",
      "operator": ">="
    },
    {
      "value2": "{{store.upper_bound}}",
      "value1": "M{ {{payload.num1}} + {{payload.num2}} }",
      "operator": "<="
    }
  ],
  "group": "Sizes"
}
```

[comment]: <> (it may be confusing having value2 come before value1. Check this. WIP)

**5.** The third and final condition will be empty. The only important thing is to put it into the same condition group `"Sizes"` with the previous conditions.

```jsx title="Third Condition"
{
  "name": "Large",
  "conditionCombiner": "&&",
  "conditions": [],
  "group": "Sizes"
}
```

**6.** Under each condition, we need an appropriate Return to Caller action. We will return the property `"size"`. For the first condition, `"size"` will be `"Small"`. For the second condition, it will be `"Medium"`. For the third condition, it will be `"Large"`.

<CustomisableImage src="/img/conditions-actions.png" alt="Actions" width="500"/>

```jsx title="Example Return Action"
{
  "body": {
    "size": "Small"
  }
}
```

**7.** It is now done and we can test it. To test it, your payload should include `"num1"` and `"num2"`. Make sure that the three conditions are being evaluated properly by using different values for `"num1"` and `"num2"`. The below payload should evaluate to `"Medium"`.

```jsx title="Example Return Action"
{
  "num1": 7,
  "num2": 8
}
```



<br/>

<div className="dubheader">Full Workflow JSON</div>

```jsx
[
  {
    "id": null,
    "eval": [
      {
        "name": "Small",
        "conditionCombiner": "&&",
        "conditions": [
          {
            "value2": "{{store.lower_bound}}",
            "value1": "M{ {{payload.num1}} + {{payload.num2}} }",
            "operator": "<"
          }
        ],
        "group": "Sizes",
        "actions": [
          {
            "body": {
              "size": "Small"
            },
            "type": "return",
            "nextStep": []
          }
        ]
      },
      {
        "name": "Medium",
        "conditionCombiner": "&&",
        "conditions": [
          {
            "value2": "{{store.lower_bound}}",
            "value1": "M{ {{payload.num1}} + {{payload.num2}} }",
            "operator": ">="
          },
          {
            "value2": "{{store.upper_bound}}",
            "value1": "M{ {{payload.num1}} + {{payload.num2}} }",
            "operator": "<="
          }
        ],
        "group": "Sizes",
        "actions": [
          {
            "body": {
              "size": "Medium"
            },
            "type": "return",
            "nextStep": []
          }
        ]
      },
      {
        "name": "Large",
        "conditionCombiner": "&&",
        "conditions": [],
        "group": "Sizes",
        "actions": [
          {
            "body": {
              "size": "Large"
            },
            "type": "return"
          }
        ]
      }
    ],
    "fetch": {},
    "created": "2024-05-31T11:40:51.747Z",
    "description": "Checking the size of an input sum",
    "lastUpdated": "2024-05-31T11:57:33.661Z",
    "name": "Checking Size",
    "workflowId": null
  }
]
```

