# New note in Single page app diagram
> A user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/spa by writing something into the text field and clicking the Save button.

Save button on the form is clicked:

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser sends the user input to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP status code 201 Created
    deactivate server

    Note left of server: The server accesses JSON data containing content and date

    Note right of browser: The browser stays on the same page