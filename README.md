# FileDisplayer

A react project for displaying the content of files!
Using the package: **_@cyntler/react-doc-viewer_**

There are three types of files at the moment.

- Those who can be searched in - we will call those TXT based.
- Those who are supported in react-doc-viewer (list is below).
- Those who create error (read below).

Thus, there is a different implementation in the code.

For the **TXT based files** - search, download and copy content is enabled.
For the rest of the files - only download is enabled. copy is for copy file url and not content.

## @cyntler/react-doc-viewer files type supported:
- bmp
- gif
- htm - __note!__ decide if htm / html should be in the list (viewed as web or raw text).
- html - __note!__ decide if htm / html should be in the list (viewed as web or raw text).
- jpg
- jpeg
- pdf
- png
- tiff

## When do the errors occur?

Not all file types are viewable - we are not _magicians_ 🧙‍♂️, so here are the reasons why files are failed.
- File is too large, limit is 5MB.
- Containing binary chars.

Therefore, files from types: zip, rar, xlsx, pptx, docx not supported.

## Important Note for S3 integration!

- We will have to get inside the settings of the bucket and add CORS, that allows our domain to extract files from there. Noticed this issue when tried to present PDF files!

## Examples:

### Regex search
<img width="1827" height="783" alt="image" src="https://github.com/user-attachments/assets/c3a6eea3-c298-4f4b-a682-de484974620c" />

### Error
<img width="1815" height="483" alt="image" src="https://github.com/user-attachments/assets/19afd0d6-2e95-477e-9757-929dafd9843c" />

