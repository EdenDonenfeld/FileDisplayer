# FileDisplayer

A react project for displaying the content of files!
Using the package: **_@cyntler/react-doc-viewer_**

There are two types of files at the moment.

- Those who can be searched in - we will call those TXT based.
- And those who cannot.

Thus, there is a different implementation in the code.

For the **TXT based files** - search, download and copy content is enabled.
For the rest of the files - only download is enabled. copy is for copy file url and not content.

## Important Note for S3 integration!

- We will have to get inside the settings of the bucket and add CORS, that allows our domain to extract files from there. Noticed this issue when tried to present PDF files!

## Example:

<img width="1827" height="783" alt="image" src="https://github.com/user-attachments/assets/c3a6eea3-c298-4f4b-a682-de484974620c" />
