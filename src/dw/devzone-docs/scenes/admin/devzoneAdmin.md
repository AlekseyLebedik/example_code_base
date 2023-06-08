## Title Setup

### Configuring Shared Services using ServiceConfig

Devzone's interaction with **shared services** is **configured** in four broad steps:

1. At **Devzone-wide** level
(one-time setup of a service which can be used by multiple title environments)
2. At **title env** level
(selecting which instance of a service to talk to, and which context/optionally which auth info to use)
3. **Miscellaneous** other stuff which is required by specific services
(at the moment, setting a publisher for ObjectStore is the only one of these)
4. **Success
**(we may as well be optimistic)

Spinning up a **new instance** of a shared service, and need to address it through a Devzone title environment page? Start with **Step 1**.

Not sure whether the shared service you are configuring exists in Devzone yet? You can have a look here:

[https://devzone.demonware.net/admin/src/serviceconfig/](https://devzone.demonware.net/admin/src/serviceconfig/)

Hooking up a title environment to an **existing service** already configured in Devzone? Start with **Step 2**.

Configuring **AB Testing**? Remember you will need to follow these steps for **_both_** the AB Testing shared service **_and_ **the Segmentation shared service (they are separate!) if you want segments to work in Devzone.

Configuring **ObjectStore**? You will have to set the publisher (see **Step 3**).


#### Step 1: ServiceConfig setup

ServiceConfigs look like this:


![alt_text](/images/dd/image01.png "image_tooltip")


They are created once each and may be mapped to any number of title environments, as needed.

The simpler kind of setup is with AchievementsEngine or Marketplace service configs. These services are unauthenticated so you simply set the name, type, base URL and client ID (we mostly use 'devzone'), then you can proceed to Step 2 right away.

Other shared services are authenticated via GMAT. In order to authenticate this way, select the relevant GMAT service from the GMAT dropdown when creating your ServiceConfig.

Typically this would be GMAT Cert for a Cert shared service, for example.

**Note: The Devzone API hosts must have network access configured to the base URL you enter or Devzone will not be able to interact with your service! Confirm this before proceeding!**

**Note: The <code>devzone</code> client must have access to your service via dwtoken at the appropriate GMAT endpoint for this integration to work.</strong>

**Note: In most cases the GMAT for your environment (dev/cert/prod) should already exist and already work for your use case! If you don't see it, ask the Devzone team. Please do not touch any GMAT configs without talking to us.**


#### Step 2: ServiceConfig mapping to title environment

Once you have created the service config, you can then add them to a Title Environment by going to the summary page (example: BO4 PS4 Dev):

[https://devzone.demonware.net/title/5687/Development/](https://devzone.demonware.net/title/5687/Development/)

Click the Settings link in the top left, which will take you to this page:

[https://devzone.demonware.net/admin/src/titleenv/2679/change/](https://devzone.demonware.net/admin/src/titleenv/2679/change/)

You'll see something like this in the Service Config section:


![alt_text](/images/dd/image02.png "image_tooltip")


Just select the kind of service you want to associate with that title and then select from the list. You'll need to provide a context matching the one configured in MMP/shared service configs. The context is the main way of splitting data between titles/environments.

Again, for AE and Marketplace you need not worry about 'Client id' or 'Client secret', as authentication is not enabled in AE or Marketplace yet.

For other shared services, we are using dwtoken authentication through GMAT, so as long as you associated an GMAT instance with your ServiceConfig in Step 1 you don't need to fill anything in here. Client ID will be propagated from the ServiceConfig so only set it if you need it to be different from that.

You can have as many title environments as you like talking to the same service through the same ServiceConfig. Make sure to give them clear names!

Now you can save the title environment.


#### Step 3: Set publisher (ObjectStore only, otherwise skip this step!)

For ObjectStore, there is an additional config item set at project level - this is the 'publisher' which is associated with publisher objects for all title envs within that project.

The publisher value must be one of the values in ObjectStore service's `valid_publishers` config variable. You can see here it is set to `treyarch` for the BO4 project.

[https://devzone.demonware.net/admin/src/project/1141/change/](https://devzone.demonware.net/admin/src/project/1141/change/)


![alt_text](/images/dd/image03.png "image_tooltip")


The actual Publisher object in this dropdown is very simple and it's easy to add a new one if needed - just try not to duplicate them. They contain only a Name (this must exactly match one of the `valid_publishers` values), and a Company which is associated with that name from a DW point of view. They do not have to match each other, though. Save the project when you're finished.

[https://devzone.demonware.net/admin/src/publisher/](https://devzone.demonware.net/admin/src/publisher/)



![alt_text](/images/dd/image04.png "image_tooltip")



![alt_text](/images/dd/image05.png "image_tooltip")



#### Step 4: Success

If you've reached this point, you can proceed with testing your service integration through Devzone Studio. Please reach out to the Devzone team if there are any issues, or if anything in this doc was confusing/out of date.

### Create a new Title in Devzone

This article will cover how to setup a new title in an _existing_ Project in Devzone.

A project will typically have many titles, one per each flavor & platform. And each Title will get its own unique Title ID.

[Title Setup naming guide](https://github.ihs.demonware.net/Demonware/dw-standards/blob/master/title-setup-dns-strings.md)


#### Title creation steps


1. Visit [https://devzone.demonware.net/admin/src/title/add/](https://devzone.demonware.net/admin/src/title/add/)
2. Fill in all relevant values for your new Title \
See Title setup inputs for a full description
3. Click save
4. You will be redirected to the new Title page, take note of the newly created title id.


#### Title setup inputs

When visiting the Add Title page you are presented with the following inputs:


![alt_text](/images/ts/image1.png "image_tooltip")

<table>
  <tbody>
  <tr>
   <td>Field
   </td>
   <td>Description
   </td>
   <td>Required?
   </td>
   <td>Remarks
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Project
   </td>
   <td>The project to group this title under.
   </td>
   <td>yes
   </td>
   <td>You can choose to create a new Project here via the + icon
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>State
   </td>
   <td>Is this title locked for editing?
   </td>
   <td>yes
   </td>
   <td>Typically set for production titles once all changes have been made, prevents editing of most fields
   </td>
  </tr></tbody>
 <tbody> <tr>
   <td>Platform
   </td>
   <td>Platform for this Title
   </td>
   <td>yes
   </td>
   <td>A separate title is created for each platform, for new platforms contact the Devzone Team
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Nickname
   </td>
   <td>A short name used to display in Devzone
   </td>
   <td>
   </td>
   <td>Allows customizing the display name used in Devzone
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Regional Tag
   </td>
   <td>Region for this title
   </td>
   <td>
   </td>
   <td>Informational only, rarely used for newer titles
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Feature Tag
   </td>
   <td>Feature tag for this title
   </td>
   <td>
   </td>
   <td>Informational only
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Primary contact
   </td>
   <td>Who is the Demonware primary contact for this title
   </td>
   <td>yes
   </td>
   <td>Typically the Manager of the Title Team
   </td>
  </tr></tbody>
 <tbody> <tr>
   <td>Secondary contact
   </td>
   <td>Who is the Demonware secondary contact for this title
   </td>
   <td>yes
   </td>
   <td>Typically the Team Lead of the Title Team
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Enabled
   </td>
   <td>Is this title enabled?
   </td>
   <td>yes
   </td>
   <td>Controls if it can be seen in some areas of Devzone and if editable
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Group
   </td>
   <td>What group is this title in?
   </td>
   <td>
   </td>
   <td>Informational only, rarely used for newer titles
   </td>
  </tr></tbody>
 <tbody> <tr>
   <td>Is Billable
   </td>
   <td>Can this title be billed and included in datacentre utilisation?
   </td>
   <td>yes
   </td>
   <td>Typically set, and for all Studio titles
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Graphite
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Graphite URL
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>Graphite path
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>XBOX
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>XBOX Live Title ID
   </td>
   <td>XBOX 360 Titles details
   </td>
   <td>
   </td>
   <td>No longer relevant, only applicable for XBOX 360 titles
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>XBOX Live Service ID
   </td>
   <td>XBOX 360 Titles details
   </td>
   <td>
   </td>
   <td>No longer relevant, only applicable for XBOX 360 titles
   </td>
  </tr></tbody>
  <tbody><tr>
   <td>XBOX Live Service User Data
   </td>
   <td>XBOX 360 Titles details
   </td>
   <td>
   </td>
   <td>No longer relevant, only applicable for XBOX 360 titles
   </td>
  </tr></tbody>
</table>


#### Create a Title Environment

To create a Title Environment first edit the existing title created above.

In the Title environment section you will see a list of pre-defined environments. These environments are **not** created by default.


![alt_text](/images/ts/image2.png "image_tooltip")


Check the Enabled box and save to create the Title Environment

You can then click View on site and view your new Title environment.

**Do NOT use the Add another Title environment option.** This is for internal Devzone use only.


### How to set a title environment as multi_context

**Note:** Enabling this currently only affects the ABTesting related services for: Create, Update, Clone and Propagate a test.

Title environments in Devzone support crossplay services if the environment as the `multi_context` checkbox enabled.

Title environments are set as "single_context" by default. If you need to enable this feature, here is how to do it:



1. Go to [https://devzone.demonware.net/admin/src/titleenv/](https://devzone.demonware.net/admin/src/titleenv/)
2. Find the Title environment you want to support multi-context, and click on it to configure it.
3. Tick the checkbox that says Uses multiple contexts for services (where available):


![alt_text](/images/ts/image3.png "image_tooltip")



## User Permissions


### Hijacking

Hijacking a user's profile will allow you to assume that user's identity and see what they will see in Devzone Studio or the Devzone Legacy application.

1. Go to the following URL: [https://devzone.demonware.net/admin/authentication/user/](https://devzone.demonware.net/admin/authentication/user/)

2. Search for the user you want, and click the hijack button with their name on it on the right hand ‘hijack user’ panel.

    ![alt_text](/images/hij/image2.png "image_tooltip")

3. The hijack also carries over to Devzone Studio, just open in another tab and you will view what the user you hijacked can view.  Note this hijack also works in the Devzone legacy application. Ideally you should hijack in an incognito/other browser window so you still have permission to make admin changes while hijacking. This is useful for confirming issues like 'User can't see X' without lengthy back-and-forth.

4. To release the identity you are assuming, return to [https://devzone.demonware.net/admin/authentication/user/](https://devzone.demonware.net/admin/authentication/user/). You can then click the release button in the yellow header to release the user's profile and return to your own profile.

    ![alt_text](/images/hij/image1.png "image_tooltip")


### Whole company needs to see a title

Permissions are checked at the project level now by default. This means that permissions assigned to a Project will cascade down to the titles, title environments and associated companies to that project.

E.g. In the image below (screenshot from Devzone Legacy), if a user belongs to a company that is associated with 'Call of Duty: Black Ops 4', they will have read permission on all the titles listed below.


1. Go to [https://devzone.demonware.net/project/list/](https://devzone.demonware.net/project/list/) and select the relevant project by clicking "View More Details". You'll see a screen like this:

    ![alt_text](/images/up/image01.png "image_tooltip")

2. You can see a list of the companies already associated with this project under 'Associated Companies'

    ![alt_text](/images/up/image02.png "image_tooltip")

3. Click the 'Associate Company with Project' link in the 'Admin' (yellow) section of the page. You'll see a dialog like this - simply select the relevant company and click 'Add'.

    ![alt_text](/images/up/image03.png "image_tooltip")

4. Now the users from that company should be able to see the titles in that project.

### User from another company needs to see title not associated with their company

We can give this permission through the Permission Management section in Devzone Studio. As every user in Devzone can see other users, you will be able to list any user you need to give permissions to. But be aware that as an admin of a company, you will only be able to see and manage company groups and memberships of companies that you manage directly.

As an admin, you can give a user from a different company access to the groups and companies you manage by associating that user to a group or company, using the Permissions Management interface ([https://devzone-studio.demonware.net](https://devzone-studio.demonware.net/)).

The steps for achieving this are as follows:

1. First go to: [https://devzone-studio.demonware.net/permission-management/users](https://devzone-studio.demonware.net/permission-management/users)

    ![alt_text](/images/up/image04.png "image_tooltip")

2. Search for the user which needs to see the title for another company and click on it.

    ![alt_text](/images/up/image05.png "image_tooltip")

3. Within the **Companies/Groups** tab notice that there is an input dropdown with the heading of **Associated Companies**. Click on the dropdown and select the company whose project / title you need to see and also make sure the company that you are selecting has view title env permissions for itself.

    ![alt_text](/images/up/image06.png "image_tooltip")

4. Now if you click on the **Permission Groups** dropdown you can see all the groups associated with the two selected companies.

    ![alt_text](/images/up/image07.png "image_tooltip")

5. Here you can select the group which gives the user the relevant permission. For example if you need read/write permissions search for a group such as **CompanyName - Developers **and select that group. If the group you are looking for doesn't exist follow these instructions to create a group: [Permission Management in Devzone Studio#Createapermissiongroup](#create-a-permission-group).

6. Once you are satisfied with the changes hit save which is at the bottom right corner.

    ![alt_text](/images/up/image08.png "image_tooltip")

7. Now within the same page if you go to the **Advanced** tab and click the dropdown under the project panel or the titleenv panel you can see the titles and the project for that associated company.

    ![alt_text](/images/up/image09.png "image_tooltip")

    ![alt_text](/images/up/image10.png "image_tooltip")

### User needs edit rights for a title

We can do this in the new permission User Interface which is at [https://devzone-studio.demonware.net/permission-management/users](https://devzone-studio.demonware.net/permission-management/users).

![alt_text](/images/up/image11.png "image_tooltip")

### Permission Management in Devzone Studio

#### Recommended Approach:

**We recommend using Groups for managing user permissions and only use the advanced user permissions  to add specific permission to a user. **

Using groups allows you to add the needed permission to that group and then assign users. All users will have access to all the permissions that are in that group.

**We recommend adding permissions at the smallest scope (e.g. a title env rather than a project) to give the most control & flexibility.**

If you add permissions to a project then it may add those permissions to a title that you did not intend (e.g. if a new title is created within the project later).


Adding permissions at the smallest scope prevents this and allows you to compose together multiple Groups / Projects / Title environments to give the most flexibility.


#### User-level Permissions

In order to be able to edit permissions, the **permission giver needs** to have **PermissionManagement access** (being admin of a company or staff provides this access automatically).


##### How to give a specific user permissions for a specific content:

Permissions are given for a specific permission type (Project, Title Environment...) regardless of company membership.

In order to add permissions follow these steps:

1. Navigate to the[ Permission Management Page](https://devzone-studio.demonware.net/permission-management/users)
2. In the user's tab there are a list of users. Search for the user you want to add the permission

    ![alt_text](/images/ps/image1.png "image_tooltip")

3. Click on the `Advanced` Tab and there you will see all the permission types, separated in panels. Let's say we want to add explicit permissions for a Company. To do so:
* Click on the Company dropdown and select the desired company.
* Then click on permissions dropdown for the Company and select the permission.
* Click the `SAVE` button which is at the bottom right corner.

    ![alt_text](/images/ps/image2.png "image_tooltip")

4. The Company will now show in the Company list page of that user.

##### How to add/remove permissions to a user by project / title env

To add or remove permissions for an individual follow these steps:

1. Navigate to the [ Permission Management Page](https://devzone-studio.demonware.net/permission-management/users)
2. Under the users tab, select the user whose permissions needs to be changed.

    ![alt_text](/images/ps/image3.png "image_tooltip")

3. Once the user is selected this opens the details panel on the right side. Head over to the `ADVANCED` tab.
4. Click on `Add Permission` under the project or title env panel. This creates two input dropdowns. Select the project or title environment and then select the permissions.

    ![alt_text](/images/ps/image4.png "image_tooltip")

5. Click on the `SAVE` button on the right hand side of the page to persist these changes.
6. To remove the permission click on the delete icon which is towards the right side of the two input drop-downs.


##### How to associate a user with a company

To add a user to a company the steps are as follows:


1. Navigate to the[ Permission Management Page](https://devzone-studio.demonware.net/permission-management/users)
2. In the user's tab there are a list of users. Search for the user you want to add the permission

    ![alt_text](/images/ps/image5.png "image_tooltip")

3. Search for and add the company in the `Associated Companies` list
4. Click on the `SAVE` button on the right hand side of the page to persist these changes.
5. To remove the association click on X icon beside the Company and save your changes

#### Group-level Permissions

##### Create a permission group

To create a permission group within Devzone Studio follow the following steps:

1. Navigate to the[ Permission Management Page](https://devzone-studio.demonware.net/permission-management/users)
2. Select the groups tab

    ![alt_text](/images/ps/image6.png "image_tooltip")


3. Click the Plus Icon beside the ‘Groups’ heading to add a new group.

    ![alt_text](/images/ps/image7.png "image_tooltip")


4. This pops up a modal window where you can enter in the name of the group,  the company and then add the relevant users.

    ![alt_text](/images/ps/image8.png "image_tooltip")

This will create the group as shown in the following image:

![alt_text](/images/ps/image9.png "image_tooltip")


**NOTE:** If some user you added was not a member of the company that owns the group, we will automatically add the user to the company that owns the group.


##### How to add/remove users from a permission group

1. Navigate to the[ Permission Management Page](https://devzone-studio.demonware.net/permission-management/users)
2. Next, click on the Groups Tab
3. Select a group

    ![alt_text](/images/ps/image10.png "image_tooltip")

On selecting a group it shows the details pane on the right. Expand the Users panel.

4. You should see the following:

    ![alt_text](/images/ps/image11.png "image_tooltip")


5. Select the Name drop-down and then pick the user that you want to add. Autocomplete and multiselect is available.

    ![alt_text](/images/ps/image12.png "image_tooltip")

6. Click on ‘Add User’

    ![alt_text](/images/ps/image13.png "image_tooltip")


7. This adds the users to the selected group.

    ![alt_text](/images/ps/image14.png "image_tooltip")


8. To remove a user just select the user that you want to remove and click the delete button on the right hand side.

    ![alt_text](/images/ps/image15.png "image_tooltip")


##### How to add/remove permissions to a group by Project or Title Environment

To add or remove permissions for a group, first navigate to Permission Management and follow the steps as follows:



1. Navigate to the [Permission Management Page](https://devzone-studio.demonware.net/permission-management/users)
2. Go to the groups tab and select a group.

    ![alt_text](/images/ps/image16.png "image_tooltip")

3. This opens the right hand details pane for that group.

    ![alt_text](/images/ps/image17.png "image_tooltip")

4. Click on Add Permissions under Title/Env.

    ![alt_text](/images/ps/image18.png "image_tooltip")

5. This creates two drop-down input fields - one for which environment, one for which permission.

    ![alt_text](/images/ps/image19.png "image_tooltip")

6. Select the title or title environment and the permissions that needs to be added.

    ![alt_text](/images/ps/image20.png "image_tooltip")


Permissions can be searched for and multi-select is available.

![alt_text](/images/ps/image21.png "image_tooltip")

Then click the SAVE button on the right hand side of the page to persist these changes.

7. To delete the permission just click on the delete icon on the right of the two input dropdowns.
