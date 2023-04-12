### Configuration

Before run, please copy the file `.env.template` to `.env` and use the values from firebase.

The used node version was `v13.14.0` (in file `.nvmrc`) if you use `nvm` you may need to execute `nvm use` before `npm` or `yarn`

### Things to improve with more time

-   Styling and theme defined more centrally
-   More care with the chat UI like
    -   Date split visualization
    -   Message grouping if multiple message sent by the same user
    -   User itentifiication through ID (if authenticated) or device ID
    -   User avatar for better and immediate sender identification
    -   Spinner when requesting and waiting for messages fetch
    -   User presence visualization
-   More visuals (icons/svgs) to improve UX
-   Add a more centralized State Management (recoil, redux, ...)
-   Correct known issues
-   Add tests

### Spotted issues

**Condition:**

On iOS and when in home screen having the name field focused (with keyboard visible) and pressiing the `Chat!` button directly.

**Behaviour:**

It navigates to the chat screen as expected but there is a space below the footer/message field that it goes away as soon we interact with the message field
