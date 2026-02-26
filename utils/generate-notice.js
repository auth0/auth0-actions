#!/usr/bin/env node

/**
 * generate-notice.js
 *
 * This script walks through all node_modules dependencies and extracts the
 * license information from each package to generate a comprehensive NOTICE file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert file URLs to paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify fs functions
const readFile = fs.promises.readFile;
const writeFile = fs.promises.writeFile;
const readdir = fs.promises.readdir;
const stat = fs.promises.stat;

// License file naming patterns
const LICENSE_PATTERNS = [
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  'License',
  'License.md',
  'License.txt',
  'license',
  'license.md',
  'license.txt',
  'COPYING',
  'COPYING.md',
  'COPYING.txt',
];

// Path to node_modules
const NODE_MODULES_PATH = path.join(path.dirname(__dirname), 'node_modules');
const OUTPUT_FILE = path.join(path.dirname(__dirname), 'NOTICE');

// Store found licenses
const licenses = [];
// Keep track of processed packages to avoid duplicates
const processedPackages = new Set();

/**
 * Gets package info from package.json
 * @param {string} packagePath Path to the package directory
 * @returns {Object|null} Package info or null if not found
 */
async function getPackageInfo(packagePath) {
  try {
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    return {
      name: packageJson.name,
      version: packageJson.version,
      license: packageJson.license,
      author: packageJson.author,
      repository: packageJson.repository,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Finds license file in a package directory
 * @param {string} packagePath Path to package directory
 * @returns {string|null} Path to license file or null if not found
 */
async function findLicenseFile(packagePath) {
  try {
    const files = await readdir(packagePath);

    for (const pattern of LICENSE_PATTERNS) {
      const match = files.find((file) => file.toUpperCase() === pattern.toUpperCase());
      if (match) {
        return path.join(packagePath, match);
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Process a single package
 * @param {string} packagePath Path to the package directory
 */
async function processPackage(packagePath) {
  try {
    // Get package info
    const packageInfo = await getPackageInfo(packagePath);
    if (!packageInfo || !packageInfo.name) return;

    // Skip if already processed
    if (processedPackages.has(packageInfo.name)) return;
    processedPackages.add(packageInfo.name);

    // Find license file
    const licenseFilePath = await findLicenseFile(packagePath);
    let licenseText = '';

    if (licenseFilePath) {
      licenseText = await readFile(licenseFilePath, 'utf8');
    }

    // Add to licenses array
    licenses.push({
      name: packageInfo.name,
      version: packageInfo.version,
      license: packageInfo.license,
      author: packageInfo.author,
      licenseText,
      licensePath: licenseFilePath,
    });

    console.log(`Processed: ${packageInfo.name}@${packageInfo.version}`);
  } catch (error) {
    console.error(`Error processing package at ${packagePath}:`, error);
  }
}

/**
 * Walk through node_modules recursively
 * @param {string} dirPath Directory path
 */
async function walkNodeModules(dirPath) {
  try {
    // Process this package
    if (path.basename(path.dirname(dirPath)) === 'node_modules') {
      await processPackage(dirPath);
    }

    // Process sub-packages
    const items = await readdir(dirPath);
    for (const item of items) {
      if (item === '.bin' || item === '.cache') continue;

      const itemPath = path.join(dirPath, item);
      const stats = await stat(itemPath);

      if (stats.isDirectory()) {
        // If this is a node_modules subdirectory, process it
        if (item === 'node_modules') {
          const subItems = await readdir(itemPath);
          for (const subItem of subItems) {
            await walkNodeModules(path.join(itemPath, subItem));
          }
        } else {
          await walkNodeModules(itemPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error walking directory ${dirPath}:`, error);
  }
}

/**
 * Generate NOTICE file
 */
async function generateNoticeFile() {
  // Sort licenses by name
  licenses.sort((a, b) => a.name.localeCompare(b.name));

  // Create output content
  let output = `NOTICE
======

This product includes software developed by various parties and subject to their respective licenses.

`;

  // Add each license
  for (const pkg of licenses) {
    output += `------------------------------------------------------------------------------\n`;
    output += `Package: ${pkg.name}@${pkg.version}\n`;
    output += `License: ${pkg.license || 'Unknown'}\n`;

    if (pkg.author) {
      const authorStr =
        typeof pkg.author === 'string'
          ? pkg.author
          : `${pkg.author.name || ''}${pkg.author.email ? ` <${pkg.author.email}>` : ''}`;

      if (authorStr) {
        output += `Author: ${authorStr}\n`;
      }
    }

    output += `\n`;

    if (pkg.licenseText) {
      output += `${pkg.licenseText}\n\n`;
    } else {
      output += `No license text found. Please refer to ${pkg.name} documentation.\n\n`;
    }
  }

  // Write to file
  await writeFile(OUTPUT_FILE, output);
  console.log(`NOTICE file generated at ${OUTPUT_FILE}`);
  console.log(`Total packages processed: ${licenses.length}`);
}

/**
 * Check if package.json has dependencies
 * @returns {boolean} True if dependencies exist
 */
async function hasDependencies() {
  try {
    const packageJsonPath = path.join(path.dirname(__dirname), 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    
    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};
    const peerDeps = packageJson.peerDependencies || {};
    const optionalDeps = packageJson.optionalDependencies || {};
    
    return Object.keys(deps).length > 0 || 
           Object.keys(devDeps).length > 0 || 
           Object.keys(peerDeps).length > 0 || 
           Object.keys(optionalDeps).length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Generate empty NOTICE file
 */
async function generateEmptyNoticeFile() {
  const output = `NOTICE
======

This product contains no third-party dependencies.

`;
  
  await writeFile(OUTPUT_FILE, output);
  console.log(`Empty NOTICE file generated at ${OUTPUT_FILE}`);
  console.log('No dependencies found in package.json and no node_modules folder present.');
}

/**
 * Main function
 */
async function main() {
  console.log('Generating NOTICE file...');
  
  try {
    // Check if package.json has dependencies
    const packageHasDeps = await hasDependencies();
    
    // Check if node_modules exists
    const nodeModulesExists = fs.existsSync(NODE_MODULES_PATH);
    
    if (!nodeModulesExists && !packageHasDeps) {
      console.log('No node_modules folder found and no dependencies in package.json.');
      await generateEmptyNoticeFile();
      return;
    }
    
    if (!nodeModulesExists) {
      console.log('No node_modules folder found, but dependencies exist in package.json.');
      console.log('Please run "npm install" or "yarn install" first.');
      process.exit(1);
    }
    
    console.log('Scanning node_modules for license information...');
    await walkNodeModules(NODE_MODULES_PATH);
    
    // Check if we found any packages after scanning
    if (licenses.length === 0) {
      if (!packageHasDeps) {
        console.log('No packages found in node_modules and no dependencies in package.json.');
        await generateEmptyNoticeFile();
        return;
      } else {
        console.log('No packages found in node_modules, but dependencies exist in package.json.');
        console.log('Please run "npm install" or "yarn install" to install dependencies.');
        process.exit(1);
      }
    }
    
    await generateNoticeFile();
  } catch (error) {
    console.error('Error generating NOTICE file:', error);
    process.exit(1);
  }
}

// Run the script
main();
