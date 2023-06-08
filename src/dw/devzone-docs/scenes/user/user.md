## Mega Nav

The MegaNav contains links to all services within Devzone.

It also includes bookmarking functionality, which enables users to save their most frequently used or most important links to visually separate them and facilitate quick access.

<br />
<br />
#### MegaMenu

The new MegaMenu format provides a unified view of Devzone and includes:

- Links to all Services (grouped) in a single view
- Devzone Collaborator Verticals - Event Manager and Frameworks (incl. support info)
- Simple Navigation search

<img src="/images/mn/meganav1.png" width="" alt="alt_text" title="mega nav screen">

<br />
<br />
#### Bookmarks

MegaMenu links can also be bookmarked and will appear under the Bookmark menu. You can create a shortened menu of regularly used links.

<img src="/images/mn/meganav2.png" width="" alt="alt_text" title="mega nav screen">

<br />
<br />
#### SubNavigation

All links for a service group will appear as a subnav, to enable quicker navigation between services within the same group.

<img src="/images/mn/meganav3.png" width="" alt="alt_text" title="mega nav screen">

<br />
<br />
#### Getting Started Documentation

Documentation is available here for all users for Devzone.

Each link in the dropdown menu will take you to the section in the Devzone Getting Started Guide.

You will find the documentation grouped by user type

- Devzone User - How to use the Devzone UI
- Game Developer - Information for Game Developers on how to get support from Demonware, our documentation portal and debugging using Devzone
- Devzone Developer - Collaborating, developing and integrating tooling in Devzone

<img src="/images/mn/meganav4.png" width="" alt="alt_text" title="mega nav screen">

<br />
<br />
<br />
<br />
<br />
<br />

## Notifications

You can view Release and ongoing Maintenance in the Notifications Panel.
Opening the panel will show the latest Demonware Maintenances at the top.

Underneath are the Release Notes for the Devzone Platform. With the most recent releases of each app (Devzone, Frameworks and Event Manager) shown.

New items added will show a badge above the Bell icon (with the number of new items).
And within the panel new items will show an “unread” label next to the new item.

Notifications also included an Archive section. Which can be viewed by clicking “View more release notes” in the footer of the panel.

<img src="/images/mn/meganav5.png" width="" alt="alt_text" title="mega nav screen">

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

## AB Testing

Devzone provides end user tooling for managing Demonwares AB testing service.

There are 3 sections to managing AB Tests

