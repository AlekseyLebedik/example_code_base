# Frontend config changes in Devzone Studio

At present, some options in Devzone Studio are configured on a per-title-environment basis, such as UI versions, special informative messages... The file containing those configurations is located in the `puppet_modules` repo\_, and typically edited through Gerrit\_.

Skip to Step 4 if you already know how changing `puppet_modules` works in Gerrit.

## Step 1: Clone

If you don't have the `puppet_modules` repo from Gerrit, get it like this:

.. code-block:: bash
git clone ssh://<your_ldap_user>@gerrit.las.demonware.net:29418/puppet_modules
cd puppet_modules
Step 2: git-review

---

Install `git-review` for maximum ease of use.

.. code-block:: bash
sudo apt install git-review

.. code-block:: bash
pip install git-review
Step 3: Branch (optional)

---

Having a branch lets you work on more than one change at a time. You can checkout this branch again if you need
to make further tweaks in the scope of this one config change. Especially useful if it's been a week since you
proposed the original change! But you can also work directly on master, it seems to have the same effect on the
Gerrit end.

.. code-block:: bash
git checkout -b JIRA-1111/branch-description
Step 4: Actually make changes

---

Find the folder named `devzone-frontend`. Inside if you look at the `templates/` folder there are two folders for QA and for PROD environments called `DEVZONE_DEV_LAS` and `DEVZONE_PROD_LAS` respectively. Each of them have a file called `app-config.erb` with the relevant dicts containing environment variables.

First look for the feature flag/environment variable you are changing. If you can't find it, add it at the top level. Otherwise, add the title id to the value array. Note that it needs the title ID (the one you see in the Title Selector in devzone-studio) and not the titleenv id. Remember use comas to separate elements in the arrays/dictionaries.

Step 5: Commit

---

.. code-block:: bash
git commit -a -m "JIRA-1111 DZ: Add AE config for F2 Blueberry"
Step 6: Push

---

This will format your changes in the `JIRA-1111/branch-description` branch into a change request on Gerrit.

.. code-block:: bash
git review
Look at the output for a URL pointing to the change request. You should see something like this:

## Step 7: Review

Get someone to review your change, ideally someone from the Devzone team or someone who has made a change like this
before.

## Step 8: Test

If you are familiar with the 'change environment' functionality in puppet, you can push
the change directly on the hosts you need before merging it to master.

.. code-block:: bash
consort -D las add inventory settings lasXXX environment value="changeXXXXX"

.. code-block:: bash
fab frontend.development frontend.kick
_Note: You may have to seek help with this step if working from home! It seems the canary URL is not accessible from
outside._

Test the integration on whichever titles you changed. There should be no errors on the page.

## Step 9: Amend (if needed)

If you had issues above, fix them in the same branch. Otherwise skip on to merging!

Stage the new fixes:

.. code-block:: bash
git add <file>

Amend the original commit:

.. code-block:: bash

git commit --amend

This will open up your editor where, below your commit message, you should see a long hash which is used by Gerrit to
associate your commit to a changeset. Don't edit this part of the message!

Now push the new changes (they will show up as 'patch set 2' in the Gerrit UI):

.. code-block:: bash

git review
Now test again and if all looks good you are ready to merge!

## Step 10: Merge

Get your change merged, ideally during a time when a DZ Studio restart will not be too disruptive. (Ask the Devzone team about this.)

Now you can get rid of the change environment:

.. code-block:: bash
consort -D las delete inventory settings lasXXX environment
The next puppet run on the DZ Studio hosts will apply your change. If it is a good time, you can manually kick puppet on each host
one at a time for hopefully-minimal disruption.

And you're done!

.. \_repo: https://github.ihs.demonware.net/Demonware/puppet_modules
.. \_Gerrit: https://gerrit.las.demonware.net/#/admin/projects/puppet_modules
