---
title: Event Subscriptions
sidebar_position: 9
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Event Subscriptions

<div className="dubheader">Overview</div>

When an action is performed in a <BrandName/> service, it will trigger an 'event'. These actions include sending a message, concluding a chat, and updating a contact's information. These will all trigger events. 

<br/>

<div className="dubheader">Catching Data</div>

Each of these events also have some associated data. 

Each of these events also have some associated data. For example, when a chat is concluded, the triggered event will record the contact information of the chat participants. 

You can then catch and store this data using an Event Subscription. So:
1. An action is executed
2. An event is triggered. It will record information about the action.
3. The information is relayed to all the event subscribers.
4. The event subscriber relays the information to some API endpoint (usually acting as a webhook).

<br/>

<div className="dubheader">Subscribing</div>

Event subscriptions will "subscribe" to certain types of events (via a whitelisting process). Whenever an event is triggered, it will relay its data to all of its subscribers. An event subscriber can catch and record data from any <BrandName/> events or [custom events](./event-schemas.md). 

<br/>

<div className="dubheader">Relaying</div>

Each event subscriber will have a `"destination"` URL. Whenever the subscriber catches a body of information from an event, it will send a POST request with this body to the `"destination"` URL. This destination can be anything. However, it usually acts as a webhook so that you can make some alteration to a page or app based on the event's data. For example, it may update the information on the page where the event was triggered.

You could also use the URL to store the data for a later use.

[comment]: <> (check that these use cases are accurate.)

<br/>

## Initialisation

To create a new event subscription, navigate to the Event Schemas section on the sidebar:

<CustomisableImage src="/img/subscriber-nav.png" alt="Event Subscriptions Sidebar Nav" width="400"/>

Then, click on '+ Create Event Subscription':

<CustomisableImage src="/img/new-subscription.png" alt="New Subscription" width="600"/>


<br/>

## Configuration

<div className="dubheader">JSON</div>

Creating a new event subscription will meet you with the following JSON:

```jsx title="Event Subscription JSON"
{
  "destination": "https://your.event.webhook.com",
  "whitelistedTypes": [
    "allowed.event.type.one",
    "allowed.event.type.two"
  ],
  "blacklistedTypes": [
    "disallowed.event.type.one"
  ],
  "enabled": true
}
```

[comment]: <> (The workflows.yabbr.io event subscription seems to have some extra properties. Investigate these and document them. WIP)

Explanations of the above properties:
- **destination**: the API endpoint to POST any received event bodies to.
- **whitelistedTypes**: all the events that the subscription will catch. This property is an array. Each item is the name of an event to whitelist. You can also reference an event prefix in this array to whitelist all events with that prefix. Learn more about event prefixes [here](./event-schemas.md#naming-an-event).
- **blacklistedTypes**: all the events that the subscription will not catch. The same rules apply as `"whitelistedTypes"`.
- **enabled**: boolean. `true` means the subscription is active and will catch event data. `false` means the subscription is inactive and will not catch event data.

Some extra properties that will appear after saving the subscription include:
- **created**: the time of the subscription's creation.
- **lastUpdated**: the last time the subscription was saved.
- **headers**: the headers of the POST request.
- **responses**: any POSTback responses. WIP

[comment]: <> (check that the headers and responses property descriptions are accurate. WIP)

<br/>

<div className="dubheader"><BrandName/> events</div>

An event subscription can either catch custom events defined by your [event schemas](./event-schemas.md), or it can catch events predefined by <BrandName/>. These <BrandName/> events will record information that is associated with the action that triggered them. For example, the `"chat.concluded"` event will record information about the chat session and its participants. This information can then be caught by an event subscriber.

[comment]: <> (maybe talk about schema globalisation here? WIP)

<br/>

:::info Information
- You can only catch <BrandName/> events that have been triggered from within your own workspace. 
- Your Workflows and <BrandName/> App workspaces are connected. An event triggered in your <BrandName/> App workspace can be caught by an event subscription in your Workflows workspace.
:::

<br/>

[comment]: <> (do workspaces have anymore than workflows and the yabbr app? WIP)

These predefined events are triggered by various actions in your <BrandName/> App and Workflows workspace:
- `"chat.concluded"`: a session in the <BrandName/> Chat is concluded.
- `"contact.update"`: a customer's contact information is updated.
- `"workflow.log.error"`: a workflow logs an error.
- `"workflow.log.info"`: a workflow logs standard information.
- `"workflow.log.warn"`: a workflow logs a warning.

[comment]: <> (check that this information is accurate. I know there are more events than this. Try and find all the events and explain them here. WIP)

[comment]: <> (I should also maybe include a brief description of the data that each event records. WIP)

<br/>

<div className="dubheader"><BrandName/> subscriptions</div>

Your Workflows workspace will come with some default event subscriptions. The only default subscription currently in place is the `workflows.yabbr.io` subscription. It will catch any events with the prefix `workflow.log.` and POST it to the <BrandName/> logs API endpoint.

<br/>

## Management

After creating a subscription or navigating to the event subscriptions page using the sidebar, you will be met with the event subscriptions homepage (redacted ID):

<CustomisableImage src="/img/subs-homepage.png" alt="Event Subscriptions Homepage" width="700"/>

The events subscriptions homepage will display all of your workspace's event subscriptions. From left to right, it will display the subscription's name, its ID, and its "Source". The Source column signifies any default event subscriptions. A default subscription will have the "Default" value in this column.


Click on an event subscription here to edit it.

<br/>

:::info Info
An event subscription's name will be some contraction of its `"destination"` URL.
:::


[comment]: <> (TODO: go through the event schema and subscription docs and address any of the WIPs. I know especially you need to look at the subscription properties because a lot of them are missing - headers, respones, lastUpdated, created etc.)