---
slug: "/tools"
sidebar_position: 1
---

import EnvironmentConfig from 'brand/EnvironmentConfig';

# Overview

<div class="dubheader">Workflows</div>

<EnvironmentConfig type="name"/> provides your workspaces with an incredibly useful, comprehensive, and detailed automation program called Workflows. At its core, this tool lets you sequence together several repeatable tasks and processes involving the flow, communication, storage, and evaluation of data. 

These sequenced processes are collated and connected via a ["Workflow"](./tools/workflows). You can find your workspace's workflows at <EnvironmentConfig type="workflowsUrl"/>.



<div class="dubheader">Using a Workflow</div>

These workflows can be activated automatically by:
- an API request
- other workflows
- ["Scheduled Events"](./tools/scheduled-events)



<div class="dubheader">Feature Overview</div>

The workflows tool lets you:
- automate data flow processes
- send and receive API requests
- log information about executions of your workflows
- read and write csv and txt files
- monitor your workflows to evaluate their performance
- collect information about [<EnvironmentConfig type="name"/> events and custom events](./tools/event-schemas)

---

## Getting Started

To get started with Workflows, it is recommended that you first learn the fundamental concepts and features invovled in creating and running a workflow. The [Workflows](./tools/workflows) page will teach you how to use the main features in a workflow, how to test them, and how to use them. 

<br/>

<div className="bard-row">
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Workflows Icon" src="/img/workflow-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Workflows</div><a href="./tools/workflows" className="link"></a>Sequence together a series of "steps" to automate a process. Receive, store, evaluate, and pass data within these steps. Use placeholders and conditions to customise behaviour based on certain data. Use API requests to send and receive data. Use actions to send data to a new location.
        </div>

</div>

<br/><br/>

Once you have familiarised yourself with the major features, you can enhance your workflows with the other tools offered. 

<br/>

<div className="bard-row">
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Workflow Monitors Icon" src="/img/audit-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Workflow Monitors</div>Receive regular updates about the performance and use of a workflow. Useful for debugging. <a href="./tools/workflow-audits" className="link"></a>
    </div>
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Credential Vault Icon" src="/img/vault-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Credential Vault</div>Store important information to be accessible by any workflow. Optionally censor sensitive information.<a href="./tools/credential-vault" className="link"></a>
    </div>
    <div className="bards">
        <div className="img-bontainer">
            <img alt="Scheduled Events Icon" src="/img/event-icon.svg" height="100%" width="auto"/>
        </div>
            <div className="beader">Scheduled Events</div>Setup a schedule to automatically activate a workflow once or regularly. <a href="./tools/scheduled-events" className="link"></a>
    </div>

</div>

<br/><br/>

For future reference, all of the API URLs required for using workflows are:
- **Core**: <EnvironmentConfig type="core"/>
- **DMS**: <EnvironmentConfig type="dms"/>
- **Workflows**: <EnvironmentConfig type="workflow"/>
- **Custodian**: <EnvironmentConfig type="custodian"/>