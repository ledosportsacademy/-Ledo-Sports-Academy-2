/**
 * Ledo Sports Academy Startup Script
 * 
 * This script initializes the database with sample data and starts the server.
 */

const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Print banner
console.log(`${colors.bright}${colors.blue}`);
console.log('  _      _____ ____   ____     ____  ____   ____  _____ _______ ____     ___    ____  ___    ____  _____ __  ____  __');
console.log(' | |    |  ___/ __ \\ / __ \\   / __ \\|  _ \\ / __ \\|  __ \\__   __/ __ \\   / _ \\  / __ \\|  _ \\ / __ \\|  __ \\  \\/  \\ \\/ /');
console.log(' | |    | |__ | |  | | |  | | | |  | | |_) | |  | | |__) | | | | |  | | | (_) || |  | | |_) | |  | | |__) |      \\  /');
console.log(' | |    |  __|| |  | | |  | | | |  | |  _ <| |  | |  _  /  | | | |  | |  \\__, || |  | |  _ <| |  | |  _  /| |\\/| |/  \\');
console.log(' | |____| |___| |__| | |__| | | |__| | |_) | |__| | | \\ \\  | | | |__| |    / / | |__| | |_) | |__| | | \\ \\| |  | / /\\ \\');
console.log(' |______|______\\____/ \\____/   \\____/|____/ \\____/|_|  \\_\\ |_|  \\____/    |_/   \\____/|____/ \\____/|_|  \\_\\_|  |_/_/  \\_\\');
console.log(`${colors.reset}\n${colors.bright}${colors.cyan}                                 Management System${colors.reset}\n`);

// Function to run a command and return a promise
function runCommand(command, args, cwd, name) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.yellow}[${name}] ${colors.reset}Starting...`);
    
    const childProcess = spawn(command, args, { 
      cwd: cwd || process.cwd(),
      stdio: 'inherit',
      shell: true
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`${colors.green}[${name}] ${colors.reset}Completed successfully.`);
        resolve();
      } else {
        console.error(`${colors.red}[${name}] ${colors.reset}Failed with code ${code}.`);
        reject(new Error(`${name} process exited with code ${code}`));
      }
    });
    
    childProcess.on('error', (err) => {
      console.error(`${colors.red}[${name}] ${colors.reset}Error: ${err.message}`);
      reject(err);
    });
  });
}

// Main function to run the application
async function main() {
  try {
    // Step 1: Install dependencies if needed
    console.log(`${colors.cyan}[Setup] ${colors.reset}Checking for dependencies...`);
    
    try {
      await runCommand('npm', ['install'], null, 'Dependencies');
    } catch (error) {
      console.error(`${colors.red}[Setup] ${colors.reset}Failed to install dependencies: ${error.message}`);
      process.exit(1);
    }
    
    // Step 2: Initialize the database
    console.log(`${colors.cyan}[Setup] ${colors.reset}Initializing database...`);
    
    try {
      await runCommand('node', ['scripts/initDb.js'], null, 'Database Init');
    } catch (error) {
      console.error(`${colors.red}[Setup] ${colors.reset}Failed to initialize database: ${error.message}`);
      process.exit(1);
    }
    
    // Step 3: Start the server
    console.log(`${colors.cyan}[Setup] ${colors.reset}Starting server...`);
    console.log(`${colors.green}[Server] ${colors.reset}Ledo Sports Academy server is starting...`);
    console.log(`${colors.cyan}[Info] ${colors.reset}The application will be available at: ${colors.bright}http://localhost:5000${colors.reset}`);
    console.log(`${colors.cyan}[Info] ${colors.reset}API Integration version: ${colors.bright}http://localhost:5000/index-with-api.html${colors.reset}`);
    
    await runCommand('node', ['server.js'], null, 'Server');
  } catch (error) {
    console.error(`${colors.red}[Error] ${colors.reset}${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main();