---
title: Domains
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tag from '@site/src/components/Tag';
import CustomisableImage from '@site/src/components/CustomisableImage';
import BrandName from '@site/src/components/BrandName';

# Domains

Within Workflows, a Domain Metadata System (or Domain for short) is a way to store data in your workspace. You can either store data directly inside the domain, or have the domain point to an API endpoint. Unlike [credentials](./credential-vault), the data in these domains is accessed via a GET API request to the domain. Learn more about how these domains work on this page.

Learn how to configure the domain JSON in [Configuration](#configuration).

Learn how to access the data in a domain in [Accessing Data](#accessing-data).

---

## Initialisation

To create a new domain, navigate to the Domains section on the sidebar:

<CustomisableImage src="/img/domains-nav.png" alt="Domains Sidebar Nav" width="500"/>

Then, click on '+ New Record':

<CustomisableImage src="/img/new-domain.png" alt="New Record" width="500"/>

Clicking that button will open this menu:

<CustomisableImage src="/img/new-domain-menu.png" alt="New Domain Menu" width="400"/>

Give your new domain a name under 'New Domain Name'. This will be used when making the GET request to the domain. Finally, click <Tag colour="#1582d8" borderColour="#1582d8" fontColour="#FFFFFF">CREATE</Tag> to finalise the initialisation of your new domain.



---

## Configuration


Creating a new domain will give you with the following JSON:

```jsx title="Domain JSON"
{
  "body": {},
  "meta": {}
}
```

The `"body"` property is the data you are storing in the domain. You can store whatever properties and values you want in this object. 

If a POST request is made to the domain (instead of GET), then the request will be forwarded to another API endpoint. The `"meta"` property describes this forwarding process. If this is empty, a POST request will do nothing.

The `"meta"` object can have three properties:
- `"execution"`: the API URL to forward the request to.
- `"execMethod"`: the API method to make the forwarded request with. Defaults to "POST".
- `"dataPassThrough"`: boolean. The domain receives a `"body"` from the POST request made to it. A `true` value here will combine the received `"body"` and the `"body"` stored in the domain. `false` will use just use the domain's stored `"body"` body in the forwarded request.



---

## Accessing Data

To access the data stored in a domain, make a GET request to it. The URL of this request will be formatted as "<BrandName type="dms"/>/namespaces?domain=&#123;&#123;domain-name&#125;&#125;", where &#123;&#123;domain-name&#125;&#125; is the name of the domain you are retrieving data from. Once you make this request with the proper authentication, the response to your request will include the `"body"` stored in the domain. 



If you make a POST request instead, the domain will forward your request to the endpoint listed under `"execution"` in its `"meta"` property.



---


## Management

After configuring a domain or navigating to the Domains page using the sidebar, you will be met with the domains homepage:

<CustomisableImage src="/img/domains-homepage.png" alt="Domains Homepage" width="700"/>

The domains homepage will display all of your workspace's domains. The menu will just display the domain's name under 'Portal Address' (not shown here). Open up the JSON of a domain by clicking on it.



[comment]: <> (ask Alex about the workflow wizard stuff and the .w.yabbr.io endpoint. And that SMS message example Alex was talking about.)

