import arg from 'arg';
import inquirer from 'inquirer';
import { process } from './main';

function parseCommand(args) {
  console.log('args: ' + args);

  const length = args.length;

  var res = {};
  var nargs = [];

  if (length > 2 && args[2] === "help") {
    res = { command: "help" };
    nargs = args.slice(3);
  } else if (length > 4 && args[2] === "generate" && args[3] === "account") {
    res = { command: "generate_account", account: args[4] };
    nargs = args.slice(5);
  } else if (length > 7 && args[2] === "transfer" && args[4] === "from" && args[6] === "to") {
    res = { command: "transfer", amount: args[3], from: args[5], to: args[7] };
    nargs = args.slice(8);
  } else if (length > 3 && args[2] === "remove") {
    res = { command: "remove", account: args[3] };
    nargs = args.slice(4);
  } else if (length > 4 && args[2] === "show" && args[3] === "account") {
    res = { command: "show_account", account: args[4] };
    nargs = args.slice(5);
  } else if (length > 3 && args[2] === "deploy") {
    res = { command: "deploy", account: args[3] };
    nargs = args.slice(4);
  } else if (length > 5 && args[2] === "config" && args[3] === "set") {
    res = { command: "config_set", property: args[4], value: args[5] };
    nargs = args.slice(6);
  } else if (length > 4 && args[2] === "call" && args[4] === "as") {
    res = { command: "call_contract", contract: args[3], account: args[5] };
    nargs = args.slice(5);
  } else if (length > 5 && args[2] === "show" && args[3] === "entries" && args[4] === "of") {
    res = { command: "show_entries_of", contract: args[5] };
    nargs = args.slice(6);
  } else {
    console.log("command not found");
  }

  // console.log(res);
  // console.log('nargs: ' + nargs);
  const options = arg(
    {
      '--dry': Boolean,
      '--with-secret': Boolean,
      '--as': String,
      '--named': String,
      '--entry': String,
      '--with': String,
      '--force': Boolean,
      '--verbose': Boolean,

      // '-y': '--yes',
      '-d': '--dry',
      '-f': '--force',
      '-v': '--verbose',
    },
    {
      argv: nargs,
    }
  );
  return {
    ...res,
    dry: options['--dry'] || false,
    withSecret: options['--with-secret'] || false,
    as: options['--as'],
    named: options['--named'],
    entry: options['--entry'],
    with: options['--with'],
    force: options['--force'] || false,
    verbose: options['--verbose'] || false,
  }
}

async function promptForMissingOptions(options) {

  // const questions = [];

  // const answers = await inquirer.prompt(questions);
  // return {
  //   ...options,
  //   template: options.template || answers.template,
  //   git: options.git || answers.git,
  // };
}

export async function cli(args) {
  let options = parseCommand(args);
  // console.log(options);
  // options = await promptForMissingOptions(options);
  await process(options);
}
