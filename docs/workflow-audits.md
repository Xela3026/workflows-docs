---
title: Workflow Audits
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';

# Workflow Audits

<div className="dubheader">Overview</div>

A Workflow Audit allows you to check that a workflow is running correctly. When an audit is run on a workflow, it will analyse all the recent instances of the workflow. If the analysis shows that the workflow is running abnormally, the audit will alert you with an email. 

<br/>

<div className="dubheader">Verifying Functionality</div>

An audit will analyse two things in the recent instsances:
- the number of instances (how many times has the workflow been run?)
- the steps executed in each instance

If any of these factors do not align with expected results, an error is alerted. You can customise these "expected results" in the audit.

<br/>

<div className="dubheader">Scheduling</div>

Audits will run according to a predetermined schedule. This schedule will run forever until the audit is deleted. So, if your schedule has your audit running once a day, then you will get daily updates on the functioning of your workflow. Additionally, it will only analyse the instances that occured since the last audit. If it is the first audit, it will analyse all instances since the creation of the audit. For example, if the schedule is running the audit once a day, then each audit will analyse the last 24 hours of instances.

[comment]: <> (check the accuracy of this last sentence WIP)

<br/>

<div className="dubheader">Customisation</div>

An audit allows you to customise:
- checks for which steps in the workflow should be running
- checks for the number of times a workflow should be executed
- a schedule of how often the audit will run
- emails to send audit results to


[comment]: <> (allows you to automatically verify if your workflow is running correctly)

<br/>

## Initialisation

To create a new audit, navigate to the Workflow Audits section on the sidebar:

<CustomisableImage src="/img/audit-nav.png" alt="Workflow Audits Sidebar Nav" width="500"/>

Then, click on '+ New Audit':

<CustomisableImage src="/img/new-audit.png" alt="New Audit" width="500"/>


<br/>

## Configuration

Creating a new audit will meet you with the following menu:

<CustomisableImage src="/img/audit-menu.png" alt="Audit Configuration" width="700"/>

Each field lets you customise your audit:
- **Name**: the name of your audit. Used to identify the audit in the workspace.
- **Workflow**: the workflow you want to run the audit on.
- **Credential Store**: the credentials set in the [Credential Vault](./credential-vault.md) with the API key that the audit will use as authentication when it runs.
- **API Key**: the data store in the credentials set that stores the API key that the audit will use as authentication when it runs.
- **Schedule Frequency**: the number of time intervals to wait between audits. E.g. **3** days or **2** hours.
- **Schedule Interval**: the time interval to use. E.g. 3 **days** or 2 **hours**. A schedule frequency of 1 and a schedule interval of days will run the audit once ever 24 hours. A schedule frequency of 3 and a schedule interval of hours will run the audit once every 3 hours.
- **Labels**: the labels of the steps you want the audit to check are running. If an instance does not run a step with one of these labels, the audit will alert an error. Learn how to label a step [here](#labelling-a-step).
- **Minimum Executions**: the minimum number of times you expect the workflow to run between audits.
- **Maximum Executions**: the maximum number of times you expect the workflow to run between audits. Since the last audit, if a workflow has been run less than the expected minimum, or more than the expected maximum, an error is alerted.
- **Summary Emails**: after every audit is run, it will send a summarising email to these email addresses.
- **Error Emails**: if an audit encounters an error, these emails will be alerted.

<div className="dubheader">Finalisation</div>

Before you can enable the new auditor, you need to set a time for the first audit to run. To do this:
1. Click the <Tag colour="#FFFFFF" borderColour="#1582d8" fontColour="#1582d8">SCHEDULE</Tag> button in the top right.
2. Select the time you want the first audit to run. The blue banner displays the selected time. To edit each specification of time (eg day, hour, AM/PM, minute), click on it in the blue banner. Then, use the time selector that appears below the banner to edit the time specification. 
3. Click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">SET SCHEDULE</Tag>.

Finally, to enable your auditor, click the <Tag colour="#FFFFFF" borderColour="#1582d8" fontColour="#1582d8">SCHEDULE</Tag> button in the top right.

## Labelling a step

In a workflow, some of the steps can have a 'label'. These labels can then be run through an audit to verify that all of the labelled step is being run consistently. 

To label a step:
1. Navigate to the step's workflow.
2. Find the step and view its overall JSON by clicking the `{...}` button in the top right of the step.
3. Insert the "label" property. The value of this property should be a string. This string is the step's label.

<div className="dubheader">Example</div>

See an example labelled-step JSON below. Its label is `"auditGroup"`:

```jsx title="Labelled Step"
{
  "id": "123456",
  "description": "lorem ipsum",
  "name": "Example Step",
  "eval": [],
  "fetch": {},
  "label": "auditGroup"
}
```

<div className="dubheader">Sharing Labels</div>

If multiple steps have the same label, then an audit will only check for the first occurence of that label. For example, if you had the same label on step 1 and 4, the audit only checks to see if at least one of the steps is run. 
- If step 1 is executed and not step 4, no error is alerted. 
- If step 4 is executed and not step 1, no error is alerted.
- If neither step is executed, an error is alerted.
However, this may be useful if your workflow splits into two paths. Two steps with the same label but on separate paths would not encounter the previous problem.

<br/>

[comment]: <> (check that this information is accurate.)

## Management

After creating an audit or navigating to the audits page using the sidebar, you will be met with the audits homepage:

<CustomisableImage src="/img/audits-homepage.png" alt="Audits Homepage" width="700"/>

The audits homepage will display all of your workspace's active audits. From left to right, the menu will display:
- the audit's name
- the name of the workflow being audited
- the duration until the audit is run again
- the delete button

To disable and delete an audit, click the delete button. A small menu will then appear where you need to type the word 'confirm'. Then click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">DELETE</Tag>.
