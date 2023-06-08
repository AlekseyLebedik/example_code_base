
## Support

#### Title Support

To request support, enter a ticket in our tracking system by emailing [support@support.demonware.net](mailto:support@support.demonware.net). Demonware uses this system to ensure that you get a timely response from our best qualified staff member, and only closes a ticket when you are satisfied that the issue is resolved.

Use the support system to:

*   initiate discussion on a new project
*   seek technical advice
*   report an issue
*   any other inquiry


##### When to contact us:

*   Our support team is available from 10am - 6pm GMT as well as 9am - 5pm PST (Monday - Friday)
*   If you email us outside these hours we will do our best to answer on the next business day


##### How to contact us:

*   Email [support@support.demonware.net](mailto:support@support.demonware.net) or your project-specific support alias.
*   Slack [#dw-devzone](link:https://demonware.slack.com/archives/C01PNGF5C00).
*   For technical issues and bugs please include all of the following details appropriate for your title:
    *   The Demonware title id
    *   The Environment (dev/cert/prod)
    *   The Platform (ps4/Xbox One/WiiU/etc)
    *   A detailed description of how to reproduce the issue
    *   Any relevant debugging information such as DNS strings, error codes, call stacks, lists of running threads, etc.


#### Emergency Support Outside Regular Hours

Demonware offers emergency support outside regular office hours including during Irish and Canadian public holidays.

The emergency support email is monitored 24/7/365.


##### When to contact us:

*   Your issue is with production services and impacts a significant number of users
*   Your issue is with a title in development or certification and waiting until the next business day would risk missing a deadline


##### How to contact us:

*   Send a detailed technical description of the issue to [emergency@support.demonware.net](mailto:emergency@support.demonware.net). Please include the following details:
    1. Who we should contact, name of the developer and a phone number where they can be reached
    2. Details of the deadline in jeopardy
    3. All relevant debugging information such as error codes, call stacks, lists of running threads etc.






## Oxford
###### Documentation portal
<br />
**What features are available?**

Demonware provides the following features for game studios:



*   Cross-platform support
*   Authentication and user management
*   Matchmaking
*   Leaderboards
*   Statistics and metrics gathering
*   Microtransactions
*   Data storage and analysis

<br />

Oxford is Demonwares documentation portal. it provides information on what we do, what features are available and how to work with us.

It provides information on topics such as


1. [Supported Platforms](https://info.demonware.net/miscellaneous/latest/supported-platforms.html)
2. [Demonware Certification Requirements](https://info.demonware.net/miscellaneous/latest/demonware-certification-requirements.html)
3. [How to Provide us with Game Builds](https://info.demonware.net/miscellaneous/latest/how-to-provide-us-with-game-builds.html)
4. [Life Cycle of a Demonware Integration](https://info.demonware.net/miscellaneous/latest/life-cycle-of-a-demonware-integration.html)
5. [What to do at each Title Milestone](https://info.demonware.net/miscellaneous/latest/what-to-do-at-each-title-milestone.html)
6. [General Codebase Topics](https://info.demonware.net/miscellaneous/latest/general-codebase-topics.html)
7. [A Warning About Thread Safety](https://info.demonware.net/miscellaneous/latest/a-warning-about-thread-safety.html)

As well as the getting started documenting for working with Demonware it covers the definitions of User Identity, Multiplayer & Competitive play, Storage and Stats, Comms and the Game Economy.

Oxford also provides details about Security, Data collection.




## Server Logs
<br />
Located in the Debugging section of Devzone and is used to investigate user issues using a number of data sources.



*   User ID
*   Connection ID
*   Transaction ID
*   Message
*   Date Range

With a number of advanced filters

Log Levels



*   Error
*   Warning
*   Debug
*   Info

Sources



*   Auth3
*   Marketplace
*   MMP3
*   Dwsproxy
*   Loot-generation
*   Webservice
*   Achievements Engine
*   Tournaments Engine
*   LSG
*   LoginQueue
*   ABTesting
*   ObjectStore
*   CommsService
*   Storage-script-service
*   Uno
*   Umbrella

Users are initially presented with the most recent logs for the Title Environment with no filters applied.

**Filter Meta**

Enter any meta which has been obtained into the field (e.g. Transaction ID). The Data Grid will present the first 100 logs with that filter. Users can



*   Add more Meta Filters
*   Click the checkboxes in the Advanced Filters
*   Search the Data Grid with the search bar that sits above it
*   Drag the Column Headings into the Row Grouping bar sitting above (to reconfigure the grid)

Filters are used to narrow down the investigation to find the source of the issue

**Adjacent Messages**

One of the key features of Service Logs which facilitates quicker investigation is the Adjacent Messages icon button which is located at the far right of the Grid.

It enables users to see the messages above and below a message which is of interest (and could provide context, by understanding what happened before and after the suspicious activity), without having to deselect  all the filters each time.