1. **[Tests (Create and Edit)](#create-and-edit-tests) -** Located in the subnav this is where a user can open a blank Test form to configure for a new test. The same screen is displayed when editing. This includes the creation of [Cohorts](#cohorts) and [Treatments](#treatments) for Tests.
2. **[View Tests](#view-tests) -** Tests are viewed in multiple data grids across 3 sub sections. Each data grid contains top level meta for the test and a set of actions available for each test.
3. **[Groups (Create and Edit)](#create-and-edit-groups) -** Groups enables test creators to manage a defined set of users (e.g. QA) to be specifically subject to the same tests criteria as a cohort. Group must be associated with a Context.

### Create and Edit Tests

#### Create a test

To create a test click on the link on the right hand side of the sub nav bar.

The majority of fields are required, however the Context is the primary field to select. This is important for adding the treatment configs, if a context is not selected the add a config Icon will not be active.

<img src="/images/abt/abtesting1.png" width="" alt="alt_text" title="abtesting nav">

##### Enrolments

The enrolment dates must be set for some time in the future

<br />
<br />

#### Cohorts and Treatments

**Algorithm and Seed**

With deterministic hashing, for example 3 tests can be run back to back with the same seed to have the same effect as the four cohorts. Which allows one cohort listed as the control.

To use this approach just select form the Algorithm dropdown

<img src="/images/abt/abtesting2.png" width="" alt="alt_text" title="abtesting nav">

In addition to the deterministic hashing, there is an option to add the value for the seed for each test. If none is added it will be auto generated.

<br />
<br />

##### Cohorts

At least one cohort needs to be populated to run a test. New cohorts can be added by clicking the “+” icon above the cohort section

<img src="/images/abt/abtesting3.png" width="" alt="alt_text" title="abtesting cohort">

Also for each test a control cohort is required. If there is only one cohort this will be preselected with a blue check box.

<img src="/images/abt/abtesting4.png" width="" alt="alt_text" title="abtesting cohort">

To create a cohort the Name, Source and to/ from dates must be added.

<img src="/images/abt/abtesting5.png" width="" alt="alt_text" title="abtesting cohort">

<br />
<br />

##### Source

There are 3 source options available in the dropdown

- Manual - enable the upload of a user set in a CSV
- Global - percentage of the population
- Segment - specific predetermined segment of the population which an also be split by percentage

<br />
<br />
<img src="/images/abt/abtesting6.png" width="" alt="alt_text" title="abtesting cohort source">

<img src="/images/abt/abtesting7.png" width="" alt="alt_text" title="abtesting cohort source">

<img src="/images/abt/abtesting8.png" width="" alt="alt_text" title="abtesting cohort source">

<br />
<br />

Segments are created externally, clicking on the field will open a model with Segment table.
Segments in the modal can be searched, deleted and added.

<img src="/images/abt/abtesting9.png" width="" alt="alt_text" title="abtesting segment">

<br />
<br />

##### Treatments

Multiple treatments can be added to a cohort. To add an additional treatment click on the “+” icon the Cohort header.

<img src="/images/abt/abtesting10.png" width="" alt="alt_text" title="abtesting segment">

<br />
<br />

##### Treatment Configs

To add a config to a treatment there are 2 options, add a new or select from an existing list of configs.

**Add new config**

To add a new config click the “+” in the treatment section

<img src="/images/abt/abtesting11.png" width="" alt="alt_text" title="abtesting new config">

You will be presented with a modal, where the details of the Config are added, including the target and JSON Structure.

<img src="/images/abt/abtesting12.png" width="" alt="alt_text" title="abtesting update config">

If the service target or the JSON format is incorrect, error messages will be displayed.

<img src="/images/abt/abtesting13.png" width="" alt="alt_text" title="abtesting add config">
<img src="/images/abt/abtesting14.png" width="" alt="alt_text" title="abtesting add config">

<br />
<br />

**Add an existing config**

To select an existing config click the “list” icon

<img src="/images/abt/abtesting15.png" width="" alt="alt_text" title="abtesting view config">

You will be presented with a grid with a list of existing configs to select from

<img src="/images/abt/abtesting16.png" width="" alt="alt_text" title="abtesting select config">

There are options to

- Search
- Restructure the table to row groups e.g. drag Service column header into the grey bar to view all configs by service. The same can be done by date.

Both these options are limited to the configs shown in the table.

To view more configs continue to scroll

<br />
<br />

#### Edit a test

Once a test has been created and before it has been approved, it has a status of “config” where there is an option in the action bar to edit.

<img src="/images/abt/abtesting17.png" width="" alt="alt_text" title="abtesting status">

The option to edit a test is also available when you “view” a test that has still got a “config” status.

<img src="/images/abt/abtesting18.png" width="" alt="alt_text" title="abtesting details">

#### Continuous Saving

Ensure when you are creating or modifying tests to save continuously to avoid losing any work.

<br />
<br />

#### Error Messaging

There are a number of fields required when creating or modifying a test. If they have not been completed or these will be presented when you click the save button.

<img src="/images/abt/abtesting19.png" width="" alt="alt_text" title="abtesting details">

<img src="/images/abt/abtesting20.png" width="" alt="alt_text" title="abtesting details">

<img src="/images/abt/abtesting21.png" width="" alt="alt_text" title="abtesting details">

#### Permissions

Editing a test requires having the permissions to do so.

<br />
<br />

### View Tests

There are multiple subsections within AB Testing to view tests at different phases of their lifecycle. Each phase is determined by its status.

To view a test at any of these 6 Status phases, Devzone AB Testing is divided into 3 primary subsections.

<img src="/images/abt/abtesting22.png" width="" alt="alt_text" title="abtesting sub nav">

#### [Scheduled]

- **Config -** in which the test variables and meta are defined
- **Approved -** when a test has been fully configured it requires validation and approval before the test can be run.
- **Active -** where the new experience is presented to the enrolled users
- **Analysis -** where the outcome of the test is reviewed

<img src="/images/abt/abtesting23.png" width="" alt="alt_text" title="abtesting sub nav">

Scheduled shows all currently active tests at different phases and is divided in 3

1. **Upcoming** - tests in the configuration phase, full configured and waiting approval or approved and waiting for the enrolment date.
2. **Live** - tests currently live and running
3. **Recently Finished** - tests which have completed the first 3 phases and are ready or are actively being analysed.

<br />
<br />

#### Archive

- **Archived -** tests finished analysis and are archived for future reference or a base clones to accelerate or replicate previous tests.

#### Killed

- **Killed -** tests which have been stopped at any stage after the test has gone live and before completing phase 3.

<img src="/images/abt/abtesting24.png" width="" alt="alt_text" title="abtesting sub nav">

<br />
<br />

#### Actions

The test grid also contains an action column which is fixed on the right hand side. It contains a number actions which enable the user to

- Edit
- Clone
- Propagate
- Approve
- Delete, Kill or Archive (depending on the phase of the test)

<br />
<br />

#### View Data Grid Tour

<img src="/images/abt/abtesting25.png" width="" alt="alt_text" title="abtesting grid">

**Grid management**

The grid in which the tests appear can be manipulated to give each user their own preferred view of the meta e.g.

- Rows can be searched
- Rows can be grouped
- Columns can be filters
- Column can be reordered
- Columns can be hidden
  … by default tests are ordered alphabetically.

**Green row background**

If the row background is green it is to more easily highlight that a test is linked to a live environment.

<img src="/images/abt/abtesting26.png" width="" alt="alt_text" title="abtesting grid">

Tests will stay in this group until the test becomes active. At which point it moves to the “Live” group.

<br />
<br />

##### Live

When a test appears in the live group the status will change to “Active”.

The icons to edit and approve will not be active. Users with the relevant permission will be able to …

- Clone
- Propagate
- Kill

<img src="/images/abt/abtesting27.png" width="" alt="alt_text" title="abtesting grid">

##### Recently Finished

Once the test has run the test will move from the “Live” to the “Recently Finished” group.

Completed tests remain in “Scheduled” rather than moving straight to archive as they need to be reviewed by Analysts. When the analysis is complete the Analyst should click the Archive icon to move it to the Archive grid.

<img src="/images/abt/abtesting28.png" width="" alt="alt_text" title="abtesting grid">

<br />
<br />

##### Killing a Test

Killing a test is an action that cannot be undone. User will be presented with a confirmation modal to ensure the action is not clicked by mistake

<img src="/images/abt/abtesting29.png" width="" alt="alt_text" title="abtesting grid">
<img src="/images/abt/abtesting30.png" width="" alt="alt_text" title="abtesting grid">

#### Archived

Tests are archived for historical purposes. From here they can be used for reference, review or as a clone, to replicate or as a base template for another test.

<br />
<br />

#### Killed

Tests in this section have been stopped after a test has been approved and before the test has finished. Like Archived tests they can be used for reference, review or as a clone, to replicate or as a base template for another test.

### Create and Edit Groups

Groups are used to create defined sets of users, which can be specified in a test to experience the treatment(s) of a specific cohort.

Within the groups section you can create new or view existing groups. To view an existing group you need to select a context from the dropdown.

<img src="/images/abt/abtesting31.png" width="" alt="alt_text" title="abtesting title selector">

<br />
<br />

#### View a group

To view a group you need to select a context first. You can then search or scroll to select a Group to view.

When you view a Group you will be presented with

- A list of the Users with the ability to add, modify or delete the users in the Group.
- List of the Tests and Cohorts to which the Users are associated.

<img src="/images/abt/abtesting31.png" width="" alt="alt_text" title="abtesting groups">

<br />
<br />

#### Create a group

Within groups, click the “+” icon, this will display a modal

<img src="/images/abt/abtesting31.png" width="" alt="alt_text" title="abtesting create groups">

All fields are required.

There are 2 options to add users to the group

- Upload / drag and drop a csv of users
- Select a user from the dropdown and click “Add User”

Once the group is created it will appear in the list for the relevant context.

<br />
<br />

#### Cohort overrides

Groups are used to override Cohorts and when a group has been created it will become available on the Cohort override section at the base of the AB Testing create form.

As Groups are linked to a Context, ensure the right context has been selected to view the Group in the dropdown

<img src="/images/abt/abtesting34.png" width="" alt="alt_text" title="abtesting overrides">

<br />
<br />
<br />
<br />

<br />
<br />
<br />
<br />

#### Accounts

## Accounts

Accounts is the primary view of a user's account details.

<img src="/images/ac/accounts1.png" width="" alt="alt_text" title="accounts screen">

<br />
<br />
#### Player ID / Gamertag

Accounts is a Player ID / Gamertag driven service. To view or test the service if you do not have either, enter one of the following:

- dw%
- Test
- Search within Session viewer, by selecting a Playlist, Data Centre and expanding the Lobby.

Accounts is split into a left and right panel.

<br />
<br />
###### Left Panel

The left panel contains

- Number of Account listed (initial load 200)
- Export Accounts Icon
- Player ID | Gamertag Search
- Accounts List
     - Player ID
     - Gamertag
     - Reputation
- Show more button to load more accounts (200 increments)

<img src="/images/ac/accounts2.png" width="" alt="alt_text" title="accounts screen">

<br />
<br />
#### Search

To search for a Player either scroll through the list on the left or enter a “Player ID” or “Gamertag” into the search box (incl partial search).

<br />
<br />
#### Export

To export all accounts click on the download icon and select one 2 options

- CSV
- JSON

<img src="/images/ac/accounts3.png" width="" alt="alt_text" title="accounts screen">

<br />
<br />
###### Right Panel

The right panel contains

- Player Details
- User Files

<img src="/images/ac/accounts4.png" width="" alt="alt_text" title="accounts screen">

<br />
<br />
#### Player Details

When a player is selected the detail panel shows Player details user

- User Profile
     - Reputation Score
     - Private Profile
- Publish Profile
- User Keys
     - Dedicated Keys
     - Non-dedicated Keys

<br />
<br />
##### User Profile - Edit Reputation

Click the edit Icon next to reputation

Change the score and click the save icon

<img src="/images/ac/accounts5.png" width="" alt="alt_text" title="accounts screen">

<img src="/images/ac/accounts6.png" width="" alt="alt_text" title="accounts screen">

<br />
<br />
#### User Files

Within the details panel there is a link on the right hand side in the header “User Files”

Clicking on the link will take you to the “User Objects” section in Objectstore.

<br />
<br />
<br />
<br />

## Linked Accounts Lookup

Located under Account, Linked Accounts Lookup enables you to search for all of a users accounts across platforms and social media with an UNO ID.

<img src="/images/lac/linkedaccountsimage1.png" width="" alt="alt_text" title="linked accounts screen">

<br />
<br />
#### Player ID / Gamertag

Linked Accounts Lookup is both UNO and Player ID / Gamertag driven, depending on what you select from the service dropdown. To view or test the service if you do not have either, enter one of the following:

<br />
<br />
##### UNO ID Selection

You can use the following to search for a Player

- dw%
- UNO Gamertag (Username)
- UNO PlayerID (AccountID)

<br />
<br />
##### Platform ID selection

You can use the following to search for a Player

- dw%
- Gamertag (Username)
- PlayerID (Secondary AccountID)

Linked Accounts Lookup is split into a left and right panel.

<br />
<br />
###### Left Panel

The left panel contains

- Number of Linked Accounts listed
- Export Accounts Icon
- Player ID | Gamertag Search
- Accounts List
- Show more button to load more accounts

<img src="/images/lac/linkedaccountsimage2.png" width="" alt="alt_text" title="linked accounts screen">

<br />
<br />
#### Search Options

There are a few variables which can be used to search

**Account dropdown **

Enables you to select an account type to search by

<br />
<br />
**Partial Search**

To do a partial search on a GamerTag add '%' to the end. For example 'John%'

<img src="/images/lac/linkedaccountsimage3.png" width="" alt="alt_text" title="linked accounts screen">

<br />
<br />
###### Right Panel

The right panel contains

- Linked Account Details
- Rename UNO account

<br />
<br />
#### Card meta

Each displays all the relevant meta per account. Incl.

- Username
- Created
- Updated
- Account ID
- Secondary Account ID
- Provider

<img src="/images/lac/linkedaccountsimage4.png" width="" alt="alt_text" title="linked accounts screen">

<br />
<br />
#### Rename

Within the UNO card there is the option to Rename the Username. This can be for a number of reasons, including malicious names.

To rename, click the rename button and you will be presented with the “Update Account Details” modal

<img src="/images/lac/linkedaccountsimage5.png" width="" alt="alt_text" title="linked accounts screen">

To remove crossplay hash from username just selected the checkbox

When the changes are made, click update.

<br />
<br />
#### Banned

Banned accounts are shown in Red

<img src="/images/lac/linkedaccountsimage6.png" width="" alt="alt_text" title="linked accounts screen">

<br />
<br />
<br />
<br />

#### Achievements

## Active Ruleset

Located in the Achievements Section, Active Ruleset shows a list of rules from the current ruleset.

<img src="/images/ar/activerulesets1.png" width="" alt="alt_text" title="active ruleset screen">

<br />
<br />

#### Ruleset Details

The Active Ruleset name and date of creation can be seen near the top over the Data Grid.

You can click the Ruleset name to see the Ruleset list with the Active Ruleset selected.

The Data Grid shows the:

- Name
- Achievement ID
- Description
- Kind
- Subscribed Events
- Requires Activation
- Requires Claim
- Activation Fee
- Priority
- Multi-progress Target

<br />
<br />

## Rulesets

Located within Achievements, Rulesets will show a list of the available rulesets for a Title Environment.

<img src="/images/rs/rulesets1.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />
###### Left Panel

Left panel contains

- Number of Rulesets listed
- Upload Ruleset Icon
- Ruleset Search (no Partial Search)
- Ruleset List
     - Ruleset Name
     - Ruleset Status (Active, Validated, Uploaded)
     - Ruleset Timestamp
- Checkboxes to select for deletion
- Delete Icon

<br />
<br />
#### Ruleset List

All rulesets are listed in the left panel. The status of the ruleset is noted on the right side of the card. Active ruleset denotes the ruleset shown in the Active Ruleset nav item.

Uploaded stores require validation and each status is noted in the card.

<img src="/images/rs/rulesets2.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />
##### Search

Simply enter the Ruleset label into the search bar above the list and hit enter.

<br />
<br />
##### Upload Ruleset

To upload a ruleset, click to upload icon in the top right of the Ruleset List and you will be presented with a modal.

All fields are required and you will be presented with the standard error messaging.

<img src="/images/rs/rulesets3.png" width="" alt="alt_text" title="rulesets screen">
<img src="/images/rs/rulesets4.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />
##### Delete Ruleset

To delete a ruleset from the list, click the checkbox or one, multiple or all stores and click the trash icon above the list.

<img src="/images/rs/rulesets5.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />
###### Right Panel

Right panel contains

- Active Icon (for non-active Rulesets)
- Check Rulesets Icon
- Propagate Icon
- Download Icon
- Ruleset Details
     - CodeHash
     - LastUpdateTimestamp
     - Namespace
     - Label
     - CodeSignature
     - ActivationTimestamp
     - CreationTimestamp
     - IsActive
     - CodeSignatureTimestamp
- Code Block

<br />
<br />
#### View Ruleset

To view the Ruleset Details and code block, click on a ruleset on the left.

To view either click on the tabs

<img src="/images/rs/rulesets6.png" width="" alt="alt_text" title="rulesets screen">

<img src="/images/rs/rulesets7.png" width="" alt="alt_text" title="rulesets screen">

Within the Details area on the right as well as the details and code block there are also a number of action icons

- Activate (only available for Validated Rulesets)
- Check Rulesets
- Propagate
- Download

<br />
<br />
##### Activate

Clicking Active will present a modal to ensure its the action you want to perform

<img src="/images/rs/rulesets8.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />

##### Check

Clicking Check will check that the selected ruleset is valid.

<img src="/images/rs/rulesets11.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />
##### Propagate

If you want to propagate a ruleset to another Title Environment, click the propagate icon and you will be presented with a modal.

<img src="/images/rs/rulesets9.png" width="" alt="alt_text" title="rulesets screen">

The label will be pre populated but you will be required to select the Title Environment you wish to propagate to. You can also define if you wish the Ruleset to be Active when it propagates.

<img src="/images/rs/rulesets10.png" width="" alt="alt_text" title="rulesets screen">

<br />
<br />
##### Download

To download a ruleset simply click the download icon and the store will automatically download.

<br />
<br />

## Player Achievements

Player Achievements in Devzone enables you to view, inspect, and modify the Achievement state for a Player.
This includes sending events to trigger Achievements and directly modifying the User State.

The UI's initial view shows a field to select a Player to view and is split into 3 tabs:

- **Achievements -** Enables you view and manage a Player's Achievements, view their current state and send an event, or reset the Player's data.
- **Audit -** Presents you with a view of all actions related to Achievements Engine an Marketplace for that Player.
- **Manage** (Coming Soon) - Will enable you to manage a user e.g. cloning.

<img src="/images/pa/player-achievements-1.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />

#### View a Player's Achievements

Enter a Player ID or Gamertag into the indicated field. Under the Achievements tab you will initially see:

- User State panel (minimized)
- Send Event panel (minimized)
- Delete Player Data button (red)
- Achievements grid listing each achievement including:
     - Name
     - Status
     - Progress
     - Type
     - Activation Timestamp
     - Expiration Timestamp
     - Kind
     - Times
     - Achievement ID
     - Multi-Progress

<img src="/images/pa/player-achievements-2.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
##### User State

Expand the panel to show the Player's current user state.
You can update the Player's user state via the code editor. Click save to have the changes applied.

<img src="/images/pa/player-achievements-6.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
##### Send Event

You can send an event to the Player. Expand the panel to show the code editor. To send an event:

- Add an event name in the field above the code editor (required)
- Enter the event content (JSON) you want to send
- Click Send

Any event sent is shown in the Audit log under the [Audit Tab](#audit-logs)

<img src="/images/pa/player-achievements-7.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
#### Delete All Player Data

You can delete User State and all Achievements progress using this button next to the User State and Send Events panels.
**Please note this is an unrecoverable deletion of user data!**

To delete all Player data:

- Click the small red delete icon
- Confirm your decision in the modal popup

<img src="/images/pa/player-achievements-14.png" width="" alt="alt_text" title="player achievements user data delete">

<img src="/images/pa/player-achievements-15.png" width="" alt="alt_text" title="player achievements user data delete">

After you confirm, you will see this success message if the delete worked.

<img src="/images/pa/player-achievements-16.png" width="" alt="alt_text" title="player achievements user data delete">

<br />
<br />
##### Achievements Grid

Shows a list of all Player and Ruleset Achievements. Each Achievement shows detail on its progress and state.
Additionally you can expand each row (if the row has Player data) to show the full details. To do so click the arrow 
at the beginning of each row.

<img src="/images/pa/player-achievements-4.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
###### Delete Specific Achievements

To delete a Player's Achievements in progress you have to select rows by checking checkboxes near the each achievement name you want to delete.
A delete button (with selected achievements count) will be shown in the top right corner of the Achievements Grid.
After clicking the delete button you will be presented a modal asking “Are you sure you want to delete selected player's achievements?”.

<img src="/images/pa/player-achievements-10.png" width="" alt="alt_text" title="player achievements screen">

<img src="/images/pa/player-achievements-3.png" width="" alt="alt_text" title="player achievements screen">

On successful delete you will be shown the success notification message.

<img src="/images/pa/player-achievements-13.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
##### Clone Player Achievements

Clone Player Achievements enables you to copy the achievement state of one player to another, across environments and titles. Additionally a temporary backup is taken of the target players current state before changes are applied and can be restored at any time.

To clone, click the "Clone player's achievements" button in the top right of the page.

<img src="/images/pa/player-achievements-17.png" width="" alt="alt_text" title="player achievements screen">

In the modal pop up, select either the same or a different environment context and a player ID or gamertag as the target to clone into.

<img src="/images/pa/player-achievements-18.png" width="" alt="alt_text" title="player achievements screen">

A notification message will appear once player achievements have been successfully cloned.

<img src="/images/pa/player-achievements-19.png" width="" alt="alt_text" title="player achievements screen">

##### Required Permissions

User must have the "Achievements Engine" > "Clone player achievements" permission enabled to clone achievements.

##### Backups & Restoring

The player achievements backup can be restored by clicking the "Restore this Player's Achievements" button in the top right.

<img src="/images/pa/player-achievements-20.png" width="" alt="alt_text" title="player achievements screen">

A dialog will appear where the user can confirm the restore.

<img src="/images/pa/player-achievements-21.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />

## Clan Achievements

Clan Achievements in Devzone enables you to view, inspect, and modify the Achievement state for a Clan.
This includes sending events to trigger Achievements and directly modifying the User State.

The UI's initial view shows a field to select a Clan to view and currently has 1 tab:

- **Achievements -** Enables you view and manage a Clan's Achievements, view its current state and send an event, or reset the Clan's data.

<img src="/images/ca/clan-achievements-1.png" width="" alt="alt_text" title="clan achievements screen">

<br />
<br />

#### View a Clan's Achievements

Enter a Clan Name, ID, Tag, Member Name, or ID into the indicated field. Under the Achievements tab you will initially see:

- User State panel (minimized)
- Send Event panel (minimized)
- Achievements grid listing each achievement including:
     - Achievement Name
     - Status
     - Type
     - Activation Timestamp
     - Expiration Timestamp
     - Times
     - Progress
     - Kind
     - Multi-Progress
     - Achievement ID

<img src="/images/ca/clan-achievements-2.png" width="" alt="alt_text" title="clan achievements screen">

<br />
<br />
##### User State

Expand the panel to show the Clan's current user state.
You can update the Clan's user state via the code editor. Click save to have the changes applied.

<img src="/images/ca/clan-achievements-3.png" width="" alt="alt_text" title="clan achievements screen">

<br />
<br />
##### Send Event

You can send an event to the Clan. Expand the panel to show the code editor. To send an event:

- Add an event name in the field above the code editor (required)
- Enter the event content (JSON) you want to send
- Click Send

<img src="/images/ca/clan-achievements-4.png" width="" alt="alt_text" title="clan achievements screen">

<br />
<br />
##### Achievements Grid

Shows a list of all Player and Ruleset Achievements. Each Achievement shows detail on its progress and state.
Additionally you can expand each row (if the row has Player data) to show the full details. To do so click 
the arrow at the beginning of each row.

<img src="/images/ca/clan-achievements-5.png" width="" alt="alt_text" title="clan achievements screen">

<br />
<br />
###### Delete Specific Achievements

To delete a Clans's Achievements in progress you have to select rows by checking checkboxes near the each achievement name you want to delete.
A delete button (with selected achievements count) will be shown in the top right corner of the Achievements Grid.
After clicking the delete button you will be presented a modal asking “Are you sure you want to delete this clans's achievements?”.

<img src="/images/ca/clan-achievements-6.png" width="" alt="alt_text" title="clan achievements screen">

<img src="/images/ca/clan-achievements-7.png" width="" alt="alt_text" title="clan achievements screen">

On successful delete you will be shown the success notification message.

<img src="/images/ca/clan-achievements-8.png" width="" alt="alt_text" title="clan achievements screen">

<br />
<br />

#### Audit Tab

The Audit tab presents a list of Achievements Audit Logs.
On the initial view you will see each Achievements Event with all the associated metadata:

- UUID
- Event Type
- Timestamp
- Platform
- Account Type
- Client Transaction ID
- First Party User ID (linked to [Linked Accounts](#linked-accounts-lookup))
- First Party Account Type
- Client ID

<img src="/images/pa/player-achievements-5.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
##### Grid Filtering
It is possible to filter the Event through the search bar, and it also possible to reorganize the grid by any of the column meta types, by dragging the column header into the “Drag here to set row groups” e.g Event Type

<img src="/images/pa/player-achievements-12.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
##### Inventory Detail
To view the details of the event, you just need to click the arrow at the beginning of the row.
Opening the row you will see a read only code editor view.

<img src="/images/pa/player-achievements-11.png" width="" alt="alt_text" title="player achievements screen">

#### Achievements Engine Service

Details on the Demonware Achievements Engine service are available at the [documentation portal](https://info.demonware.net/achievements/latest/overview/overview.html).

<br />
<br />

## Audit Logs

<img src="/images/al/auditlogs1.png" width="" alt="alt_text" title="audit logs screen">

###### Left Panel

#### Search / Filter

In the left panel there are a number of filters which will enable you to refine logs. This includes

- Period From
- Period to
- UserID | Username
- Title ID
- Env
- User Type
- Entity ID
- Entity Name
- Category
- Context
- Source Name
- Extra - entered in format (key:value)

By default the last 100 auditable items are displayed, by entering any of the filters it will refine the audit logs displayed. Choose your filter options and click “show the results” at the bottom of the filters.

<br />
<br />
###### Right Panel

#### Audit Log Meta

The Audit log displays the meta in a configurable Data Grid. Columns can be filtered, reordered etc.

- Username
- Usertype
- Category
- Audit Context
- Context
- Audit Title ID
- Title ID
- Audit Env
- Env
- Entity ID
- Entity Name
- Source Name
- Extra
- Timestamp - e.g. {"endpoint":"/api/v2/company-groups/45/users/","body":"{\"users\":[{\"id\":\"91\"},{\"id\":\"228\"}]}"}

<img src="/images/al/auditlogs2.png" width="" alt="alt_text" title="audit logs screen">

<br />
<br />
<br />
<br />

### Debugging

## Server Logs

<img src="/images/sl/serverlogs1.png" width="" alt="alt_text" title="server logs screen">

Located in the Debugging section of Devzone and is used to investigate user issues using a number of data sources.

<br />
<br />
#### Pre-filter

- User ID
- Connection ID
- Transaction ID
- Message
- Date Range

<img src="/images/sl/serverlogs2.png" width="" alt="alt_text" title="server logs screen">

With a number of advanced filters

<br />
<br />
#### Log Levels

- Error
- Warning
- Debug
- Info

<img src="/images/sl/serverlogs3.png" width="" alt="alt_text" title="server logs screen">

#### Sources

- Auth3
- Marketplace
- MMP3
- Dwsproxy
- Loot-generation
- Webservice
- Achievements Engine
- Tournaments Engine
- LSG
- LoginQueue
- ABTesting
- ObjectStore
- CommsService
- Storage-script-service
- Uno
- Umbrella

Users are initially presented with the most recent logs for the Title Environment with no filters applied.

<img src="/images/sl/serverlogs4.png" width="" alt="alt_text" title="server logs screen">

<br />
<br />
**Filter Meta**

Enter any meta which has been obtained into the field (e.g. Transaction ID). The Data Grid will present the first 100 logs with that filter. Users can

- Add more Meta Filters
- Click the checkboxes in the Advanced Filters
- Search the Data Grid with the search bar that sits above it
- Drag the Column Headings into the Row Grouping bar sitting above (to reconfigure the grid)

Filters are used to narrow down the investigation to find the source of the issue

<br />
<br />
##### Audit Log Meta

The Audit log displays the meta in a configurable Data Grid. Columns can be filtered, reordered etc.

<img src="/images/sl/serverlogs5.png" width="" alt="alt_text" title="server logs screen">

<br />
<br />
**Adjacent Messages**

One of the key features of Service Logs which facilitates quicker investigation is the Adjacent Messages icon button which is located at the far right of the Grid.

It enables users to see the messages above and below a message which is of interest (and could provide context, by understanding what happened before and after the suspicious activity), without having to deselect all the filters each time.

The messages for the row you click the Expansion Panel will be in Green to make it easy to Identify, especially when scrolling through the other messages.

<img src="/images/sl/serverlogs6.png" width="" alt="alt_text" title="server logs screen">
<img src="/images/sl/serverlogs7.png" width="" alt="alt_text" title="server logs screen">

<br />
<br />
<br />
<br />

<!-- ## Remote Commands

You can use this page to execute commands and set dvars in RETAIL, using the DW messaging system.

To send a command, first select a user on the dropdown on the top left:
<img src="/images/rc/remotecommands1.png" width="" alt="alt_text" title="remote commands page">

Every sent command is added to the "Recent Commands" list on the bottom of the page.
<img src="/images/rc/remotecommands2.png" width="" alt="alt_text" title="recent commands list">

You can save you favorite commands with the "bookmark" icon next to each command, and it will be kept in the Favorites Command list forever or until you remove it.
<img src="/images/rc/remotecommands3.png" width="" alt="alt_text" title="favorite commands list">

<br />
<br />
<br />
<br /> -->

## Event Manager

### Overview

This tool provides a simple way of visualizing, managing & scheduling changes to services. Cutting down the manual and repetitive work needed to manage live-ops events.
Giving a company-wide insight and visibility into the timeline of events for a project, franchise or company. Complemented with event information from external calendars.
<br />
Supported services include:

- Publisher Variables
- Publisher Objects
- Achievements engine

and more

<br />
Supported event information includes:

- Maxcal calendar (holiday) days
- PMG COD Liveops calendar
- AB Tests
- Demonware Critical Events

<br />
This guide will help you better understand how you can use the [Timeline](#timeline) event visualization tool and how to use [Events & Activities](#event--activities) to schedule events and make changes to a number of services such as Publisher Variables, Publisher Objects, Achievements Engine, etc.
<br />
<br />
If you are interested in configuring your project on Event Manager, contact Devzone
(<a href="https://demonware.slack.com/archives/C01PNGF5C00">#dw-devzone</a>) for more information.

<br />
##### Navigating to Event Manager from Devzone

You can find Event Manager among the list of Devzone applications in the upper-right hand corner with the calendar icon.

<img src="/images/em/overview2.png" width="" alt="alt_text" title="nav bar">

<br />
<br />
##### General

Events [Timeline](#timeline) provides insight into events, collated into a single view. With the ability to move forward and backwards through the timeline and display events from multiple sources related to the project & franchise.
<br />
[Project Settings](#project-settings) is available for Event Manager admin users to set configuration options such as event settings or set user responsibilities. The [Templates](#templates) page allows you to create event templates for common configurations.
<br />
<br />

##### Timeline

Events are show on a linear time horizon. With a number of ways to tailor to your needs via filters, groups and distinct coloring of events.
Custom view configurations can be saved as presets on the project and shared among team-members.

<video width="" autoplay loop muted alt="alt_text" title="Timeline" poster="/images/em/timeline.png">
    <source src="/images/em/timeline.mov" type="video/mp4">
</video>

The Timeline view displays the events in a linear, chronological order.

<br />
<br />
##### Event Quick View

Hovering over provides a quick look into the event, showing key points relevant to this event.

<img src="/images/em/event-dialog.png" style="max-width:700px" width="" alt="alt_text" title="event summary dialog">

<br />
<br />
##### Colorize by Category

You can colorize events based on a category, helping key events stand out from the overall timeline. The radio buttons next to filter categories can enable, disable and change the colorization.

<video width="" autoplay loop muted alt="alt_text" title="Category Colorization" poster="/images/em/colorize.png">
    <source src="/images/em/colorize.mov" type="video/mp4">
</video>

<br />
<br />
##### Group by Category

Events can be grouped into different categories, providing better insight into the context in which the events are scheduled. The "Group Events By" dropdown on the top-left corner specified the category by which the timeline lanes are grouped.

<video width="" autoplay loop muted alt="alt_text" title="Category Colorization" poster="/images/em/grouping.png">
    <source src="/images/em/grouping.mov" type="video/mp4">
</video>

<br />
<br />
##### Share URL to a Customized Views

<img src="/images/em/share.png" style="max-height:240px" width="" alt="alt_text" title="Timeline share URL">

The <icon>insert_link</icon> on the top-right corner gives a shareable link. This link will include the view, date ranges, and any filters set.

<br />
<br />
##### Save Customized Views

Admins of the project on Event Manager can save a particular view configuration as a filter preset. Filter presets allow you to navigate quickly between different view configurations, customized to different needs.
Admins or other team members who often re-visit the timeline, can then quickly switch between views without having to recreate them.
<br />
<br />
To save your current view configurations, first set the settings you wish the preset to reflect. Click the Save Filters input located at the top of the left sidebar on the timeline and enter a name for that preset.

<img src="/images/em/presets.png" style="max-width:600px" width="" alt="alt_text" title="Calendar Presets">

<br />
<br />

### Event & Activities

##### Creating an event

To create an event, navigate to the Timeline page and click the <icon>add_circle</icon> button located on the bottom-right corner of the page.

This will display the _event creation_ dialog with the basic information required to create the event. After creating, activities can be attached on the event page.

<video width="" autoplay loop muted alt="alt_text">
    <source src="/images/em/create-event.mov" type="video/mp4">
</video>

If you would like to start from a [Template](#templates), select the appropriate template from the drop down. The template will then auto-populate the form based on its configuration.

<video width="" autoplay loop muted alt="alt_text">
    <source src="/images/em/create-event-template.mov" type="video/mp4">
</video>

If the event you are creating is purely informational (i.e. doesn’t have any activities), you can toggle the switch at the top of the form. Doing so will change the form to match the requirements needed for an informational event.

<img src="/images/em/informational.png" style="max-width:800px" width="" alt="alt_text">

<br />
<br />
##### Edit an Event

All the editable attributes of an event can be found on the event’s detail view. These fields will auto submit any changes and provide status updates.

<img src="/images/em/event-activities14.png" width="" alt="alt_text" title="event details">

<br />
<br />
##### Attaching Activities

<img src="/images/em/event-activities5.png" width="" alt="alt_text" title="create activities">

Clicking the “Create Activity” icon results in a popup to choose the activities run date and the type of activity you want to create.

<img src="/images/em/event-activities6.png" width="" alt="alt_text" title="create activities dialog">

After the activity has been created, additional configurations might need to be made on that activity to use properly. To learn more about how to change certain settings of

<br />
<br />
##### Achievements Engine Activity

This option is for activating a ruleset created on the Achievements service.

<br />
<br />
##### Publisher Objects Activity

This option is for uploading publisher objects to Object Store.

<br />
<br />
##### Publisher Storage Activity

This option is deprecated. Published Objects should be used instead.

<br />
<br />
##### Publisher Variables Activity

This option is for adding a variable in a title (e.g. changing the 2WXP from 1 to 2 double experience points over a weekend and then reverting back to 1 to end the promotion).

<br />
<br />
##### Python Script Activity

This option is a catch all for any complex use cases not covered in the above. These scripts are maintained in Github and available from the “Templates” drop down.

<br />
<br />
##### Thunderpants Deployment Activity

This option is for interacting with the Thunderpants tool for managing server builds.

<br />
<br />
##### Events Level Actions

At the top of the Details panel seen left of the Event page, you will see actions that are available to you for an event.

<br />
<br />
##### Request Approval

When your event is ready to publish, you may “Request Approval” of the event that you’ve created. If triggered, the event transitions into a pending state until an authorized user has approved the event.

<img src="/images/em/event-activities19.png" style="max-width:300px" width="" alt="alt_text" title="request approval">

Authorized users can either approve or deny the event. You can view who has reviewed your event under the “Workflow” section of the Detail panel.

<img src="/images/em/event-activities25.png" style="max-width:300px" width="" alt="alt_text" title="approve event">

<br />
<br />
##### Publish Now

“Publish Now” bypasses the review process and sends an event immediately to be published. Note that when selecting this action, it will automatically change the “Start Date” of the event to the current date and time.

<img src="/images/em/event-activities20.png" style="max-width:300px" width="" alt="alt_text" title="publish now">

<br />
<br />
##### End Now

If an event is active and you have admin permission you will see the fast-forward button to “end now”. This action will set the end date to right now and immediately run any end activities upon override confirmation.

<img src="/images/em/event-activities16.png" style="max-width:300px; margin-right:25px;" width="" alt="alt_text" title="end now">

<img src="/images/em/event-activities15.png" style="max-width:400px" width="" alt="alt_text" title="end now and override">

<br />
<br />
##### Save Template

By saving this event as a template, you can easily recreate an event by selecting it from the list of templates on the “Template” field on the event creation popup from the calendar page.

<img src="/images/em/event-activities31.png" style="max-width:300px" width="" alt="alt_text" title="save template">

<br />
<br />
##### Cancel

Canceling an event will begin stopping the event from continuing.

<img src="/images/em/event-activities24.png" style="max-width:300px" width="" alt="alt_text" title="cancel event">

<br />
<br />
##### Delete

An option to delete an event is also available to you.

<img src="/images/em/event-activities22.png" style="max-width:300px" width="" alt="alt_text" title="delete event">

<br />
<br />
##### Retry

If an event ever fails while being scheduled you will see the option to retry starting the event. Similarly if an event fails while being active, failing to run end activities, you will see an option to rety ending the event. A help dialog will then pop up allowing you to skip activities that already passed or halt publish/end if activities fail once again.

<img src="/images/em/event-activities18.png" style="max-width:300px; margin-right:25px;" width="" alt="alt_text" title="retry starting event">

<img src="/images/em/event-activities17.png" style="max-width:450px" width="" alt="alt_text" title="retry starting event dialog">

<br />
<br />
##### Duplicate/Promote

“Duplicate/Promote Event” allows you to easily create a copy of the same event in a different environment. When selected, a form popup will appear for you to select which environment you wish to duplicate the event onto (along with other options that you may find useful.)

<img src="/images/em/event-activities21.png" style="max-width:400px; margin-right:25px;" width="" alt="alt_text" title="duplicate event">

<img src="/images/em/event-activities32.png" style="max-width:400px" width="" alt="alt_text" title="duplicate event dialog">

<br />
<br />
##### Open for Edit

If you wish to open a locked event to make changes, select the “Open for Edit” action.

<img src="/images/em/event-activities23.png" style="max-width:350px" width="" alt="alt_text" title="open event for edit">

<br />
<br />
##### Navigating Conflicts

After adding a few activities, you may see a notification next to the “Conflicts” tab, indicating that there are conflicts with these activities. These conflicts can be one of the following:
**Event Overlap** – _Green_ – Events affecting the same project are scheduled at the same time.
**Activity Overlap** – _Yellow_ – Events of the same type and affecting the same project are scheduled at the same time.
**Activity Title Overlap** – _Orange_ - Events affecting the same title are scheduled at the same time.
**Activity Conflict** – _Red_ - Events of the same type and affecting the same project are scheduled at the same time.
The severity of these conflicts escalates according to the color scale. Activity Conflicts (indicated by red) should typically not occur. If requesting approval for an event with an Activity Conflict, the system will ask you to acknowledge this conflict and confirm that you want to proceed.

<img src="/images/em/event-activities28.png" style="max-width:400px" width="" alt="alt_text" title="event conflicts">

<br />
<br />
##### Event History

A record of all actions involved in the creation of an event is available for review in the History tab. Additional details on the specific event can be seen by double clicking on the timeline items.

<img src="/images/em/event-activities27.png" style="max-width:500px" width="" alt="alt_text" title="event history">

<br />
<br />
##### Event Discussion

Any information that is generally relevant to keep associated with the event can be added to the Discussion section.

<img src="/images/em/event-activities26.png" style="max-height:65vh" width="" alt="alt_text" title="event discussion">

<br />
<br />
<br />
<br />

### Templates

<img src="/images/em/templates8.png" width="" alt="alt_text" title="templates view">

Templates provide an easy way to recreate frequently used events. Navigate to the “Templates” page to manage and create your templates.

<br />
<br />
##### Using Templates

When creating an event, you can use templates to prefill the form based on the chosen template’s configurations.

<img src="/images/em/templates1.png" style="max-height:65vh" width="" alt="alt_text" title="create event with template">

<br />
<br />
##### Creating a Template

There are 2 ways to create a template: either through the Templates page or with the “Save Template” event action.

On the “Templates” page, the create template button is located on the upper right hand corner of the list bar list.

<img src="/images/em/templates2.png" style="max-width:500px" width="" alt="alt_text" title="create template">

To create a template using the “Save Template” event action, you’ll need to be viewing an event with that action available. Like the other event actions, “Save Template” is located on the top right corner of the Detail panel.

<img src="/images/em/templates4.png" style="max-width:500px" width="" alt="alt_text" title="save template">

These 2 ways are located in different areas of Event Manager, but they prompt the same template creation form.

<img src="/images/em/templates3.png" style="max-width:500px" width="" alt="alt_text" title="create template">

The form asks for baseline inputs for the name and description of the template and 3 toggleable “rules” that you can apply to your template.

Timewarp Schedule Event or Not a Timewarp Schedule Event:

If toggled on (i.e. Timewarp Schedule Event), the template created will be restricted to timewarp schedule stories with only client commands. Toggling this switch on requires that the template created to be both Restricted and have a Duration.

If toggled off (i.e. Not a Timewarp Schedule Event), the template created will be available to use when creating events.

<img src="/images/em/templates5.png" style="max-width:500px" width="" alt="alt_text" title="create timewarp template">

Restricted or Allowed:

If toggled on (i.e. Restricted), events created from this template will not be able to add new or delete activities that were defined in the template.

If toggled off (i.e. Allowed), events created from this template are allowed to add new or delete activities that were defined in the template.

<img src="/images/em/templates6.png" style="max-width:500px" width="" alt="alt_text" title="create restricted template">

Duration or No Durations:

If toggled on (i.e. Duration), events created from this template will have start and end dates based on the duration set in this template.

If toggled off (i.e. No Duration), start and end dates are unaffected.

<img src="/images/em/templates7.png" style="max-width:500px" width="" alt="alt_text" title="create duration template">

<br />
<br />
<br />
<br />

### Event Notifications

<br />
<br />
##### Setting up Email and Slack Notifications to Trigger on Specific Changes on Events

To add notifications to a project, navigate to Settings/Notifications and type in the appropriate email or Slack channel (recommended). All active notifications will be sent to the destination specified. Please note that the Slack channel selected must be on the Devzone Workspace. To turn off a notification type, toggle “enabled” to off. Here you can add a special greeting message or enable verbose notifications for more detailed messages as well.

<img src="/images/em/notifications1.png" style="max-width:500px; margin-right:25px;" width="" alt="alt_text" title="notifications view">

<img src="/images/em/notifications2.png" style="max-height:60vh" width="" alt="alt_text" title="notifications slack list">

For notifications that require additional details, “verbose” can be enabled. Any additional notes or tags (e.g. “@here”) can be added via the greeting option.

<img src="/images/em/notifications3.png" style="max-width:500px" width="" alt="alt_text" title="notifications toggles">

<br />
<br />
<br />
<br />

### Project Settings

<br />
<br />
##### Responsibilities

<img src="/images/em/project-settings8.png" style="max-width:500px" width="" alt="alt_text" title="project settings view">

Responsibility groups can be defined in the Project Settings tab. These groups assign authorization responsibilities to the specified accounts. Simply add a name for the group and search for users to add. For existing groups, users may alternatively be added via the “Users” tab. After adding all users, add a description (optional) and click Submit to save the group.
<br />
After creating the group, you will be able to define the appropriate activity types for development, certification, and live titles available for approval for the user group. These permissions are managed outside of Event Manager by the Devzone team.

<br />
<br />
##### Creating, Deleting, and Editing Groups

To create a responsibility group, select the “Create Group” button on the top right corner of the responsibility group list sidebar. A popup to create a group will show.

<img src="/images/em/project-settings9.png" style="max-width:600px" width="" alt="alt_text" title="create responsibility group">

Enter a name for the responsibility group, the members of the group, and a description.

<img src="/images/em/project-settings10.png" style="max-width:500px" width="" alt="alt_text" title="responsibility modal">

Select your newly created group to add responsibilities for the group users. Responsibilities can be set per environment.

<img src="/images/em/project-settings11.png" style="max-width:500px; margin-right:25px;" width="" alt="alt_text" title="responsibility users">

<img src="/images/em/project-settings12.png" style="max-width:500px" width="" alt="alt_text" title="responsibility selection">

To add responsibilities to individual users, use the Users page to modify a user’s responsibilities.

<img src="/images/em/project-settings13.png" style="max-width:500px" width="" alt="alt_text" title="responsibility group view">

<br />
<br />

#### Settings

<br />
<br />
##### Global

Global settings include any administrative setting that may affect various aspects of the application. You may notice default settings here for those not defined by admins for this project.

<img src="/images/em/project-settings18.png" width="" alt="alt_text" title="global settings view">

<br />
<br />
##### Events

Events have event level actions that are available to users depending on these configurations. Configure these here by expanding the status and changing the settings under them.

<img src="/images/em/project-settings15.png" width="" alt="alt_text" title="event settings view">

<br />
<br />
##### Activities

The “Activities” section found in Project Settings lets you configure a number of different settings specific to an event activity. Here’s a list of settings you can configure:
<br />

**Allow duplication**: Toggle availability for activity duplication

**Allow multi titles**: Whether activities can have more than one title

**Allow revert**: Toggle availability for revert on end action for activities

**Disable title selector**: Toggle availability of title selector

**Enabled**: Toggle activity availability for users

**Name**: Change the name of the activity type

<img src="/images/em/project-settings16.png" width="" alt="alt_text" title="activity settings view">

<br />
<br />
##### Name Mapping

<img src="/images/em/project-settings17.png" style="max-width:600px" width="" alt="alt_text" title="name mapping settings view">

Name Mapping allows you to upload a list of obfuscated values and their corresponding variable names to be displayed in Publisher Variable event activities. Simply click the upload button and upload a csv file following the format #obfuscated, #human_readable. You’ll have the option to update human readable values in the UI, but will need to retain a csv file to upload and override configurations of obfuscated keys or add new ones.

<img src="/images/em/project-settings7.png" style="max-width:500px; margin-right:25px;" width="" alt="alt_text" title="name mapping update">

<img src="/images/em/project-settings6.png" style="max-width:500px" width="" alt="alt_text" title="name mapping variables">

<br />
<br />
##### Colors

To configure color settings for a project’s icons, navigate to the “Colors” project settings tab to select the color to use for your project.

<img src="/images/em/project-settings14.png" width="" alt="alt_text" title="color settings view">

<br />
<br />

### Timewarp

Timewarp allows the studios to define their events once and execute it as many times as they would like.

Unlike the previous method of testing and validating events where production had to schedule events multiple times and on multiple title-environments for testing and finally duplicate it on the appropriate prod environment, using Timewarp the events are scheduled once and instead the users warp their time to test those events in as many scenarios as they would like.

Timewarp feature is actively being worked on. For more information please contact
<a href="https://demonware.slack.com/archives/C01PNGF5C00">#dw-devzone</a>.

<br />
<br />
<br />
<br />

## Leaderboards

Leaderboards for a Title Environment are displayed here. Devzone users can view the Entities within each, the Ratings on which the players are ranked and the update time of the entity.

<img src="/images/lb/leaderboardsimage1.png" width="" alt="alt_text" title="leaderboards screen">

Leaderboards is split into a left and right panel.

<br />
<br />
###### Left Panel

The left panel contains

- Number of Leaderboards listed
- Leaderboard Name | Leaderboard ID Search
- Leaderboard List (wt selectable checkboxes)
- Reset Leaderboard action icons
- Show more button to load more accounts

<br />
<br />
#### Search

To find the Leaderboard you are looking for,

- Scroll down through the list
- Enter a valid Leaderboard Name or ID (does not include partial search)

<br />
<br />
#### Reset

Each Leaderboard in the list can be reset by checking the box to the left and clicking the reset icon.

<img src="/images/lb/leaderboardsimage2.png" width="" alt="alt_text" title="leaderboards screen">

After clicking the reset icon a modal will appear asking you to confirm.

<img src="/images/lb/leaderboardsimage3.png" width="" alt="alt_text" title="leaderboards screen">

When the reset has been confirmed, you will be presented with a confirmation from the bottom of the screen.

<img src="/images/lb/leaderboardsimage4.png" width="" alt="alt_text" title="leaderboards screen">

Also the status on in the Leaderboard list changes from “Reset Status N/A” to “Reset Status Pending”

<img src="/images/lb/leaderboardsimage5.png" width="" alt="alt_text" title="leaderboards screen">

When the reset status has been confirmed, you will receive a confirmation email.

<img src="/images/lb/leaderboardsimage6.png" width="" alt="alt_text" title="leaderboards screen">

<br />
<br />
#### List Items

The list card show a number of details of the leaderboard including

- if it is Ranked
- number of rows in table

<img src="/images/lb/leaderboardsimage7.png" width="" alt="alt_text" title="leaderboards screen">

<br />
<br />
###### RightPanel

The right panel contains

- Entity Name
- Reset Icon
- Delete Icon
- Entity Search
- Entity Data Grid

<br />
<br />
#### Entity

The details panel shows the a list of Entities by

- ID
- Rating
- Name
- Update time

<br />
<br />
#### Search

Entities can be searched by entering into the search bar and hitting Enter

<img src="/images/lb/leaderboardsimage8.png" width="" alt="alt_text" title="leaderboards screen">

<br />
<br />
#### Reset and Delete

Leaderboard can also be reset by clicking the Icon in the details panel.

Entities can be deleted by selectinging one, multiple or all using the checkboxes on the left side of the table and clicking the Trash Icon next to the reset Icon.

<img src="/images/lb/leaderboardsimage9.png" width="" alt="alt_text" title="leaderboards screen">

You will be asked to confirm if they want to delete the Entity or Entities

<br />
<br />
<br />
<br />

#### Marketplace

## Active Store

Located in the Marketplace Section, Active Store shows a number of groups for the current store:

- Currencies
- Items
- Entitlements
- Products
- SKUs
- Pawnable Items
- Conversion Rules
- Exchange

<img src="/images/as/activestore1.png" width="" alt="alt_text" title="active store screen">

Within each tab there is a data grid with all the relevant meta, all of which are searchable.

<img src="/images/as/activestore2.png" width="" alt="alt_text" title="active store screen">

<img src="/images/as/activestore3.png" width="" alt="alt_text" title="active store screen">

<br />
<br />
#### Store Details

Above the tabs are the name of the Active Store and the date on which it was created.

The name of the store will click through to the Store list with the Active Store Selected

<br />
<br />

## Stores

Located within Marketplace, Stores will show a list of the available stores for the selected Title Environment.

<img src="/images/st/stores1.png" width="" alt="alt_text" title="store screen">

<br />
<br />
###### Left Panel

The Left panel contains:

- Number of Stores listed
- Upload Store Icon
- Store Search (no Partial Search)
- Store List
     - Store Name
     - Store Status
     - Store Timestamp

<br />
<br />
#### Stores List

All stores are listed in the left panel. The status of the store is noted on the right side of the card. Active store denotes the store shown in the Active Store nav item.

<img src="/images/st/stores2.png" width="" alt="alt_text" title="store screen">

<br />
<br />
##### Search

Simply enter the Store label into the search bar above the list and hit enter.

<img src="/images/st/stores9.png" width="" alt="alt_text" title="store screen">

<br />
<br />
##### Upload Store

To upload a store, click to upload icon in the top right of the Stores List and you will be presented with a modal.

All fields are required, and you will be presented with the standard error messaging if any fields are left blank.

<img src="/images/st/stores3.png" width="" alt="alt_text" title="store screen">
<img src="/images/st/stores4.png" width="" alt="alt_text" title="store screen">

<br />
<br />
#### Right Panel

The Right panel contains:

- Activate Icon (available on non-active stores)
- Propagate Icon
- Download Icon
- Clear Cache Icon
- Code Block

<br />
<br />
#### View Store

To view the store code block, click on a store on the left.

<img src="/images/st/stores5.png" width="" alt="alt_text" title="store screen">

In the Details area on the right in the top bar there are also a number of action icons:

- Activate (not available for the Active Store)
- Propagate
- Download
- Clear Cache

<br />
<br />
##### Activate

Clicking Activate (on a non active store) will present a confirmation modal to confirm whether you want to activate the selected store (which will deactivate the currently active store).

<img src="/images/st/stores6.png" width="" alt="alt_text" title="store screen">

<br />
<br />
##### Propagate

If you want to propagate a store to another Title Environment, click the propagate icon and you will be presented with a modal.

<img src="/images/st/stores7.png" width="" alt="alt_text" title="store screen">

The label will be pre populated but you will be required to select the Title Environment you wish to propagate to.

<img src="/images/st/stores8.png" width="" alt="alt_text" title="store screen">

<br />
<br />
##### Download

To download a store simply click the download icon and the store will automatically download.

<br />
<br />
##### Clear Cache

If the store details do not reflect the current state of the store, it could be that the store cache hasn't been updated on Devzone's server.  You can click the "Clear Cache" button to clear the cache for the store, and the store details will be refetched. After doing this, the store details should be up-to-date.

<img src="/images/st/stores10.png" width="" alt="alt_text" title="store screen">

<br />
<br />

## Player Inventory

Player Inventory in Devzone enables you to view, inspect and modify a Player's Inventory.

The initial view shows a field to select a Player to view, split into 3 tabs:

- **Inventory** -Enables you view and manage a Player's Inventory in parallel to the active store
- **Audit** -Presents you with a view of all actions related to the Player's Inventory
- **Manage** (Coming Soon) -Will enable you to manage a user e.g. cloning and resetting

<img src="/images/pi/player-inventory-1.png" width="" alt="alt_text" title="player inventory initial screen">

<br />
<br />

#### View Player's Inventory

To view a Player Inventory enter / select a player from the dropdown. This will display a split view of the player's inventory (on the left), and the store for this title/context (on the right), like this:

<img src="/images/pi/player-inventory-25.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />

Above the grids you will see

- **Search field** -filters both the Player's and Store's Inventory
- **Refresh button** -Refreshes the Player's Inventory
- **Items Tab** -all items in the Active Store
- **Products Tab** -all products and their items
- **Currency Tab** -available currencies, Player value for each and the ability to modify.

<img src="/images/pi/player-inventory-7.png" width="" alt="alt_text" title="player inventory screen">

Below this layer the Player's ID is displayed, to the Players Account view.
And the Store ID links to the Active Store.

<img src="/images/pi/player-inventory-9.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />

#### Items View

Enter a Player's ID or gamertag and view the current inventory for a Player and the full Active Store.

**Note:** If the player has items granted from a source other than the Active Store they will still be shown. E.g. from a previous labelled Store or a different title.

<img src="/images/pi/player-inventory-2.png" width="" alt="alt_text" title="player inventory screen">

Items are grouped by type, these groups can be expanded to show all the items in the groups. Click on the [Active Store](#active-store) link to view full store details.

<img src="/images/pi/player-inventory-4.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
##### Add Items

To add, select an item or group of items from the Active Store. Click the “add” icon located above the grid to the top right to grant the item to the player.

<img src="/images/pi/player-inventory-10-marked.png" width="" alt="alt_text" title="player inventory screen">
<br />
<img src="/images/pi/player-inventory-18.png" width="" alt="alt_text" title="player inventory screen">

After you click add, the items will then appear in the Players inventory.

<img src="/images/pi/player-inventory-11.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
##### Delete Items

To delete items, select the item, items or group of items in the Players Inventory.

And click the delete icon above the data grid. You can also select the quantity.

<img src="/images/pi/player-inventory-12.png" width="" alt="alt_text" title="player inventory screen">
<br />
<img src="/images/pi/player-inventory-19.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
#### Products

The products tab shows products and their associated items and currencies. Products can be added to a Player's Inventory in the same way as items.
Check the box for the product you want to add and click the add icon.

**Note:** Individual items within the products cannot be selected.

<img src="/images/pi/player-inventory-13.png" width="" alt="alt_text" title="player inventory screen">

<img src="/images/pi/player-inventory-8.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
#### Currency

The currency tab shows the list of available currencies. In the Players inventory you can view, edit and increment/decrement each currency.

It is possible to modify a player's currency, within the Players Grid. There are 2 options to modify the currency.

- Add or remove a specific value
- Directly modify the value inline

<br />
<br />
##### Add / Remove

Click the plus / minus icon. You will be presented with a modal where you can enter a value to increase or decrease the currency value by.

<img src="/images/pi/player-inventory-16.png" width="" alt="alt_text" title="player inventory screen">

<img src="/images/pi/player-inventory-15.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
##### Directly Modify

Click in the cell containing the amount you want to modify. You can then change the value directly and click the save button or the cancel button.

<img src="/images/pi/player-inventory-14.png" width="" alt="alt_text" title="player inventory screen">

<img src="/images/pi/player-inventory-5.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
##### Clone Player Inventory

Clone Player Inventory enables you to copy the inventory state of one player to another, across environments and titles. Additionally a temporary backup is taken of the target players current state before changes are applied and can be restored at any time.

To clone, click the "Clone player's inventory" button in the top right of the page.

<img src="/images/pi/player-inventory-20.png" width="" alt="alt_text" title="player inventory screen">

In the modal pop up, select either the same or a different environment context and a player ID or gamertag as the target to clone into.

<img src="/images/pi/player-inventory-21.png" width="" alt="alt_text" title="player inventory screen">

A notification message will appear once a player inventory have been successfully cloned.

<img src="/images/pi/player-inventory-22.png" width="" alt="alt_text" title="player achievements screen">

##### Required Permissions

User must have the "Marketplace" > "Clone player inventory" permission enabled to clone a player inventory.

##### Backups & Restoring

The player achievements backup can be restored by clicking the "Restore this Player's Inventory" button in the top right.

<img src="/images/pi/player-inventory-23.png" width="" alt="alt_text" title="player achievements screen">

A dialog will appear where the user can confirm the restore.

<img src="/images/pi/player-inventory-24.png" width="" alt="alt_text" title="player achievements screen">

<br />
<br />
#### Audit Tab

The Audit tab presents a list of Marketplace Audit Logs.

On the initial view you will see each Marketplace Event with all the associated metadata:

- UUID
- Event Type
- Timestamp
- Platform
- Account Type
- Client Transaction ID
- First Party User ID (linked to [Linked Accounts](#linked-accounts))
- First Party Account Type
- Client ID

<br />
<br />
##### Grid Filtering

You can filter Events through the search bar.
And reorganize columns by dragging the column header into the “Drag here to set row groups” e.g Event Type.

<img src="/images/pi/player-inventory-6.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
##### Event details

To view the raw event details to click the arrow at the beginning of each row.
You will see a read-only code editor view, complete with search and syntax highlighting.

<img src="/images/pi/player-inventory-17.png" width="" alt="alt_text" title="player inventory screen">

<br />
<br />
## Clan Inventory

Clan Inventory in Devzone enables you to view, inspect and modify a Clan's Inventory.

The initial view shows a field to select a Clan to view, with 1 tab:

- **Inventory** -Enables you view and manage a Clan's Inventory in parallel to the active store

<img src="/images/ci/clan-inventory-1.png" width="" alt="alt_text" title="clan inventory initial screen">

<br />
<br />

#### View Clan's Inventory

To view a Clan Inventory enter / select a clan from the dropdown. This will display a split view of the clan's inventory (on the left), and the store for this title/context (on the right), like this:

Above the grids you will see:

- **Search field** -filters both the Clan's and Store's Inventory
- **Refresh button** -Refreshes the Clan's Inventory
- **Items Tab** -all items in the Active Store
- **Products Tab** -all products and their items
- **Currency Tab** -available currencies, Player value for each and the ability to modify.

Below this layer the Clan's ID is displayed, and the Store ID links to the Active Store.

<img src="/images/ci/clan-inventory-2.png" width="" alt="alt_text" title="clan inventory screen">

<br />
<br />

#### Items View

Enter a Clan ID or gamertag and view the current inventory for a Clan and the full Active Store.

Items are grouped by type, these groups can be expanded to show all the items in the groups. Click on the [Active Store](#active-store) link to view full store details.

<img src="/images/ci/clan-inventory-3.png" width="" alt="alt_text" title="clan inventory screen">

<br />
<br />
##### Add Items

To add, select an item or group of items from the Active Store. Click the “add” icon located above the grid to the top right to grant the item.

<img src="/images/ci/clan-inventory-4.png" width="" alt="alt_text" title="clan inventory screen">

After you click add, the items will then appear in the Clan inventory.

<img src="/images/ci/clan-inventory-5.png" width="" alt="alt_text" title="clan inventory screen">

<br />
<br />
##### Delete Items

To delete items, select the item, items or group of items in the Clan Inventory.

And click the delete icon above the data grid. You can also select the quantity.

<img src="/images/ci/clan-inventory-6.png" width="" alt="alt_text" title="clan inventory screen">
<br />
<img src="/images/ci/clan-inventory-7.png" width="" alt="alt_text" title="clan inventory screen">

<br />
<br />
#### Products

The products tab shows products and their associated items and currencies. Products can be added to a Clan's Inventory in the same way as items.
Check the box for the product you want to add and click the add icon.

**Note:** Individual items within the products cannot be selected.

<img src="/images/ci/clan-inventory-8.png" width="" alt="alt_text" title="clan inventory screen">

<img src="/images/ci/clan-inventory-9.png" width="" alt="alt_text" title="clan inventory screen">

<br />
<br />
#### Currency

The currency tab shows the list of available currencies. In the Clan inventory you can view, edit and increment/decrement each currency.

It is possible to modify a clan's currency, within the Clan Grid. There are 2 options to modify the currency.

- Add or remove a specific value
- Directly modify the value inline

<br />
<br />
##### Add / Remove

Click the plus / minus icon. You will be presented with a modal where you can enter a value to increase or decrease the currency value by.

<img src="/images/ci/clan-inventory-10.png" width="" alt="alt_text" title="clan inventory screen">

<img src="/images/ci/clan-inventory-11.png" width="" alt="alt_text" title="clan inventory screen">

<br />
<br />

## Bulk Inventory Update

This tool enables changing up to 100 players' inventories at once to add or remove store objects (such as Items, Products, and Currencies).

Bulk inventory is split into two sections. Managing the player and context selection, as well as monitoring tasks, is on the left. A store view selecting which store objects to add/remove is on the right.

_Note: Updates are processed separately for each player, and are not atomic actions. If one player's update fails, the others will still be attempted. There is no rollback._

<img src="/images/bu/bulkupdate1.png" width="" alt="alt_text" title="bulk inventory update screen">

### Management Section

The left section has two tabs:

- **Player Selection**: Select Marketplace context (platform), and players to change
- **Bulk Update Progress**: Monitor the rollout of your changes

#### Player Selection Tab

Here you select the 1-100 players to perform an inventory update on. The fields are:

1. **Marketplace context** (required)
1. **UNO ID player entry**
1. **Player search/multi-select**

_Note: Either the UNO ID player entry OR the player search/multi-select is required. You can use both player selection methods at once, if needed._

<img src="/images/bu/bulkupdate2.png" width="" alt="alt_text" title="player selection tab">

The first field is to select the Marketplace context, or console platform, which the changes will affect. This field is required.

Contexts will have names like `9999_ps4` to indicate PS4 platform, `9999_xbsx` to indicate Xbox Series X platform, and so on. Platform-branded icons are shown next to each context.

<img src="/images/bu/bulkupdate3.png" width="" alt="alt_text" title="context selection field">

The second field is to enter UNO IDs of the players you want to change. Either this field or the multi-select field is required. The IDs should be entered newline-separated, for example:

```
111111111111111
111919191919191
220202022222222
```

<img src="/images/bu/bulkupdate4.png" width="" alt="alt_text" title="UNO ID entry field">

The third field is an alternative method of player selection. Either this field or the UNO IDs field is required.

Using the Devzone player search, you can type in the field to search for a player. It uses the same player search found in other parts of Devzone Studio. Once selected, the player is shown in a small bubble in the field, and you can type again to select another player.

<img src="/images/bu/bulkupdate5.png" width="" alt="alt_text" title="player search entry field">

<br />

<img src="/images/bu/bulkupdate6.png" width="" alt="alt_text" title="player search entry field (2)">

The two action buttons take into account selections you have made in the store view.

- The add button (three horizontal lines and a + sign) will _add_ the items selected on the store view to the inventory of each player selected.
- The delete button (three horizontal lines and a trash can icon) will _remove_ the items selected from the inventory of each player.

Action buttons are only enabled when there are items selected on the store view.

_Note: You cannot remove Products from a player's inventory, so the delete button is not visible when using the Products tab on the store view._

_Note: Only objects selected in the active store tab when you click the action button, will be changed in the players' inventories._

<img src="/images/bu/bulkupdate7.png" width="" alt="alt_text" title="action buttons inactive">

<br />

<img src="/images/bu/bulkupdate12.png" width="" alt="alt_text" title="store view">

<br />

<img src="/images/bu/bulkupdate8.png" width="" alt="alt_text" title="action buttons active">

#### Bulk Update Progress Tab

This tab tracks the progress of update tasks.

When you click 'Add' or 'Delete' you are automatically taken to the Bulk Update Progress tab to monitor progress.

Each set of changes is listed here, with a unique ID. The number in parentheses indicates how many players were affected.

Each player is updated separately, and the results of each update are displayed here as tasks finish.

<img src="/images/bu/bulkupdate9.png" width="" alt="alt_text" title="bulk update tasks">

You can expand each task with the `>` button on the left edge of the row to see all the players involved, listed by UNO ID and username.

Each row shows whether the player's task is pending, succeeded, or failed. In the same way, you can expand each player's row to see more details about the task. Updates happen automatically.

<img src="/images/bu/bulkupdate10.png" width="" alt="alt_text" title="expanded bulk update task">

<br />

<img src="/images/bu/bulkupdate11.png" width="" alt="alt_text" title="expanded player section of bulk update task">

You can return to this page as needed to check on longer-running tasks. You do not need to remain on the page for tasks to be completed.

### Store Object Selection

On the right is a store view, as found in Player Inventory. You can search for Items, Products, or Currencies in the store using the tabs. Using the checkboxes, you can decide which objects will be affected in the players' inventories.

_Note: You can only affect store objects of one kind at a time. So you can add/remove items, products, or currencies from a group of players, but not a combination of these._

<br />
<br />
<br />
<br />

#### ObjectStore

## Publisher Objects

Publisher Objects enable you to view, sort, search, upload, download, delete and propagate objects. For titles with Object Groups there is also the ability to assign objects to a group of internal users and release that object if desired to a global status.

<img src="/images/po/publisherobjects1.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
###### Panel

Publisher Objects shows all objects for a Title Environment in a Data Grid. The panel contains

- Number of Publisher Objects listed
- Object Name Search
- Add Category
- Propagate Object
- Upload Object
- Delete Object
- List of Objects (with meta)
- Download Objects
- Object Groups (associated with an object manifest)

<br />
<br />
#### Search

You can search across all meta in the data grid using the Search field.

<br />
<br />
#### Add Category

To add a new category click the + icon next to the Search bar

<img src="/images/po/publisherobjects2.png" width="" alt="alt_text" title="publisher objects screen">

Enter the Category you want to create and click Add.

<img src="/images/po/publisherobjects3.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
#### Upload Object

You can upload objects direct from the UI by clicking the upload icon on the right side of the Service Bar.

<img src="/images/po/publisherobjects4.png" width="" alt="alt_text" title="publisher objects screen">

You will be presented with a modal, all fields except “Expires On” are required

<img src="/images/po/publisherobjects5.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
#### Upload Progress

When an upload has been initiated, you will be presented with a progress bar at the bottom right of the page.

You can use the “x” icon to cancel the upload.

<img src="/images/po/publisherobjects6.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
##### Upload Limit

It is possible to upload files of up to 1GB

<br />
<br />
##### Multiple uploads

It is possible to run multiple uploads simultaneously. They must be added one at a time but new uploads can be added while one is already in progress.

<img src="/images/po/publisherobjects7.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
#### Failed to upload file

If a Publisher Object already exists with the same name you will be asked to

- Consider changing the name
- Or check the box to confirm you wish to overwrite the existing object

<img src="/images/po/publisherobjects8.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
#### Propagate

It is possible to propagate Object from one Environment to another. Select the Object in the list by clicking the checkbox and click on the propagate icon above the grid on the right in the Service Bar.

You will be made aware that if there is an Object with the same name in the environment you are propagating to, it will be overwritten.

<img src="/images/po/publisherobjects9.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
#### Delete

To delete an object select the Object in the list by clicking the checkbox and click on the trash icon above the grid on the right.

You will be asked to confirm if you want to delete the Object

<img src="/images/po/publisherobjects10.png" width="" alt="alt_text" title="publisher objects screen">

<br />
<br />
#### Meta Grid

The Grid shows a list of objects with the relevant Meta

- Object Name
- Groups
- Checksum
- Category
- Content Length
- ACL
- extraData
- Created Timestamp
- Modified Timestamp
- Expires On
- Download
- Release

<br />
<br />
#### Groups

Object Groups linked to an Object are displayed as row groups in the Data Grid

<img src="/images/po/publisherobjects11.png" width="" alt="alt_text" title="publisher objects screen">

The name of the group is clickable and will take you to the Group details.

Each Object groups has an action icon fixed to the right or the row to release the object

<img src="/images/po/publisherobjects12.png" width="" alt="alt_text" title="publisher objects screen">

This must be confirmed as it will replace the Global Object.

<br />
<br />
#### Download

Each of the objects are downloadable. Just click the download icon on the right fixed column and the Object will be downloaded.

<br />
<br />
<br />
<br />

## User Objects

User Objects displays all objects for a user including backups and the ability to download, upload or delete objects associated with a user.

<img src="/images/uo/userobjects1.png" width="" alt="alt_text" title="user objects screen">

<br />
<br />
###### Panel

User Objects show all objects for a User in a Data Grid. The panel contains

- Number of User Objects listed
- User ID | Username Search (incl Partial Search)
- Upload Object
- Delete Object
- List of Object (with meta)
- Delete Object
- Download Objects
- Object Backups
- Object's content (as JSON)

<br />
<br />
#### List User Objects

To view objects for a user you will need a User ID or Username. The search field enables real time partial searching, just begin to type and you will see selectable users available.

<img src="/images/uo/userobjects2.png" width="" alt="alt_text" title="user objects screen">

<br />
<br />
#### Meta Grid

The Grid shows a list of objects with the relevant Meta

- Name
- Created Date
- Modified Date
- Expires On
- Checksum
- Category
- Content Length
- ACL
- extraData

It also has an Actions column with an icon to download each object and an Icon that indicates that an Object has a backup and a badge that indicates the number of backups.

<img src="/images/uo/userobjects3.png" width="" alt="alt_text" title="user objects screen">

<br />
<br />
##### Backups

When an object has a backup you click on the backup Icon or the expansion arrow on the left of the table to open up the Master Detail view. This displays the backups in a sub-table.

<img src="/images/uo/userobjects4.png" width="" alt="alt_text" title="user objects screen">

Backup show a subset of the meta

- Modified timestamp
- Checksum
- Content Length
- extraData

It also shows 2 action icons to

- Download the object
- Restore the Object Backup

<br />
<br />
**Not Configured**

If an object is not configured for bankups the Backup Icon will be greyed out and on hover a tooltip will be shown

<img src="/images/uo/userobjects5.png" width="" alt="alt_text" title="user objects screen">

<br />
<br />
##### Object's Content (as JSON)

For some titles it is possible to view object's content as JSON.
If available there would be an eye Icon next to the backup Icon.

<img src="/images/uo/userobjects5.1.png" width="" alt="alt_text" title="view object's content icon">

When clicked it will open a new modal dialog with the object's content.

There is a download button next to the dialog title which allows downloading object's content as a JSON file.

It allows filtering items by key and value using regular expressions.

<img src="/images/uo/userobjects5.2.png" width="" alt="alt_text" title="filter content by key">

There is a switch at the right which allows hiding empty values (0, empty string etc.)

<img src="/images/uo/userobjects5.3.png" width="" alt="alt_text" title="hide empty values">

There is `View diff with` dropdown which allows to view diff against object's backup (if object has some).
The diff viewer has a buttons which allow to jump between changes.

<img src="/images/uo/userobjects5.4.png" width="" alt="alt_text" title="backup diff: changes only">

By default we display only changes. The whole diff could be shown if `Hide un-changed lines` is `off`.

<img src="/images/uo/userobjects5.5.png" width="" alt="alt_text" title="backup diff: whole diff">

<br />
<br />
#### Upload

It is possible to to upload a new Object to a users Object list. Click the upload icon next to the search bar on the right hand side. You will be presented with with a Modal

<img src="/images/uo/userobjects6.png" width="" alt="alt_text" title="user objects screen">

1. Search and select a user
2. Add the file you wish to upload
3. Add a filename
4. Select an ACL
5. If you would like to select an expiry date you can do using the Date Time Calendar.

<br />
<br />
**Errors**

If you required fields are not populated, standard error messaging with be displayed

<img src="/images/uo/userobjects7.png" width="" alt="alt_text" title="user objects screen">

<br />
<br />
<br />
<br />

## Object Stats

Object Stats displays the user objects sorted by category and the statistic value of the object.

Once the page is loaded the screen has two dropdowns one for category and the other for the type of statistic.

<img src="/images/stat/image01.png" width="" alt="alt_text" title="object stats screen">

Once the preferred statistic and category is selected the page will show a data grid with the respective user objects sorted in descending order of the statistic value.

<img src="/images/stat/image02.png" width="" alt="alt_text" title="object stat screen 2">

The panels shown for the data grid are as follows:

- Player ID
- Statistic Value
- Name
- Checksum
- Created
- Modified
- Content Length
- Extra Data
- Extra Data Size
- Actions

<img src="/images/stat/image03.png" width="" alt="alt_text" title="object stat screen 3">

The UI allows you to download the user objects by clicking on the download icon in the actions column

<img src="/images/stat/image04.png" width="" alt="alt_text" title="object stat screen 4">

The statistic value associated with an object can be modifed and to do this click on the edit (pencil) icon right beside the statistic value.

<img src="/images/stat/image.png" width="" alt="alt_text" title="object stat screen 5">

Clicking the icon opens up a modal window where we provide the name of the object currently being modified and the user associated with it.

The statistic value can be modified by entering the desired statistic value in the input field.

<img src="/images/stat/image05.png" width="" alt="alt_text" title="object stat screen 6">

Once the desired value has been entered in the input field click on modify and that would update the data grid with the value and sort the data items based on the value entered.

<img src="/images/stat/image06.png" width="" alt="alt_text">

Finally the UI allows the ability to delete an object from this screen. It is the same behaviour in the User Object screen.
To do this select the object that you want to delete and then notice the delete icon on the top right of the screen has been highlighted.

<img src="/images/stat/image07.png" width="" alt="alt_text">

Clicking on the icon opens up a confirmation dialog asking whether you want to delete the object. Clicking the delete option will<br/> delete the object and then refresh the data grid with that object not present.

<img src="/images/stat/image08.png" width="" alt="alt_text">

<br />
<br />
<br />
<br />

## Object Groups

Object Groups enables you to create a specific group of users which can then be associated to a specific set of Publisher Objects.

<img src="/images/og/objectgroups1.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
###### Left Panel

Left panel contains

- Number of Object Groups listed
- Group Search (incl Partial Search)
- Groups List

<br />
<br />
#### Search Groups

To search for a Group enter a valid Group ID (partial search will not work) or scroll through the list

<br />
<br />
#### Create Object Group

To create an object group click on the “+” icon above the groups list

<img src="/images/og/objectgroups2.png" width="" alt="alt_text" title="object groups objects>

You will be presented with a modal

<img src="/images/og/objectgroups3.png" width="" alt="alt_text" title="object groups objects>

All fields are required.

There are 2 options to add users to the group

- Upload / drag and drop a csv of users
- Select a user from the dropdown and click “Add User”

Once the group is created it will appear in the Groups list

When a group has been created objects can be linked to the group.

<br />
<br />
###### Right Panel

Right panel contains

- Group Name
- User List Expansion Panel
- Object List Expansion Panel

<br />
<br />
#### View Group Details

Selected the group in the list you want to associate the objects with.

<img src="/images/og/objectgroups4.png" width="" alt="alt_text" title="object groups objects>

This will show a details panel split in 2,

- List of users
- Grid for Objects

<img src="/images/og/objectgroups5.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
#### Users

The user Panel shows the number of users in a group. Opening the panel will show all the users in the group.

<br />
<br />
##### Add users

New users can be added, by searching for them with the search field and clicking the Add button.

<br />
<br />
##### Delete users

To delete a user, click the trash icon on the right.

To delete multiple users, check the boxes on the left, or select all and click the trash icon next to the search bar.

<br />
<br />
##### Replace users Upload CSV

It is possible to upload a CSV of users to replace the existing users set

<img src="/images/og/objectgroups6.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
#### Objects

The Object Panel contains objects in a grid with the same meta as presented in Publisher Objects.

<br />
<br />
##### Download

You can download each object by clicking the download icon on the right of the row.

<br />
<br />
##### Release

There is also an option to “Release” the object.

If you click the release Icon you will be shown a confirmation modal to ensure you want to release / replace a current global object.

<img src="/images/og/objectgroups7.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
##### Delete

To delete an object, click the checkbox on the left and click the trash icon above the list

If you click the trash Icon you will be shown a confirmation modal to ensure you want to delete.

<img src="/images/og/objectgroups8.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
#### Upload Object

Objects can be uploaded to Groups by clicking the upload icon below the Objects list table

<img src="/images/og/objectgroups9.png" width="" alt="alt_text" title="object groups objects>

You will be presented with an Upload File modal

<img src="/images/og/objectgroups10.png" width="" alt="alt_text" title="object groups objects>

There are a number of required fields, if there are no complete you will receive the standard error messaging.

<img src="/images/og/objectgroups11.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
### Delete Group

To delete a group from the list, click the trash icon, at the top right of the Group Details panel.

If you click the trash Icon you will be shown a confirmation modal to ensure you want to delete.

<img src="/images/og/objectgroups12.png" width="" alt="alt_text" title="object groups objects>

<br />
<br />
<br />
<br />

## Pooled Objects

The Pooled Objects screen allows you to search for pooled objects by their owners, by tags, or a combination of both. Once located you can download or delete the objects.

<img src="/images/pl/pl0.png" width="" alt="alt_text" title="Pooled Objects Search screen">

#### Search Bar

Use the search bar at the top of the screen to add search elements and execute the search.

<img src="/images/pl/pl1.png" width="" alt="alt_text" title="Pooled Objects Search UI">

Click the Add button to add a new search element, either a player (owner) or a tag.

To add an owner, select the 'User' option in the radio button select and enter a player ID or gamertag into the box. The gamertags field supports autocompletion from Activision (Uno) accounts . Click or press Enter to select.

<img src="/images/pl/pl2.png" width="" alt="alt_text" title="Pooled Objects Search user select (empty)">
<br />

<img src="/images/pl/pl3.png" width="" alt="alt_text" title="Pooled Objects Search user select (populated)">

Once selected, click the 'Add user to search' button. The user's ID will now be shown in the 'Users' section of the search UI.

<img src="/images/pl/pl4.png" width="" alt="alt_text" title="Pooled Objects Search UI (populated by user)">

You can add more users in the same way. Remove a user by clicking the X in the search chip.
To return files owned by ALL these users, select ALL in the dropdown next to Users. Lastly to see files belonging to ANY of these users, select ANY.

To add a tag, click the Add button and select the 'Tag' option in the radio button select. If there are human-readable tags set up for this project, you will see a list of these in the 'Key' dropdown. Click on one to select, and enter the desired value in the 'Value' box. Alternatively, you can click the edit icon next to the Tag radio button and enter the tag name manually.

<img src="/images/pl/pl5.png" width="" alt="alt_text" title="Pooled Objects Search tag select (empty)">

<br />
<img src="/images/pl/pl6.png" width="" alt="alt_text" title="Pooled Objects Search tag select (showing tag list)">

<br />
<img src="/images/pl/pl7.png" width="" alt="alt_text" title="Pooled Objects Search tag select (populated)">

Toggle the tags search match behavior via the radio buttons located at the bottom.
Setting 'Equal', the results will have the tag exactly match your entered value.
Setting 'Wildcard', the results will include partial matches on the entered value. e.g., entered '1', received values '1', '111', '10393'.

<img src="/images/pl/pl8.png" width="" alt="alt_text" title="Pooled Objects Search UI (populated by tag)">

Adding more tags to the search and customising the search logic (ANY versus ALL) works the same way as for Users (see above).

Click the Search button (magnifying glass icon) to execute.

#### Table

The objects table shows the objects matched by your search. If there are too many to display at once, it displays a 'Show More' button at the bottom of the table.

<img src="/images/pl/pl9.png" width="" alt="alt_text" title="Pooled Objects Search table showing results">

Tags and owners are displayed next to the object name. Other fields include Created [date], Content Length, Content URL, Description, Modified [date], Expires On [date], Checksum, Category, ACL, and extraData. You may need to scroll horizontally to see these.

Of particular note is the Content URL field - click on this URL for a file to download.

<img src="/images/pl/pl13.png" width="" alt="alt_text" title="Pooled Objects Search screen showing content URL for a file">

#### Deleting Objects

<img src="/images/pl/pl10.png" width="" alt="alt_text" title="Pooled Objects Search table showing selected item">

Select pooled objects using the checkboxes on the left edge of the table, and delete them using the delete icon in the top right of the screen.
A dialog will ask for confirmation before deleting.

<img src="/images/pl/pl11.png" width="" alt="alt_text" title="Pooled Objects Search screen showing delete confirmation">

<br />
<br />
<br />
<br />

#### Title Info

## Title Dashboard

<img src="/images/td/titledashboard1.png" width="" alt="alt_text" title="title dashboard screen>

The Title dashboard displays Title information used to manage and compare Services across Title Environments to ensure they are in sync.

<br />
<br />
#### Search

It is possible to search the Title Information by entering a value into the search bar.

<br />
<br />
#### View

The currently Dashboard shows 4 groupings

- Services (versions)

     - Achievements Engine
     - Auth
     - Marketplace
     - MMP
     - ObjectStore
     - WebServices \

- Statistics

     - Users Online
     - Games Online
     - Registered Users \

- Cluster/Endpoint

     - Cluster
     - LSG Subcluster
     - Auth Cluster
     - LSG
     - Endpoint
     - Webservices Endpoint
     - Title-Webservices Endpoint
     - Login Queue Endpoint
     - Login Queue Webservice Endpoint \

- GIT/Python
     - Git Revision
     - Git Revision Time
     - Git Branch
     - Python Branch

<br />
<br />
<br />
<br />

#### Security

## IP Whitelisting

IP Whitelisting allows users to specify which IPs are allowed to access the title, checked at the game cluster after successful authentication. Each IP may specify a range of additional IPs counting upwards.

The Devzone IP Whitelisting interface allows users to attach 'notes' to each IP/range, and to organise them into arbitrary groups as needed. This additional data is stored in Devzone and thus not accessible via game APIs.

### Reading the current whitelist

The IP Whitelisting interface displays all allowed IPs and their ranges in a table. Each IP/range row also displays any associated notes, and if relevant, groups.

All IPs/ranges within a group are grouped together in the table.

By default it loads only one page of IPs. There is a 'show all' button to load all pages.

<img src="/images/ipc/ipcontrol_0.png" width="" alt="alt_text" title="IP Control screen>

### Searching

There is a search field at the top which searches within all fields of the table.

_Note: it will load all pages of data before searching._

<img src="/images/ipc/ipcontrol_1.png" width="" alt="alt_text" title="IP Control screen with search term entered>

### Adding new IP/Ranges

To add new IP/Ranges, use the Add button in the top right of the screen. It opens a modal dialog where you can enter the information.

<img src="/images/ipc/ipcontrol_2.png" width="" alt="alt_text" title="IP Control Add IP/Range dialog>

In this form are two inputs:

1. Create or choose a group for your new IP/Ranges. _(not required)_
1. The second allows you to add the IP/Ranges themselves. _(required)_

#### Adding/selecting groups

_Groups are not required, but may be useful for organisation._

To select a group, pick it from the dropdown. All IPs created using this dialog will be associated with the selected group. They can be moved later.

<img src="/images/ipc/ipcontrol_3.png" width="" alt="alt_text" title="IP Control Add IP/Range dialog, Groups dropdown>

To create a new group, type its name into the dropdown and click 'Create (group name)' or hit the Enter key. The group will be created and preselected for you.

<img src="/images/ipc/ipcontrol_4.png" width="" alt="alt_text" title="IP Control Add IP/Range dialog, Groups dropdown, creating group>

#### Adding IP/Ranges

The second input is a text entry input where you can enter any number of IP/Range items, in the format:

<img src="/images/ipc/ipcontrol_5.png" width="" alt="alt_text" title="IP Control Add IP/Range dialog, IP/Range input, one IP/Range entered>

```
1.2.3.4+9
```

This example would whitelist 1.2.3.4 - 1.2.3.13, inclusive. If you do not enter a `+n` value, it will simply whitelist that IP address but will show `+0`.

You can add multiple IP/Ranges at once, separated by comma or space. Hitting Enter or clicking the Add button within the text field will add the IP/Range items to the list within the dialog. You can edit or delete them individually until you are ready to save.

<img src="/images/ipc/ipcontrol_6.png" width="" alt="alt_text" title="IP Control Add IP/Range dialog, IP/Range input, several IP/Ranges entered>

<img src="/images/ipc/ipcontrol_7.png" width="" alt="alt_text" title="IP Control Add IP/Range dialog, IP/Range input, several IP/Ranges in draft form>

Click the Add button at the bottom right of the dialog to submit the IP/Ranges you have created.

### Adding notes to an IP

IPs which have no notes have the text 'Click to add note' in the Notes column. Double click on this field and add your note about the IP. Press Enter to submit.

If the IP already has a note, edit it in the same way by double clicking on the field. You'll see the 'Note updated' column update with the current time.

<img src="/images/ipc/ipcontrol_8.png" width="" alt="alt_text" title="IP Control IP/Range with no note set>

<img src="/images/ipc/ipcontrol_9.png" width="" alt="alt_text" title="IP Control IP/Range with no note set, ready to edit>

<img src="/images/ipc/ipcontrol_10.png" width="" alt="alt_text" title="IP Control IP/Range with a note set, saved>

### Setting an existing IP's group

If you want to organise IPs into groups after creation, double-click on the 'Group ID' column and select a group from the list.

To remove an IP from a group, open the dropdown and hit the X button to clear the group. It will be moved back to the default Unassigned Group.

<img src="/images/ipc/ipcontrol_11.png" width="" alt="alt_text" title="IP Control IP/Range with group dropdown open, nothing selected>

To create a new group, type in the new name and either press Enter or click 'Create (group name)' in the dropdown.

<img src="/images/ipc/ipcontrol_12.png" width="" alt="alt_text" title="IP Control IP/Range with group dropdown open, creating new group>

The IP will automatically be added to this group as soon as it is created.

<img src="/images/ipc/ipcontrol_13.png" width="" alt="alt_text" title="IP Control group 'test 2' containing one IP/Range>

You can also drag IPs from one group to another using the grab handle at the far left of each row. They will be updated as soon as you finish dragging them.

<img src="/images/ipc/ipcontrol_14.png" width="" alt="alt_text" title="IP Control row grab handle>

### Deleting IPs and groups

Select IP rows to mark them for deletion, and click the Delete button in the top right to delete. To select all IPs in a group, use the checkbox on the group row.

<img src="/images/ipc/ipcontrol_15.png" width="" alt="alt_text" title="IP Control partial group selected>

You will see a dialog to confirm the delete. Click Delete to proceed.

<img src="/images/ipc/ipcontrol_16.png" width="" alt="alt_text" title="IP Control delete dialog, no groups selected>

If you selected all the IPs in one or more groups, the dialog will also prompt you to delete the group.

<img src="/images/ipc/ipcontrol_17.png" width="" alt="alt_text" title="IP Control full group selected>

Mark the checkbox if you want to delete the group as well, or leave it empty to keep the group while deleting the IPs.

<img src="/images/ipc/ipcontrol_18.png" width="" alt="alt_text" title="IP Control delete dialog, one or more groups selected>

## Devzone Advanced Grids

<br />
<br />
###### Options Panel

<img src="/images/ag/aggrid1.png" width="" style="max-height:70vh" alt="alt_text" title="ag-grid options sidebar panel">

**Export options** for Excel and CSV are available to save all of the available table data.
**Note only the current loaded data will be exported**

**Column state** options allow you to save and reset column ordering.
Click **save** after moving columns around to save the current order. Click **restore** to return to your previously saved state.
The **reset** button will allow you to return to the default column layout.

**Cell meta** includes the option to toggle on and off keyboard shortcuts.
By default this is off, arrow keys will simply scroll the table view and options such as using your tab key or other keyboard shortcuts won’t be available.
Enabling this option will provide the benefits below:

- Use the arrow keys to move focus _up, down, left and right_.
- If a cell on the first grid row is focused and you press _arrow up_, the focus will be moved into the grid header.
- Use _PAGE UP_ and _PAGE DOWN_ to move the scroll up and down by one page. Use _HOME_ and _END_ to go to the first and last rows.
- If on a group element, hitting _ENTER_ will expand or collapse the group.
- Pressing _ENTER_ on a cell will put the cell into edit mode, if editing is allowed on the cell.
- Pressing _SPACE_ on a cell will select the cell row. Because multi-select is enabled, the selection will not remove any previous selections.

**Header cells:**

- Press _SPACE_ to toggle the header checkbox selection.
- Press _ENTER_ to toggle the sorting state of that column.
- Press _Shift + ENTER_ to toggle multi-sort for that column.
- Press _Ctrl/Cmd + ENTER_ to open the menu for the focused header.
- When a menu is open, simply press _ESCAPE_ to close it and the focus will return to the header.

<br />
<br />
###### Columns Panel

<img src="/images/ag/aggrid2.png" width="" style="max-height:70vh" alt="alt_text" title="ag-grid columns sidebar panel">

- Search to quickly filter displayed columns.
- Checking / unchecking columns will show / hide the columns.
- Drag a column (e.g. Username) to Row Groups to group rows.
- Drag a column to Values to aggregate with options such as sum, avg, min, max

**Pivoting:**

- Pivoting allows you to take a columns values and turn them into columns. For example, you can pivot on Country to make columns for Ireland, United Kingdom, USA etc.
- Pivoting only makes sense when mixed with aggregation. If you turn a column into a pivot column, you must have at least one aggregation (value) active for the configuration to make sense.
- Pivot Mode Off: When pivot mode is off, selecting a column toggles the visibility of the column. A selected column is visible and an unselected column is hidden. If you drag a column from the tool panel onto the grid it will make it visible.
- Pivot Mode On: When pivot mode is on, selecting a column will trigger the column to be either aggregated, grouped or pivoted depending on what is allowed for that column.
- More on pivoting can be found here: https://www.ag-grid.com/documentation/javascript/pivoting/

<br />
<br />
###### Filters Panel

<img src="/images/ag/aggrid3.png" width="" style="max-height:70vh" alt="alt_text" title="ag-grid filters sidebar panel">

The filters in the tool panel duplicate those found in the column menu.
Any columns that are filterable will display here with a convenient option to search and quickly update filters. Columns with filters active will have the filter icon appear beside the filter name in the tool panel and column header.

<br />
<br />
<br />
<br />

## Login Queue

View and manage login queues for the selected title environment. Advanced access controls provided by Devzone.

<img src="/images/lq/lq1.png" width="" alt="alt_text" title="Login Queue">

### What is the LoginQueue service?

LoginQueue allows authenticated clients to:

- wait in a queue when LSG/MMP has reached its maximum capacity
- be periodically updated with a wait estimate
- and finally be provided with a valid ticket that allows them to connect

Within Devzone the following functionality is available:

- Login Queue Management
- Information Storage
- Title Settings

There are two subsections, Login Queue and Groups. Login Queue contains information and settings about the current title, and Groups contains information about all titles.

<img src="/images/lq/lq2.png" width="" alt="alt_text" title="Login Queue Tabs">

<br />
<br />

#### Login Queue

Login Queue settings are controlled via the left panel, and VIP list information is shown on the right.

<br />

##### Login Queue Settings

The currently selected Queue is controlled via the dropdown at the top of the panel.

<img src="/images/lq/lq3.png" width="" alt="alt_text" title="Login Queue Left Panel>

- **Queue ID** Select which Queue to view for the selected title environment. It will show the values of Queue State, Max Login Rate, and Queue Closed Code for the selected Queue

<img src="/images/lq/lq4.png" width="" alt="alt_text" title="Login Queue QueueID>

<br />

<img src="/images/lq/lq3.png" width="" alt="alt_text" title="Login Queue Left Panel>

Change queue-specific settings under the 'Queue' heading:

- **Queue State** Whether the selected Queue is Open or Closed
- **Max Login Rate** The login rate per time period (default: seconds) for the selected Queue. _Note: this cannot be set below 1!_
- **Queue Closed Code** The 'queue closed' code of the selected Queue

The _Queue Closed Code_ gives the error code (integer) returned to the game client when the queue is closed

Change title-wide settings under the 'All Queues' heading:

- **Max CCU** The maximum concurrent connected users across all queues on the selected Title. _Note: this cannot be set below 1!_

Users with `edit` permissions can change the settings in this section with the Save/Cancel buttons visible.

The Save/Cancel buttons will become active after any changes have been made. Click Cancel to restore the values to before editing started.

A popup dialog will show the exact changes being submitted to LoginQueue and ask for confirmation.

<img src="/images/lq/lq7.png" width="" alt="alt_text" title="Login Queue Queue-Specific Settings Confirm Dialog>

<br />

<img src="/images/lq/lq8.png" width="" alt="alt_text" title="Login Queue Title-Wide Settings Confirm Dialog>

Click Cancel to resume editing, or Save to confirm your changes.

<br />

##### Login Queue VIP List

Shows the VIP list for the currently selected queue.
<br />
Users with `edit_loginqueue_vip_usernames` permissions can _Add new GamerTags_ into the VIP List and _Delete GamerTags_ from the VIP list.
Users with `propagate_loginqueue_vip_usernames` permissions can _Propagate GamerTags lists_ to other queues.

Listing the first-party GamerTag of each member. Use the search box to filter VIP lists.

**Note**: As Login Queue is the first step in the game login, only first-party details can be used.
<br />
<br />
<img src="/images/lq/lq6.png" width="" alt="alt_text" title="Login Queue Right Panel>

<br />
<br />

**Add GamerTags to VIP List**
<br />
<br />
Allows updates to the VIP List with new GamerTag names.
<br />
**_Make sure to enter first-party gamertags correctly, as there's no validation is performed by the service._**
<br />
<br />
<img src="/images/lq/lq9.png" width="" alt="alt_text" title="Login Queue Add GamerTag to VIP List">
<br />
<br />
Write GamerTag name in the input box, for multiple GamerTag enteries, separate them by _commas_ and click on **_Add GamerTag Button_** to add it in the GRID.
<br />
<br />
<img src="/images/lq/lq10.png" width="" alt="alt_text" title="Login Queue Add GamerTag - add to VIP List">
<br />
<br />
To Add GamerTag to the VIP List, click on **_ADD_** button in the bottom or to _Remove_ any entry click on **_Remove Button_** on the right.
<br />
<br />
<img src="/images/lq/lq11.png" width="" alt="alt_text" title="Login Queue Add GamerTag - remove to VIP List">
<br />
<br />
To Remove all entries, click on **_Remove All Button_** on the top right corner.
<br />
<br />
<img src="/images/lq/lq12.png" width="" alt="alt_text" title="Login Queue Add GamerTag - remove all to VIP List">
<br />
<br />

**Delete GamerTags from the VIP List**
<br />
<br />
Select GamerTags from the VIP List and click on **_Delete_** button on top, a dialog box appears for confirmation, confirm it to remove the GamerTag from the list.
<br />
<br />
<img src="/images/lq/lq13.png" width="" alt="alt_text" title="Login Queue Delete GamerTag from VIP List">
<img src="/images/lq/lq14.png" width="" alt="alt_text" title="Login Queue Delete GamerTag - confirmation from VIP List">

**Propagate VIP GamerTag List to other titles/queues**

VIP lists can be propagated between queues on the same title environment, and between title environments within the same project.

If you have permission to propagate to any valid title environments, the propagate button will appear between the add and remove GamerTag buttons in the top right.

<img src="/images/lq/lq15.png" width="" alt="alt_text" title="Login Queue Propagate Button">

Click the button to pop up the Propagate modal.

<img src="/images/lq/lq16.png" width="" alt="alt_text" title="Login Queue Propagate Modal">

Select the title environment to target in the first dropdown. The available queues will be loaded in the second dropdown.

<img src="/images/lq/lq17.png" width="" alt="alt_text" title="Login Queue Propagate Modal showing selected target title environment">

Select the queue to target in the second dropdown. If the queue's VIP list is already populated, there will be a message to notify.

<img src="/images/lq/lq18.png" width="" alt="alt_text" title="Login Queue Propagate Modal showing that target queue is populated">

If the queue's list is currently empty, the help text for the queue field will be shown.

<img src="/images/lq/lq19.png" width="" alt="alt_text" title="Login Queue Propagate Modal showing target queue help text">

**Note: If you propagate a VIP list to another queue, the existing VIP list on that queue is deleted before writing the new data! This is to prevent conflicts.**

Click Propagate to proceed with the operation. On an empty target list it will happen right away. On a populated target list it will show a confirmation popup. Click Propagate here to confirm.

<img src="/images/lq/lq20.png" width="" alt="alt_text" title="Login Queue Propagate Modal showing 'target list populated' confirm popup">

When the operation finishes, the modal dialog will close.

#### Login Queue Groups

_(Coming Soon)_ It will allow the user to view VIP players in the allowlist/allowlist groups for Login Queue across all titles.

<img src="/images/lq/lq5.png" width="" alt="alt_text" title="Login Queue Groups">

<br />
<br />
<br />
<br />

## Player View

Player View provides a player-centric view of account & game data across a variety of services. Including, but not limited to:

- Activision (Uno) accounts
     - Account details
     - Linked Accounts
     - 2FA status
     - Bans
- Player Activity/Logins
- Social
     - Friends
     - Presence / Online status
- A/B testing
- Achievements
- Battlepass
- Inventory
- Leaderboards
- Matchmaking
- User Storage.

**Account Lookup** - a player-centric view of account data, including Activision account details, linked accounts, recent game logins, and activision friends.

**Game Data** - a player-centric view of game data, providing information on game services such as achievements, inventory, matchmaking, AB Testing and more.
Account information can also be found here, hidden by default in the options selector which you can learn more about [below](#game-data).

### Accounts Lookup

<img src="/images/pv/pv0.png" width="" alt="alt_text" title="Accounts Lookup">

<br />
<br />
###### Finding a Player

<img src="/images/pv/pv1.png" width="" alt="alt_text" title="Accounts Lookup - player select">

Search by Activision (Uno) ID, First Party ID, gamertag, or email. Results will populate automatically as you type.
Note that gamertag includes both first party and uno accounts results and will perform partial search by default.
Other search terms such as email, First Party ID require an exact match.

Optionally you can configure the environment to search within. DEV, CERT, PROD (default) and their China (SHA) options are all available.
This configuration persists with the url whenever you share a link.

<br />
<br />

#### Accounts Tiles

Tiles conveniently segment player account data. Most tiles include a <icon>expand_less</icon> icon allowing you to collapse the view.

<br />
###### Activision (Uno) Account

Includes information relevant to the players' activision account. Personal information such as DOB and address are available as well if you meet whitelisting requirements for PII.

<img src="/images/pv/pv2.png" width="" alt="alt_text" title="Accounts Lookup - Activision (Uno) account tile">

<br />
<br />
###### Linked Accounts

Displays any associated accounts along with IDs and created/updated timestamps.
Click ‘Open All’ to quickly expand each option.

<img src="/images/pv/pv3.png" width="" alt="alt_text" title="Accounts Lookup - Linked accounts tile">

<br />
<br />
###### Player Activity/Logins

<img src="/images/pv/pv4.png" width="" alt="alt_text" title="Accounts Lookup - Player activity tiles">

The ‘Player Activity’ section includes information available within the past 14 days based on Activision’s retention policy. Player presence as well as the most recent login information from kubernetes can be found here. IP information is available as well if you meet whitelisting requirements for PII. Click the ‘Show More Logins’ button to view previous logins for our supported titles.

‘Recent Tite Logins’ section includes data from title launch so will be the most accurate representation for any users that haven’t logged in within the past two weeks.

<br />
<br />
###### Activision Friends

This section lists friends associated with the Activision (Uno) account. Click a friend's Uno ID highlighted in blue to quickly query thier account game data into view.

<img src="/images/pv/pv5.png" width="" alt="alt_text" title="Accounts Lookup - Activision friends tile">

<br />
<br />

#### Game Data

Game Data displays an all encompassing view of user data for services available.

<img src="/images/pv/pv6.png" width="" alt="alt_text" title="Game Data">

<br />
<br />
###### Selecting a Player

Similar to Accounts Lookup, you are able to select a service configuration and type in Activision (Uno) ID, First Party ID, gamertag, or email address.

<img src="/images/pv/pv7.png" width="" alt="alt_text" title="Game Data - player selector">

After selecting a player, the header will populate with our ‘options’ and ‘group by’ selectors.

<img src="/images/pv/pv8.png" width="" alt="alt_text" title="Game Data - header selectors">

The _options selector_ highlights the section in view as you scroll with a blue background, in this case, ‘Recent Activity’. Click any options bordered with blue to navigate to the relevant section.

The _group by selector_ allows you to filter the data by service type or title.

In the above example, because ‘group by’ is set to ‘service’ each title option is yellowed out while the service options are selectable to scroll them into view.
Click anywhere on the options selector to bring up a menu to quickly select or unselect options. You’ll notice the ‘Accounts’ view from the ‘Accounts Lookup’ is available here as well although defaulted to hidden. You can also click the ‘x’ on each chip to remove that option from view.

<img src="/images/pv/pv9.png" width="" alt="alt_text" title="Game Data - options menu">

<br />
<br />

#### Game Data Sections

<br />
###### Recent Activity

The ‘Recent Activity’ section showcases pieces from each of the services scoped down to the most up to date information available. Data availability is highlighted here in the sub headers - usually spanning around 2 weeks.

<img src="/images/pv/pv10.png" width="" alt="alt_text" title="Game Data - Recent Activity Section">

<br />
<br />
###### A/B Testing

Includes any A/B test treatments run on the selected Activision (Uno) ID separated by title. With any of the following views you can click the title header to navigate to the title view showcasing every service specific to that title. The remaining links will navigate you to the A/B testing page.

<img src="/images/pv/pv11.png" width="" alt="alt_text" title="Game Data - A/B Testing Section">

<br />
<br />
###### Achievements

Includes any user achievements per title narrowed down to the 5 most recent results.

<img src="/images/pv/pv12.png" width="" alt="alt_text" title="Game Data - Achievements Section">

<br />
<br />
###### Battlepass

If the account has purchased Battlepass, their progression will be displayed here.

<img src="/images/pv/pv13.png" width="" alt="alt_text" title="Game Data - Battlepass Section">

<br />
<br />
###### Inventory

Includes any items and currencies per title narrowed down to the 5 most recent results. Results are per-platform so any duplicates are explained by platforms in use such as PSN and XBL.

<img src="/images/pv/pv14.png" width="" alt="alt_text" title="Game Data - Inventory Section">

<br />
<br />
###### Matchmaking

Includes the most recent lobby and match details per title. Lobby ID links will direct you to our matchmaking lobby viewer.

<img src="/images/pv/pv15.png" width="" alt="alt_text" title="Game Data - Matchmaking Section">

<br />
<br />
###### Storage

Includes the most recent user storage items.

<img src="/images/pv/pv16.png" width="" alt="alt_text" title="Game Data - Storage Section">

<br />
<br />
###### Title View

Selecting ‘group by’ ‘title’ from the header menu will switch from the service view and alternatively filter each section by title. The title in view will be highlighted in blue on the options selector. The same information as the above sections is available while handily being grouped together. You can click any of the blue headers to navigate to the relevant devzone page for that service.

<img src="/images/pv/pv17.png" width="" alt="alt_text" title="Game Data - Title View">

<br />
<br />
###### Title Summary

Also when in title view, under each title will appear a Title Summary section that will show the latest
login for each game mode. This section will also display the player's rank, prestige, total time played,
score per minute, score per game, and kill death ratio

<img src="/images/pv/pv18.png" width="" alt="alt_text" title="Game Data - Title Summary">

<br />
<br />
<br />
<br />
<br />

## Clans View

Clan View provides tooling to view and manage clans, enabling you to view clan members, along with those who were banned or have sent a proposal to join.


**Members** - a view specific to clan member details including a clan overview and tables for its members, banned players, and proposed members.

### Members

<img src="/images/cl/clans1.png" width="" alt="alt_text" title="Clan Members - overview">

<br />
<br />
###### Searching for a Clan

<img src="/images/cl/clans2.png" width="" alt="alt_text" title="Clan Members - clans search">

Search by Clan Name, ID, or tag. Results will populate automatically as you type.
Note that clan name and tags search will perform partial search by default.
Searching for Clan ID will require an exact match.

Optionally you can configure the environment to search within. DEV, CERT, PROD (default) and their China (SHA) options are all available.
This configuration persists with the url whenever you share a link.

<br />
<br />
###### Clan Summary

Overview of important information on the selected clan.

<img src="/images/cl/clans3.png" width="" alt="alt_text" title="Clan Members - clan summary">

<br />
<br />
###### Clan Members Table

Includes a list of clan members along with links to [Player View](#player-view).

<img src="/images/cl/clans4.png" width="" alt="alt_text" title="Clan Members - overview">

<br />
<br />
###### Clan Proposed Members Table

Includes a list of players who have sent proposals to join a clan along with any messages attached.

<img src="/images/cl/clans5.png" width="" alt="alt_text" title="Clan Members - overview">

<br />
<br />
###### Clan Banned Members Table

Includes a list of players banned from the selected clan.

<img src="/images/cl/clans6.png" width="" alt="alt_text" title="Clan Members - overview">

<br />
<br />


<br />
<br />
<br />
<br />
<br />
