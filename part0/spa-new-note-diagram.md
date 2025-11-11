```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note right of browser: On click Save new note is added to notes array and rerenders notes
    Note right of browser: POST request is sent with payload: {content: "my new note", date: "2025-11-11T10:32:07.408Z"}, type application/json

    activate server
    server-->>browser:Status Code 201 - Returns {"message":"note created"}
    deactivate server