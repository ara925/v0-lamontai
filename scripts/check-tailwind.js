const fs = require("fs")
const path = require("path")

console.log("=== CHECKING FOR TAILWIND CONFIGURATION ===")

// Check for tailwind.config.js or tailwind.config.ts
const tailwindConfigPaths = [
  path.join(process.cwd(), "tailwind.config.js"),
  path.join(process.cwd(), "tailwind.config.ts"),
]

const tailwindConfig = null
let tailwindConfigPath = null

for (const configPath of tailwindConfigPaths) {
  if (fs.existsSync(configPath)) {
    tailwindConfigPath = configPath
    console.log(`Found Tailwind config at: ${configPath}`)

    try {
      // We can't directly require the config file as it might use ES modules
      // Instead, we'll read it and check for specific patterns
      const content = fs.readFileSync(configPath, "utf8")

      // Check for plugins that might use workspace protocol
      if (content.includes("@tailwindcss/typography")) {
        console.log("⚠️ Found @tailwindcss/typography plugin which might use workspace protocol")
      }

      if (content.includes("tailwindcss-animate")) {
        console.log("⚠️ Found tailwindcss-animate plugin which might use workspace protocol")
      }

      if (content.includes("require(")) {
        console.log("Config uses CommonJS require()")
      } else if (content.includes("import")) {
        console.log("Config uses ES modules import")
      }

      break
    } catch (error) {
      console.error(`Error reading Tailwind config:`, error.message)
    }
  }
}

if (!tailwindConfigPath) {
  console.log("No Tailwind config found")
}

// Check for postcss.config.js
const postcssConfigPath = path.join(process.cwd(), "postcss.config.js")
if (fs.existsSync(postcssConfigPath)) {
  console.log(`Found PostCSS config at: ${postcssConfigPath}`)

  try {
    const content = fs.readFileSync(postcssConfigPath, "utf8")
    console.log(`PostCSS config content: ${content.substring(0, 200)}...`)
  } catch (error) {
    console.error("Error reading PostCSS config:", error.message)
  }
} else {
  console.log("No PostCSS config found")
}

// Check for tailwind dependencies in node_modules
const tailwindDeps = ["tailwindcss", "@tailwindcss/typography", "tailwindcss-animate", "@tailwindcss/forms"]

console.log("\nChecking for installed Tailwind plugins:")
tailwindDeps.forEach((dep) => {
  const depPath = path.join(process.cwd(), "node_modules", dep)
  if (fs.existsSync(depPath)) {
    console.log(`Found ${dep}`)

    // Check package.json for workspace references
    const packageJsonPath = path.join(depPath, "package.json")
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

        // Check dependencies for workspace references
        let hasWorkspaceRefs = false
        Object.entries(packageJson.dependencies || {}).forEach(([dep, version]) => {
          if (typeof version === "string" && version.includes("workspace:")) {
            console.log(`⚠️ Workspace reference found in ${packageJson.name}'s dependencies: ${dep}@${version}`)
            hasWorkspaceRefs = true
          }
        })

        if (!hasWorkspaceRefs) {
          console.log(`✅ No workspace references found in ${dep}'s dependencies`)
        }
      } catch (error) {
        console.error(`Error checking ${dep}'s package.json:`, error.message)
      }
    }
  } else {
    console.log(`${dep} not installed`)
  }
})

console.log("\n=== TAILWIND CHECK COMPLETE ===")
