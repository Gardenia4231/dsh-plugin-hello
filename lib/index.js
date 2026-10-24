// dsh-plugin-hello — a minimal example DSH bundle.
//
// Cordis host plugins export `name`, `inject` and `apply`. This one waits for the
// `commands` service and registers a single user-facing slash command: /hello
// The command runs against the agent directly and never becomes a model message.

const name = 'hello'
const inject = ['commands']

const apply = (ctx) => {
  ctx.commands.register({
    name: 'hello',
    description: 'Say hello from a market-installed DSH bundle',
    input: { hint: '[name]' },
    handler: ({ rawInput }) => {
      const to = (rawInput ?? '').trim() || 'world'
      return {
        kind: 'success',
        text: `Hello, ${to}! This text came from dsh-plugin-hello, installed from a plugin market index.`,
      }
    },
  })
}

export { apply, inject, name }
