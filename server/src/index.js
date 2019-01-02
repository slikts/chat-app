const { prisma } = require('./generated/prisma-client');

const userData = `
  fragment Data on User {
    mutation
    node {
      name
      token
    }
    previousValues {
      name
      token
    }
  }
`;

const untrackUser = (user) => {
  clearTimeout(user.timeout);
};

const timeoutDelay = 60e3;

const trackUser = (user) => {
  untrackUser(user);
  const { token } = user;
  user.timeout = setTimeout(async () => {
    user.hasTimedOut = true;
    await prisma.deleteUser({ token });
  }, timeoutDelay);
};

const createEvent = (type, from, data = '') => prisma.createEvent({ type, from, data })
  .then(() => console.log({ event: type, from }));

const trackUserEvents = async (cache) => {
  const mutationTypes = ['DELETED', 'CREATED', 'UPDATED'];
  const mutations = await prisma.$subscribe
    .user({ mutation_in: mutationTypes }).$fragment(userData);
  for await (const { mutation, node, previousValues } of mutations) {
    const { token, name } = node || previousValues;
    console.log({ mutation, name });
    if (mutation === 'CREATED') {
      cache.set(token, { token });
      await createEvent('JOIN', name);
    }
    if (mutation === 'DELETED') {
      const user = cache.get(token);
      untrackUser(user);
      await createEvent(user.hasTimedOut ? 'TIMEOUT' : 'PART', name);
      cache.delete(token);
    } else {
      trackUser(cache.get(token));
    }
  }
};

const supervisor = async () => {
  const userCache = new Map((await prisma.users())
    .map(user => [user.token, { token: user.token }]));

  for (const [, user] of userCache) {
    trackUser(user);
  }

  trackUserEvents(userCache);
};

supervisor().catch(console.error);
