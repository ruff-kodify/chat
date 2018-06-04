/** separates arguments with full "quote and \"escape\" support." Including \`\`\`codeblocks\`\`\` */
const RE_ARG_MATCHER = /"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|```((.|\s)*?)```|\S+/g;

/** similar to `RE_ARG_MATCHER`, but only matches the command name */
const RE_CMD_MATCHER = /^[a-z0-9]+/gi;

/** trims pairs of quotes from the start and end of a string */
const RE_QUOTE_STRIP = /^"|"$|^'|'$|^```(\S*\n?)|```$/g;

export function isCommand(message) {
  const prefix = '/';

  if (!message.startsWith(prefix)) {
    return false;
  }

  message = message.slice(prefix.length);

  if (!message) {
    return false;
  }

  if (!RE_CMD_MATCHER.test(message)) {
    return false;
  }

  return true;
}

export function parseCommand(message) {
  const prefix = '/';

  // command without the prefix
  message = message.slice(prefix.length);

  const command = message.match(RE_CMD_MATCHER)[0];
  let args = message.slice(command.length).match(RE_ARG_MATCHER);

  if (args) {
    args = args.map(arg => arg.replace(RE_QUOTE_STRIP, ''))
  }

  return {
    command,
    args,
  }
}
