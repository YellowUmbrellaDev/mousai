## Mousai

<p align="center">
  <img src="https://mousai.yellowumbrella.dev/mousai.png" alt="Mousai logo" width="200" />
</p>


> [!WARNING]  
> The app is in early development and some features may not be available yet.

Mousai is a app that allows artist to have a place online where sell commissions and art pieces.


## Features

- [x] User authentication
- [ ] User profile
  - [ ] Ability to see requested commisons and their status
- [x] Artist profile
  - [ ] Ability to upload profile picture
  - [ ] Ability to configure profile information
  - [ ] Ability to customize webpage theme
  - [ ] Ability to set commision tiers they prices and variations and the examples
- [ ] Commission request with fixed prices that may vary depending on the complexity of the request
  - [ ] Support for price variations
  - [ ] Ability to send a form with Name, Email, Description, and a file
    - [x] Form for sending the text data 
    - [ ] Integrate with [VercelBloB](https://vercel.com/storage/blob)
    - [ ] Integrate with AWS
- [x] Gallery of art
- [ ] Notification sistem for keeping track of the commissions
  - [ ] Integrate with SMTP
  - [ ] Integrate with [Resend](https://resend.com)
- [ ] Payment system
  - [ ] Integrate with [Stripe](https://stripe.com/)
- [ ] Dashboard for the artist to keep track of the commissions and manage the website
  - [ ] Integrate with [Trello](https://trello.com/)
    - [ ] Api enpoint to crate tasks
    - [ ] Webhook to update the status of the tasks
  - [ ] Integrate with [Taiga](https://taiga.io/)
    - [ ] Api enpoint to crate tasks
    - [ ] Webhook to update the status of the tasks
  - [x] Integrate with Nextcloud (Limited)
    - [x] Api enpoint to upload files
    - [x] Apo endpoint for creating task