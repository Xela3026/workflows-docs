---
title: Credential Vault
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';

# Credential Vault

The Credential Vault is a location where you can store constant information and data - 'credentials' - to be used in any of your workflows. It is most useful for storing things like API keys important IDs, or commonly used URLs. All of your credentials will be stored in the `{{CREDENTIAL}}` data store. To learn how to reference these credentials in your workflow using placeholders, see [here](./workflows.md#placeholders). 

This vault also supports the encryption of sensititive information to prevent it form being accessed by unwanted personnel.

The Credential Vault also sorts your information into sets of credentials. Each set of credentials usually contains related information. For example, you may create a set of credentials for API keys called "API Keys", and then store all of your API keys in that set and then encrypt them for safety.

## Initialisation

To create new set of credentials, navigate to the Credential Vault section on the sidebar:

<CustomisableImage src="/img/credentials-nav.png" alt="Credential Vault Sidebar Nav" width="500"/>

Then, click on '+ New Credentials':

<CustomisableImage src="/img/new-credentials.png" alt="New Credentials" width="500"/>

Clicking that button will open this menu:

<CustomisableImage src="/img/new-credentials-menu.png" alt="New Credentials Menu" width="400"/>

Give your new credential set a name under 'Credential Set Name'. This will be used to help identify your credential set within your workspace. Finally, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">SET</Tag> to finalise the initialisation of your new credential set.

<br/>

## Configuration

Your new credentials set will appear at the bottom of the Credential Vault. Click on the set to open its storage. The inside of an empty credentials set will look like:

```jsx title="Empty Credentials Set"
{
  "credentials": [],
  "name": "Docs Example",
  "description": "An example credentials set for documentation.",
  "created": "2024-04-11T12:35:56.328Z"
}
```

The Credential Vault uses Workflow's JSON editor. Learn more about how to use this editor [here](./workflows.md#configuration).

The only property here you need to edit is the `"credentials"` property. This property is an array. Each item in the array is an object that gives details about a piece of data to store as a credential. This object has three properties: `"name"`, `"value"`, and `"sensitive"`. `"name"` is the name of the credential you are storing. This name is used to reference the credential in your workflow. `"value"` is the credential you are storing (can this be any data type like array, object, string, int, float etc WIP WIP WIP?). `"sensitive"` is a boolean. If it is true, when you save your credentials, this credential will be encrypted and censored within your vault. No one will be able to see its value. It will just look like a string of asterisks. The following is what one credentials set may look like:

```jsx title="Example Credentials Set"
{
  "credentials": [
    {
      "name": "api-key",
      "value": "*******",
      "sensitive": true
    },
    {
      "name": "number-of-members",
      "value": 27,
      "sensitive": false
    },
  ],
  "name": "Docs Example",
  "description": "An example credentials set for documentation.",
  "created": "2024-04-11T12:35:56.328Z"
}
```

The `"api-key"` credential would have had a visible value when created, but once the credentials set was saved and closed, its value was hidden by asterisks as shown.

## Using Credentials

The first step in using a credential set is importing it into your workflow. To do this:
1. In the Credential Vault, find the "ID" of the credential set you want to use. 
2. Then, in your workflow, click on the pencil icon in the toolbar up the top. This will open your workflow's properties.
3. Find the `"credentials"` property, it should be an array. Then, insert the credential set's ID as a string inside this array.

Your credential set can now be used within your workflow.

To reference specific credentials in your workflows using the [placeholder method](./workflows.md#placeholders), follow the format `{{CREDENTIAL.set-name.credential-name}}`. So, in the above example, to use the API key, you would use the placeholder `{{CREDENTIAL.Docs Example.api-key}}`.



[comment]: <> (can you have spaces in the placeholder like that? WIP)


