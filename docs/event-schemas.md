---
title: Event Schemas
sidebar_position: 8
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Event Schemas

<div className="dubheader">Overview</div>

When an action is performed in a <BrandName/> service, it will trigger an 'event'. These actions include sending a message, concluding a chat, and updating a contact's information. These will all trigger events. 

<br/>

<div className="dubheader">Catching Data</div>

Each of these events also have some associated data. For example, when a chat is concluded, the triggered event will record the contact information of the chat participants.

You can then catch and store this data using an [Event Subscription](./event-subscriptions.md). So:
1. An action is executed. 
2. An event is triggered. It will record information about the action.
3. The information is relayed to all the event subscribers and stored. Learn more about event subscriptions [here](./event-subscriptions.md).

<br/>

<div className="dubheader">Custom Events</div>

You can also create your own custom events. To define a custom event, you need to setup an Event Schema. Event Schemas provide a set of instructions of how an event should behave. 

These custom events behave exactly the same as normal events. They still need to be triggered, they can still record information, and they can still pass this information on to "subscribers". The difference is, you can trigger a custom event wherever you want. It could be in a workflow, or in some external application. It's as simple as making an API request. Learn more about this custom triggering [here](#triggering-an-event).

Custom events essentially let you record the details of any arbitrary action in any location. 



[comment]: <> (may add a flow chart here about how the backend is actually working - POST Request made, event schema validates it, event subscribers catch the request, subscribers relay it to another API endpoint. WIP)

[comment]: <> (I should also include an example use case here about what is going on. WIP)

[comment]: <> (wait why would I setup a custom event that sends it to an event subscriber and then to the endpoint instead of just skipping the middle man and making a request straight to the final endpoint? WIP)

<br/>

## Initialisation

To create a new event schema, navigate to the Event Schemas section on the sidebar:

<CustomisableImage src="/img/schema-nav.png" alt="Event Schemas Sidebar Nav" width="500"/>

Then, click on '+ Create New Schema':

<CustomisableImage src="/img/new-schema.png" alt="New Schema" width="600"/>


<br/>

## Configuration

<div className="dubheader">JSON</div>

Creating a new event schema will meet you with the following JSON:

```jsx title="Event Schema JSON"
{
  "type": "example.event.type.hierarchy",
  "hierarchy": [
    "examplePropertyTwo",
    "examplePropertyOne"
  ],
  "additionalProps": {
    "enabled": false,
    "types": []
  },
  "priority": 2,
  "properties": {
    "examplePropertyOne": {
      "type": "string",
      "required": true
    },
    "examplePropertyTwo": {
      "type": "object",
      "required": true
    }
  }
}
```

Explanations of the above properties:
- **type**: the name of the custom event. 
- **hierarchy**: WIP
- **additionalProps**: WIP
- **priority**: WIP
- **properties**: an event is triggered via an API request. `"properties"` details every property that the API request body needs to include. Each property of this object is a property that the API request body must include. These properties are formatted as objects: 
    - their key is the name of the required property
    - their `"type"` property is the data type of the required property
    - their `"required"` property is a boolean that indicates the necessity of the property. `true` means the API request body must include this property. `false` means the API request body does not have to include this property.

<br/>

<div className="dubheader">Example</div>

Consider the example `"properties"`:

```jsx title="Example"
{
  "properties": {
    "examplePropertyOne": {
      "type": "string",
      "required": true
    },
    "examplePropertyTwo": {
      "type": "object",
      "required": true
    }
  }
}
```

The API request body to trigger this example event should look like:

```jsx title="chat.concluded"
{
  "body": {
    "examplePropertyOne": "lorem ipsum",
    "examplePropertyTwo": {
      "lorem": "ipsum"
    }
  }
}
```

<br/>

### Naming An Event

An API request must mention an event's name to trigger it. An [event subscriber](./event-subscriptions.md) must specify a list of event names for it to catch. So, it is important to name your event efficiently. 

You can add prefixes to your event names to categorise them. For example, `chat.start` and `chat.finish` both share the `chat.` prefix. These prefixes can also be nested like `chat.messaging.react` and `chat.messaging.audio`. Event subscribers can then whitelist a specific prefix like `chat.` to catch all events with that prefix. Learn more about event subscribers and whitelisting [here](./event-subscriptions.md).

<br/>

:::info Important
An event name must be have all lowercase characters, no spaces, and no special characters.
:::

<br/>

## Triggering an Event

<div className="dubheader">Overview</div>

To "trigger" an event, you need to make a POST request. The URL of this request must be formatted as `{{custodian-url}}/organisations/{{workspace-id}}/events/publish`. This same URL is used to trigger all the event schemas in your workspace. 

[comment]: <> (how do users find their custodian URL and workspace ID? WIP)

<br/>

<div className="dubheader">Request Body</div>

To specify which event you are triggering, and its associated data, you need to include some extra properties in the body of your request:
- `"type"`: the name of the event.
- `"body"`: the associated data of the event. This is an object. It is the "request body" referred to in [Configuration](#configuration). This `"body"` should match the `"properties"` in the event schema.
- `"linkId"`: the category of the event. This value is arbitrary. It is just used to group similar event triggers together. For example, events triggered by the same user may share the same link ID to indicate their association with the same user. In this context, you could make the link ID the user's ID. WIP
- `"sessions"`: WIP
- `"participants"`: WIP

[comment]: <> (check the wording and accuracy of the linkID. WIP)

<br/>

<div className="dubheader">Behind the Scenes</div>

Thus, events actually function in a three step process:
1. A POST request is made detailing an event name and some associated data.
2. The event schema with the requested name validates the request to ensure all necessary data is present.
3. The event subscriber catches the data from the POST request.

<br/>

<div className="dubheader">Sending the Request</div>

Since these events are triggered by a POST request, they can be triggered wherever and whenever you want. This is the primary functionality of a custom event. You get to chose how the request is sent. You could set it up with a workflow, or maybe some external application. When one of your processes is activated, it could send this POST request and thus trigger one of your custom events.

[comment]: <> (Review this wording. WIP)

<br/>

<div className="dubheader"><BrandName/>'s Events</div>

<BrandName/>'s predefined events work in the exact same way. Each one has its own event schema. Then, when the relevant action is performed, <BrandName/> sends a POST request triggering the relevant event. This event is then validated by one of <BrandName/>'s event schemas. Since these schemas are global for all workspaces to use, event subscribers from any workspace can then catch these events.

<br/>

## Management

After creating a schema or navigating to the event schema page using the sidebar, you will be met with the event schemas homepage (redacted ID):

<CustomisableImage src="/img/schema-homepage.png" alt="Event Schemas Homepage" width="700"/>

The events schemas homepage will display all of your workspace's event schemas. It will display the event's name on the left, and its ID on the right. Click on an event schema here to edit it.
 




[comment]: <> (to improve this, I need to talk about the use cases of event schemas.)