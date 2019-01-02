# Chat App example

- **[Running demonstration][demo]**
- [Storybook](http://kaste.untu.ms/chat-app-storybook/)

## Overview

- Real-time updates based on GraphQL subscriptions over WebSocket
- Data API implemented using a declarative [data model] with Prisma
- Style-guide driven component development using Storybook


### Features

- Greedy input focus
- Themeable
- User away status
- Name change
- Ping-based timeouts
- Server-side persistence
- Auto-linkify messages

## Screenshots

![screenshot](https://i.imgur.com/rPbNsGK.png)
![screenshot](https://i.imgur.com/OUBQ9Vh.png)

[demo]: https://slikts.github.io/chat-app/

## Tools used

### Client
- [react-apollo](https://github.com/apollographql/react-apollo)
- [recompose](https://github.com/acdlite/recompose)
- [office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react)
- [Storybook](https://github.com/storybooks/storybook)

### Server
- [Prisma](https://www.prisma.io/)

[data model]: https://github.com/slikts/chat-app/blob/master/server/prisma/datamodel.graphql
