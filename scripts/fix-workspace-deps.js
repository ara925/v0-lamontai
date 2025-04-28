const fs = require("fs")
const path = require("path")

// Function to recursively find all package.json files
function findPackageJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes("node_modules")) {
      findPackageJsonFiles(filePath, fileList)
    } else if (file === "package.json") {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Function to fix workspace dependencies in a package.json file
function fixWorkspaceDeps(filePath) {
  console.log(`Checking ${filePath} for workspace dependencies...`)

  try {
    const content = fs.readFileSync(filePath, "utf8")
    const packageJson = JSON.parse(content)
    let modified = false

    // Fix dependencies
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach((dep) => {
        const version = packageJson.dependencies[dep]
        if (version.startsWith("workspace:")) {
          console.log(`Fixing workspace dependency: ${dep}@${version}`)
          packageJson.dependencies[dep] = "latest"
          modified = true
        }
      })
    }

    // Fix devDependencies
    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach((dep) => {
        const version = packageJson.devDependencies[dep]
        if (version.startsWith("workspace:")) {
          console.log(`Fixing workspace devDependency: ${dep}@${version}`)
          packageJson.devDependencies[dep] = "latest"
          modified = true
        }
      })
    }

    // Fix peerDependencies
    if (packageJson.peerDependencies) {
      Object.keys(packageJson.peerDependencies).forEach((dep) => {
        const version = packageJson.peerDependencies[dep]
        if (version.startsWith("workspace:")) {
          console.log(`Fixing workspace peerDependency: ${dep}@${version}`)
          packageJson.peerDependencies[dep] = "*"
          modified = true
        }
      })
    }

    // Write back the modified package.json
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2))
      console.log(`Updated ${filePath}`)
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
  }
}

// Main function
function main() {
  console.log("Starting workspace dependency fix script...")

  try {
    // Find all package.json files
    const packageJsonFiles = findPackageJsonFiles(".")
    console.log(`Found ${packageJsonFiles.length} package.json files`)

    // Fix workspace dependencies in each file
    packageJsonFiles.forEach(fixWorkspaceDeps)

    console.log("Workspace dependency fix completed successfully")
  } catch (error) {
    console.error("Error in workspace dependency fix script:", error)
    process.exit(1)
  }
}

main()
