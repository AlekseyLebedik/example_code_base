# Updating the Ag-Grid Licence used by Devzone

Devzone avoids committing its Ag-Grid licence by baking it into the React build at the last minute during CI. We pull it from Vault during the build and drop it into packages/devzone-core/src/config/index.js.

## How to update

* Go to our [Jenkins secrets in Vault](https://vault.las.demonware.net:8200/ui/vault/secrets/secrets/show/shared/devzone/jenkins)
* Hit 'Create new version' in the top right
* Copy the secret and place it in the `jenkins_ag_grid_licence_key` field - you might find it useful to use the 'show'/eye button to see the format of the existing key for comparison
* Hit 'Save'
* Trigger a new build of the main branch of Devzone Frontend so that you can test the new licence key is in place and working in QA
* If it works, all is well and any future builds of frontend apps (including AB Testing etc.) will get the new key
* If it does _not_ work, you can double-check the key and retry it, or roll back by selecting the previous version in the 'Version (n)' dropdown and 'Create new version' from that point (note this will only affect builds run after it changes)
