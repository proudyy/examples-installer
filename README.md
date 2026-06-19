# examples-installer
A script which install with bun runtime packages inside predefined subfolders.

## 
It picks _every_ folder inside the current directory of the script but with the exception of some excluded ones.
Then, it installs in each of the folders of that list the (node) packages using [bun](https://bun.sh) as a paket manager.

## Intention
This script was created because of it was annoying to navigate into each folder manually of 
[tanstack's solid table examples](https://github.com/TanStack/table/tree/main/examples/solid) to install the packages within them.
