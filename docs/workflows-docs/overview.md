---
slug: /
sidebar_position: 1
---

import BrandName from '@site/src/components/BrandName';

# Overview

<div class="dubheader">Workflows</div>

<BrandName type="name"/> provides your workspaces with an incredibly useful, comprehensive, and detailed automation program called Workflows. At its core, this tool lets you sequence together several repeatable tasks and processes involving the flow, communication, storage, and evaluation of data. 

These sequenced processes are collated and connected via a ["Workflow"](./workflows-docs/workflows). You can find your workspace's workflows at <BrandName type="workflows-url"/>.

<br/>

<div class="dubheader">Using a Workflow</div>

These workflows can be activated automatically by:
- an API request
- other workflows
- ["Scheduled Events"](./workflows-docs/scheduled-events)

<br/>

<div class="dubheader">Feature Overview</div>

The workflows tool lets you:
- automate data flow processes
- send and receive API requests
- log information about executions of your workflows
- read and write csv and txt files
- run audits on workflows to evaluate their performance
- collect information about [<BrandName type="name"/> events and custom events](./workflows-docs/event-schemas)

<br/>

## Getting Started

To get started with Workflows, it is recommended that you first learn the fundamental concepts and features invovled in creating and running a workflow. The [Workflows](./workflows-docs/workflows) page will teach you how to use the main features in a workflow, how to test them, and how to use them. 

<br/><br/>

<div className="bard-row">
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Workflows Icon" src="/img/workflow-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Workflows</div><a href="./workflows-docs/workflows" className="link"></a>Sequence together a series of "steps" to automate a process. Receive, store, evaluate, and pass data within these steps. Use placeholders and conditions to customise behaviour based on certain data. Use API requests to send and receive data. Use actions to send data to a new location.
        </div>

</div>

<br/><br/>

Once you have familiarised yourself with the major features, you can enhance your workflows with the other tools offered. 

<br/><br/>

<div className="bard-row">
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Workflow Audits Icon" src="/img/audit-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Workflow Audits</div>Receive regular updates about the performance and use of a workflow. Useful for debugging. <a href="./workflows-docs/workflow-audits" className="link"></a>
    </div>
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Credential Vault Icon" src="/img/vault-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Credential Vault</div>Store important information to be accessible by any workflow. Optionally censor sensitive information.<a href="./workflows-docs/credential-vault" className="link"></a>
    </div>
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Scheduled Events Icon" src="/img/event-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Scheduled Events</div>Setup a schedule to automatically activate a workflow once or regularly. <a href="./workflows-docs/scheduled-events" className="link"></a>
    </div>

</div>

<br/><br/>

For future reference, all of the API URLs required for using workflows are:
- **Core**: <BrandName type="core"/>
- **DMS**: <BrandName type="dms"/>
- **Workflows**: <BrandName type="workflow"/>
- **Custodian**: <BrandName type="custodian"/>