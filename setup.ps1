# Function to install Node.js using chocolatey
function Install-Node {
    # Install chocolatey
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

    # download and install Node.js
    choco install nodejs-lts --version="20.18.0" -y
}

# Check if Node.js is installed and the version is >= 20.0
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node -v
    $nodeMajorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    if ($nodeMajorVersion -ge 20) {
        Write-Output "Node.js is installed. Version: $nodeVersion"
    } else {
        Write-Output "Node.js version is less than 20.0. Current version: $nodeVersion"
        Write-Output "Installing latest Node.js 20.x LTS"
        Install-Node
    }
} else {
    Install-Node
}

# Install all the dependencies
npm install

# Download new browser binaries and their system dependencies
npx playwright install --with-deps chromium
