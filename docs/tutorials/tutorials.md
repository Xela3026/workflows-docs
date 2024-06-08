---
title: Overview
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import CarouselCard from '@site/src/components/CarouselCard';
import Carousel from '@site/src/components/Carousel';

# Tutorials 

Brainstorm:

Various workflows projects that will teach you how to effectively use workflows. Takes you through step by step
I may end up putting this in the overall Workflow docs "Overview" page so that they can quick nav to the tutorials
At any time, refer to the documentation related to each tutorial for more information.

Basic tutorials teach you how to use each feature

<div className="subheader">Basic</div>

<Carousel>
    <CarouselCard code='"value": "Hello, World!"' name="Tutorial 1: Hello, World!" link="./basic/hello-world">Learn Workflows fundamentals. Setup an elementary workflow and test it.</CarouselCard>
    <CarouselCard code='"message": "My name is Alex"' name="Tutorial 2: Placeholders" link="./basic/placeholders">Interpolate values using placeholders. The program will concatenate two strings stored in placeholders.</CarouselCard>
    <CarouselCard code='"size": "Medium"' name="Tutorial 3: Conditions" link="./basic/conditions">Learn how to use conditions and logic to perform different actions in different situations.</CarouselCard>
    <CarouselCard code='"message": "Dangerous weather: Violent Rain. Be cautious."' name="Tutorial 4: Fetch Requests" link="./basic/fetch-requests">Send an API request to retrieve and then output some data about the weather.</CarouselCard>
    <CarouselCard code='"containsLoremIpsum": true, "thirdSentence": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"' name="Tutorial 5: TXT File Stream" link="./basic/txt-file-stream">Read a TXT file and output some information about it.</CarouselCard>
    <CarouselCard code='"containsRed": ["White", "Silver", "Gray", "Red", "Maroon", "Yellow", "Olive", "Fuchsia", "Purple"]' name="Tutorial 6: CSV File Stream" link="./basic/csv-file-stream">Read a CSV file and output some information about it.</CarouselCard>
    <CarouselCard code='WIP' name="Tutorial 7: HTTPS Request" link="./basic/https-request">WIP</CarouselCard>
    <CarouselCard code='WIP' name="Tutorial 8: Repeating a Step" link="./basic/repeating-step">WIP</CarouselCard>
    <CarouselCard code='"message": "Payload is sufficient"' name="Tutorial 9: Execution Keys" link="./basic/execution-keys">Manage and use execution keys to communicate between two workflows.</CarouselCard>
    <CarouselCard code='WIP' name="Tutorial 10: Fetch Request #2" link="./basic/fetch-request-two">Use the Credentials Vault to make requests to the Yabbr API.</CarouselCard>
    <CarouselCard code='WIP' name="Tutorial 11: API File Stream" link="./basic/api-file-stream">Use the Yabbr API to read your own stored files.</CarouselCard>
</Carousel>


Advanced tutorials teach you how to sequence each feature to create a full, useful, automated project

<br/>

<div className="subheader">Advanced</div>

<Carousel>
    <CarouselCard code='"value": "Hello, World!"' name="Tutorial 1: Hello, World!" />
    <CarouselCard code='"stored1": "Hello", "stored2": "World!"' name="Tutorial 2: Placeholders" />
    <CarouselCard code='"messageSender": "61400000003", "messageRecipient": "61400000002"' name="Tutorial 3: Fetch Requests" />
    <CarouselCard code='"isMessageLate": true' name="Tutorial 4: Conditions"/>
    <CarouselCard code='"line2": "He owns a car.", "isJohnPresent": true' name="Tutorial 5: TXT File Stream" />
    <CarouselCard code='"status": "Success"' name="Tutorial 6: CSV File Stream" />
    <CarouselCard code='"message": "Step 2 Completed"' name="Tutorial 7: Execution Keys" />
    <CarouselCard code='TBD' name="Tutorial 8: Repeating a Step" />
    <CarouselCard code='"status": "Success"' name="Tutorial 9: Save to Instance" />
</Carousel>




Brainstorm:
The different tutorials will also all be avaible on the sidebar



Goal - what is the purpose of the workflow. What is it teaching you?
Prerequisites maybe? (JSON, other tutorials?, basic programming ability?)
Desired input/output - code block of what the program should be doing
Walk through - step by step of how to create it. Maybe a 'setup' - credentials, store variables, etc
Code summary - full code at the end




Tutorial plans (grouped):


Hello World
Using placeholders (probably use 'payload' here. Maybe 'store')
Dice roller (try and get them to make this at the end)

Fetch request + return to caller (use a Yabbr GET Message request as an example)

Using a condition + return to caller - Extension: condition groups and condition modifiers
Fetch request + condition + return to caller

File stream TXT + return to caller (find some example file URL online)
File stream CSV + return to caller
File stream + condition + return to caller

Execution keys

Advanced:




Projects:

recording survey results? idk some business applications - ask Logan for these



Note - most of these will use either 'payload' or 'store' as the input

Tutorial 1:
Setting up a workflow and a step
Return to caller

    Program - start the program, return to caller "Hello, World!"

Tutorial 2:
'store' variables and 'payload' variables
placeholders
maybe the other expressions - random number, date, etc. as an extension

    Program - store "My name is". Return stored value + payload.name. User inputs name into payload, outputs "My name is John" for example


Tutorial 4:
conditions
payload



Tutorial 3:
fetch function
conditions



Tutorial 5:
txt file stream
(could teach other condition functionality here like the modifiers and groups)


Tutorial 6:
Learning the Execute Step action
Learning about CSV file stream
Learning about the HTTPS request action (+ credentials maybe)

Tutorial 7: 
Learn HTTPS Request
Learn Next Step action


Uses the payload as the input. Sends an execution key and the payload to another workflow. The other workflow processes it and then sends a value back to the workflow using the exec key. It catches this new value and outputs it


Tutorial 8:
Repeat eval
Save to instance
Idea - payload is a txt file that contains another URL. Use a condition to see if the txt file has the word 'elephant'. If not save the txt file to the instance and repeat with the new txt file link. This second file will have the word 'elephant'. Save to instance and return the instance to the caller.
The 'code' for this card will be a single joined string from the two files - TBD what that string is

Tutorial 9:
Learning how to use exec keys
HTTPS request action again (+ credentials maybe)
talking between workflows


I don't have anything for the "Stream To" action, but I don't think it's that important. If they really want it it's in the docs.

One of these tutorials should really teach Credentials

[comment]: <> (need to figure out a way to incorporate HTTPS requests. Maybe I can put them in Fetch Requests Part 2.)





Advanced tutorial:
like the weather tutorial, but running a campaign to alert people maybe. and then also creating a scheduled event.

May want to loop through a bunch of customers or messages and make a decision on each

The advanced tutorials should use some Yabbr API endpoints


Create a list of the 10 last numbers that one of your virtual numbers texted.



Fetch a file URL, stream the file, and use the information (maybe run a campaign, or iterate through each customer in the file)


like the colours tutorial, but send a fetch request to a free colour API to get the colour scheme for the colour
